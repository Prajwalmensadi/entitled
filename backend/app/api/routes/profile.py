"""Citizen profile endpoints."""

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.db.dependencies import get_db
from app.schemas.profile import ProfileCreate, ProfileResponse
from app.services.profile import create_profile

router = APIRouter(tags=["profile"])


@router.post(
    "/profile",
    response_model=ProfileResponse,
    status_code=status.HTTP_201_CREATED,
)
def post_profile(
    profile: ProfileCreate,
    db: Session = Depends(get_db),
) -> ProfileResponse:
    """Create a citizen profile for this prototype."""

    return create_profile(db, profile)
