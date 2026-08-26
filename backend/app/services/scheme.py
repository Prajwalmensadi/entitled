"""Scheme query services."""

from typing import Any, Optional

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


def get_scheme_documents(
    db: Session,
    scheme_id: str,
) -> Optional[tuple[str, list[dict[str, Any]]]]:
    """Return the canonical document requirements for one scheme."""

    scheme = get_scheme(db, scheme_id)
    if scheme is None:
        return None
    return scheme.scheme_id, scheme.required_documents
