"""Scheme query services."""

from typing import Optional

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.scheme import Scheme


def list_schemes(db: Session) -> list[Scheme]:
    """Return schemes in a deterministic scheme_id order."""

    statement = select(Scheme).order_by(Scheme.scheme_id.asc())
    return list(db.scalars(statement))


def get_scheme(db: Session, scheme_id: str) -> Optional[Scheme]:
    """Return one scheme by its stable public identifier."""

    return db.get(Scheme, scheme_id)
