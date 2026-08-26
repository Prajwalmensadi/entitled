"""Profile application service."""

from sqlalchemy.orm import Session

from app.models.profile import Profile
from app.schemas.profile import ProfileCreate


def create_profile(db: Session, profile_input: ProfileCreate) -> Profile:
    """Persist and return a validated citizen profile."""

    profile = Profile(**profile_input.model_dump())
    db.add(profile)
    db.commit()
    db.refresh(profile)
    return profile
