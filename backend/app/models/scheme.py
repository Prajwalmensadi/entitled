"""Scheme persistence model backed by the authoritative seed representation."""

from datetime import date
from typing import TYPE_CHECKING, Any

from sqlalchemy import Date, JSON, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base

if TYPE_CHECKING:
    from app.models.application import Application


class Scheme(Base):
    """A synthetic or verified benefit scheme available to the prototype."""

    __tablename__ = "schemes"

    scheme_id: Mapped[str] = mapped_column(String(100), primary_key=True)
    scheme_name: Mapped[str] = mapped_column(String(200), nullable=False)
    category: Mapped[str] = mapped_column(String(100), nullable=False)
    geography: Mapped[dict[str, Any]] = mapped_column(JSON, nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    benefit: Mapped[dict[str, Any]] = mapped_column(JSON, nullable=False)
    eligibility_rules: Mapped[dict[str, Any]] = mapped_column(JSON, nullable=False)
    required_documents: Mapped[list[dict[str, Any]]] = mapped_column(JSON, nullable=False)
    deadline: Mapped[dict[str, Any]] = mapped_column(JSON, nullable=False)
    source: Mapped[dict[str, Any]] = mapped_column(JSON, nullable=False)
    last_verified: Mapped[date] = mapped_column(Date, nullable=False)
    demo_status: Mapped[str] = mapped_column(String(50), nullable=False)
    applications: Mapped[list["Application"]] = relationship(back_populates="scheme")
