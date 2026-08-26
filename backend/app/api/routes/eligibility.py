"""Deterministic eligibility-check endpoint."""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.dependencies import get_db
from app.models.profile import Profile
from app.models.scheme import Scheme
from app.schemas.eligibility import EligibilityCheckRequest, EligibilityCheckResponse
from app.services.eligibility import check_eligibility

router = APIRouter(tags=["eligibility"])


@router.post("/eligibility/check", response_model=EligibilityCheckResponse)
def post_eligibility_check(
    request: EligibilityCheckRequest,
    db: Session = Depends(get_db),
) -> EligibilityCheckResponse:
    """Evaluate stored rules against a persisted profile without AI decisioning."""

    profile = db.get(Profile, request.profile_id)
    if profile is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found",
        )

    scheme = db.get(Scheme, request.scheme_id)
    if scheme is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Scheme not found",
        )

    return check_eligibility(profile, scheme)
