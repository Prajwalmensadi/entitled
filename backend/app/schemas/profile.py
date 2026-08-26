"""Pydantic schemas for citizen profiles."""

from typing import Annotated, Optional

from pydantic import (
    BaseModel,
    ConfigDict,
    Field,
    StrictInt,
    StringConstraints,
    field_validator,
)

RequiredText = Annotated[str, StringConstraints(strip_whitespace=True, min_length=1)]


class ProfileCreate(BaseModel):
    """Validated input needed to create a prototype citizen profile."""

    age: StrictInt = Field(ge=0, le=150)
    state: RequiredText
    district: Optional[str] = None
    education_level: RequiredText
    course: Optional[str] = None
    family_income: StrictInt = Field(ge=0)
    marks: Optional[float] = Field(default=None, ge=0, le=100)
    category: Optional[str] = None
    gender: Optional[str] = None
    disability_status: Optional[bool] = None

    @field_validator("district", "course", "category", "gender", mode="before")
    @classmethod
    def normalize_optional_text(cls, value: object) -> object:
        """Trim optional text and store blank values as absent."""

        if isinstance(value, str):
            value = value.strip()
            return value or None
        return value


class ProfileResponse(ProfileCreate):
    """Profile representation returned by the API."""

    model_config = ConfigDict(from_attributes=True)

    id: int
