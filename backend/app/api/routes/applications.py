"""Simulated application workflow endpoints."""

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.db.dependencies import get_db
from app.models.profile import Profile
from app.models.scheme import Scheme
from app.schemas.application import ApplicationCreate, ApplicationResponse
from app.services.application import (
    ApplicationWorkflowError,
    create_application,
    get_application,
    list_applications_for_profile,
    submit_application,
)

router = APIRouter(tags=["applications"])


@router.post(
    "/applications",
    response_model=ApplicationResponse,
    status_code=status.HTTP_201_CREATED,
)
def post_application(
    application_input: ApplicationCreate,
    db: Session = Depends(get_db),
) -> ApplicationResponse:
    """Create a validated draft application."""

    profile = db.get(Profile, application_input.profile_id)
    if profile is None:
        raise HTTPException(status_code=404, detail="Profile not found")
    scheme = db.get(Scheme, application_input.scheme_id)
    if scheme is None:
        raise HTTPException(status_code=404, detail="Scheme not found")
    try:
        return create_application(db, profile, scheme, application_input)
    except ApplicationWorkflowError as error:
        raise HTTPException(status_code=error.status_code, detail=error.detail)


@router.get("/applications", response_model=list[ApplicationResponse])
def get_applications(
    profile_id: int = Query(gt=0),
    db: Session = Depends(get_db),
) -> list[ApplicationResponse]:
    """List one profile's applications in deterministic newest-first order."""

    if db.get(Profile, profile_id) is None:
        raise HTTPException(status_code=404, detail="Profile not found")
    return list_applications_for_profile(db, profile_id)


@router.post(
    "/applications/{application_id}/submit",
    response_model=ApplicationResponse,
)
def post_application_submit(
    application_id: str,
    db: Session = Depends(get_db),
) -> ApplicationResponse:
    """Simulate submission of a validated draft application."""

    application = get_application(db, application_id)
    if application is None:
        raise HTTPException(status_code=404, detail="Application not found")
    try:
        return submit_application(db, application)
    except ApplicationWorkflowError as error:
        raise HTTPException(status_code=error.status_code, detail=error.detail)


@router.get("/applications/{application_id}", response_model=ApplicationResponse)
def get_application_by_id(
    application_id: str,
    db: Session = Depends(get_db),
) -> ApplicationResponse:
    """Return one application by its public identifier."""

    application = get_application(db, application_id)
    if application is None:
        raise HTTPException(status_code=404, detail="Application not found")
    return application
