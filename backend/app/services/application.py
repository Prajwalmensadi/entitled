"""Application creation and simulated submission workflow."""

from typing import Any, Optional

from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.models.application import Application, utc_now
from app.models.profile import Profile
from app.models.scheme import Scheme
from app.schemas.application import ApplicationCreate
from app.services.eligibility import check_eligibility


class ApplicationWorkflowError(Exception):
    """Safe domain error returned by application workflow endpoints."""

    def __init__(self, status_code: int, detail: Any) -> None:
        self.status_code = status_code
        self.detail = detail
        super().__init__(str(detail))


def create_application(
    db: Session,
    profile: Profile,
    scheme: Scheme,
    application_input: ApplicationCreate,
) -> Application:
    """Validate then persist a complete draft application."""

    _validate_application_requirements(
        profile,
        scheme,
        application_input.provided_document_ids,
    )
    application = Application(
        profile_id=profile.id,
        scheme_id=scheme.scheme_id,
        application_data=application_input.application_data,
        provided_document_ids=application_input.provided_document_ids,
        status="draft",
    )
    db.add(application)

    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise ApplicationWorkflowError(
            409,
            "An application already exists for this profile and scheme",
        )

    db.refresh(application)
    return application

def list_applications_for_profile(db: Session, profile_id: int) -> list[Application]:
    """Return a profile's applications in deterministic newest-first order."""

    statement = (
        select(Application)
        .where(Application.profile_id == profile_id)
        .order_by(Application.created_at.desc(), Application.id.desc())
    )
    return list(db.scalars(statement))


def get_application(db: Session, application_id: str) -> Optional[Application]:
    """Return one application by its public identifier."""

    statement = select(Application).where(Application.application_id == application_id)
    return db.scalar(statement)


def submit_application(db: Session, application: Application) -> Application:
    """Revalidate a draft then perform its simulated submission transition."""

    if application.status != "draft":
        raise ApplicationWorkflowError(
            409,
            "Application has already been submitted",
        )

    _validate_application_requirements(
        application.profile,
        application.scheme,
        application.provided_document_ids,
    )
    application.status = "submitted"
    application.submitted_at = utc_now()
    db.commit()
    db.refresh(application)
    return application


def _validate_application_requirements(
    profile: Profile,
    scheme: Scheme,
    provided_document_ids: list[str],
) -> None:
    eligibility = check_eligibility(profile, scheme)
    if eligibility.status == "needs_more_information":
        raise ApplicationWorkflowError(
            409,
            {
                "message": "Profile information is incomplete for this scheme",
                "missing_information": eligibility.missing_information,
            },
        )
    if eligibility.status != "likely_eligible":
        raise ApplicationWorkflowError(
            409,
            "Profile is not likely eligible for this scheme",
        )

    canonical_document_ids = {
        document["document_id"] for document in scheme.required_documents
    }
    unknown_document_ids = sorted(set(provided_document_ids) - canonical_document_ids)
    if unknown_document_ids:
        raise ApplicationWorkflowError(
            422,
            {
                "message": "Provided documents do not belong to this scheme",
                "document_ids": unknown_document_ids,
            },
        )

    required_document_ids = [
        document["document_id"]
        for document in scheme.required_documents
        if document["required"]
    ]
    missing_document_ids = [
        document_id
        for document_id in required_document_ids
        if document_id not in provided_document_ids
    ]
    if missing_document_ids:
        raise ApplicationWorkflowError(
            422,
            {
                "message": "Required documents are missing",
                "document_ids": missing_document_ids,
            },
        )
