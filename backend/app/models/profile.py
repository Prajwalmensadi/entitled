"""Citizen profile persistence model."""

from typing import Optional

from sqlalchemy import Boolean, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class Profile(Base):
    """A synthetic citizen profile used by the prototype."""

    __tablename__ = "profiles"

    id: Mapped[int] = mapped_column(primary_key=True)
    age: Mapped[int] = mapped_column(Integer, nullable=False)
    state: Mapped[str] = mapped_column(String(100), nullable=False)
    district: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    education_level: Mapped[str] = mapped_column(String(100), nullable=False)
    course: Mapped[Optional[str]] = mapped_column(String(150), nullable=True)
    family_income: Mapped[int] = mapped_column(Integer, nullable=False)
    marks: Mapped[Optional[float]] = mapped_column(nullable=True)
    category: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    gender: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    disability_status: Mapped[Optional[bool]] = mapped_column(Boolean, nullable=True)
