"""Schemas for simulated citizen applications."""

from datetime import datetime
from typing import Any, Literal, Optional

from pydantic import BaseModel, ConfigDict, Field, StrictInt, field_validator


class ApplicationCreate(BaseModel):
    """Client input for a complete application draft."""

    model_config = ConfigDict(extra="forbid")

    profile_id: StrictInt = Field(gt=0)
    scheme_id: str = Field(min_length=1)
    provided_document_ids: list[str] = Field(default_factory=list)
    application_data: dict[str, Any] = Field(default_factory=dict)

    @field_validator("provided_document_ids")
    @classmethod
    def validate_document_ids(cls, document_ids: list[str]) -> list[str]:
        """Require non-empty, unique canonical document identifiers."""

        normalized_ids = [document_id.strip() for document_id in document_ids]
        if any(not document_id for document_id in normalized_ids):
            raise ValueError("document IDs cannot be empty")
        if len(normalized_ids) != len(set(normalized_ids)):
            raise ValueError("document IDs must be unique")
        return normalized_ids


class ApplicationResponse(BaseModel):
    """Public representation of a simulated application."""

    model_config = ConfigDict(from_attributes=True)

    application_id: str
    profile_id: int
    scheme_id: str
    status: Literal["draft", "submitted"]
    application_data: dict[str, Any]
    provided_document_ids: list[str]
    created_at: datetime
    updated_at: datetime
    submitted_at: Optional[datetime]
