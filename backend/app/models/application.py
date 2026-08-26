"""Simulated citizen application persistence model."""

from datetime import datetime, timezone
from typing import Any, Optional
from uuid import uuid4

from sqlalchemy import DateTime, ForeignKey, Integer, JSON, String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


def generate_application_id() -> str:
    """Generate a stable public identifier for a simulated application."""

    return f"APP-{uuid4().hex}"


def utc_now() -> datetime:
    """Return a timezone-aware timestamp for application lifecycle events."""

    return datetime.now(timezone.utc)


class Application(Base):
    """A draft or simulated-submitted application for a profile and scheme."""

    __tablename__ = "applications"

    __table_args__ = (
        UniqueConstraint(
            "profile_id",
            "scheme_id",
            name="uq_application_profile_scheme",
        ),
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    application_id: Mapped[str] = mapped_column(
        String(40),
        unique=True,
        index=True,
        default=generate_application_id,
        nullable=False,
    )
    profile_id: Mapped[int] = mapped_column(ForeignKey("profiles.id"), index=True)
    scheme_id: Mapped[str] = mapped_column(ForeignKey("schemes.scheme_id"), index=True)
    status: Mapped[str] = mapped_column(String(50), default="draft", nullable=False)
    application_data: Mapped[dict[str, Any]] = mapped_column(JSON, default=dict, nullable=False)
    provided_document_ids: Mapped[list[str]] = mapped_column(JSON, default=list, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=utc_now,
        nullable=False,
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=utc_now,
        onupdate=utc_now,
        nullable=False,
    )
    submitted_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True))

    profile: Mapped["Profile"] = relationship(back_populates="applications")
    scheme: Mapped["Scheme"] = relationship(back_populates="applications")
