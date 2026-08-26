"""Canonical scheme seed and API response schemas."""

from datetime import date
from typing import Any, Literal, Optional, Union

from pydantic import BaseModel, ConfigDict, Field, model_validator

ProfileField = Literal[
    "age",
    "state",
    "district",
    "education_level",
    "course",
    "family_income",
    "marks",
    "category",
    "gender",
    "disability_status",
]
RuleOperator = Literal[
    "equals",
    "in",
    "gte",
    "lte",
    "between",
    "exists",
    "is_true",
]


class SeedSchema(BaseModel):
    """Base schema that rejects accidental seed fields and malformed shapes."""

    model_config = ConfigDict(extra="forbid")


class Geography(SeedSchema):
    level: Literal["national", "state", "district"]
    states: list[str] = Field(default_factory=list)
    districts: list[str] = Field(default_factory=list)


class Benefit(SeedSchema):
    type: str = Field(min_length=1)
    summary: str = Field(min_length=1)
    amount: Optional[str] = None
    frequency: Optional[str] = None


class RequiredDocument(SeedSchema):
    document_id: str = Field(min_length=1)
    name: str = Field(min_length=1)
    required: bool
    notes: Optional[str] = None


class Deadline(SeedSchema):
    type: Literal["date", "rolling", "not_announced"]
    date: Optional[date] = None
    notes: Optional[str] = None

    @model_validator(mode="after")
    def validate_date_requirement(self) -> "Deadline":
        if self.type == "date" and self.date is None:
            raise ValueError("deadline date is required when type is 'date'")
        return self


class SourceReference(SeedSchema):
    reference_type: Literal["synthetic_demo", "authoritative_reference"]
    name: str = Field(min_length=1)
    url: Optional[str] = None


class RuleCondition(SeedSchema):
    rule_id: str = Field(min_length=1)
    field: ProfileField
    operator: RuleOperator
    value: Optional[Any] = None
    values: Optional[list[Any]] = None
    minimum: Optional[float] = None
    maximum: Optional[float] = None
    reason: Optional[str] = None

    @model_validator(mode="after")
    def validate_operator_values(self) -> "RuleCondition":
        if self.operator in {"equals", "gte", "lte"} and self.value is None:
            raise ValueError(f"{self.operator} rules require value")
        if self.operator == "in" and not self.values:
            raise ValueError("in rules require a non-empty values list")
        if self.operator == "between":
            if self.minimum is None or self.maximum is None:
                raise ValueError("between rules require minimum and maximum")
            if self.minimum > self.maximum:
                raise ValueError("between minimum cannot exceed maximum")
        return self


class RuleGroup(SeedSchema):
    operator: Literal["all", "any"]
    rules: list[Union[RuleCondition, "RuleGroup"]] = Field(min_length=1)


RuleGroup.model_rebuild()


class SchemeSeed(SeedSchema):
    """A complete, authoritative scheme record from the JSON seed file."""

    scheme_id: str = Field(min_length=1)
    scheme_name: str = Field(min_length=1)
    category: str = Field(min_length=1)
    geography: Geography
    description: str = Field(min_length=1)
    benefit: Benefit
    eligibility_rules: RuleGroup
    required_documents: list[RequiredDocument]
    deadline: Deadline
    source: SourceReference
    last_verified: date
    demo_status: Literal["demo_simplified", "demo_unverified", "verified_reference"]


class SchemeSeedFile(SeedSchema):
    schema_version: Literal["1.0"]
    schemes: list[SchemeSeed] = Field(min_length=1)

    @model_validator(mode="after")
    def validate_unique_scheme_ids(self) -> "SchemeSeedFile":
        scheme_ids = [scheme.scheme_id for scheme in self.schemes]
        if len(scheme_ids) != len(set(scheme_ids)):
            raise ValueError("scheme_id values must be unique")
        return self


class SchemeResponse(BaseModel):
    """Citizen-facing scheme information; raw eligibility rules stay internal."""

    model_config = ConfigDict(from_attributes=True)

    scheme_id: str
    scheme_name: str
    category: str
    geography: Geography
    description: str
    benefit: Benefit
    required_documents: list[RequiredDocument]
    deadline: Deadline
    source: SourceReference
    last_verified: date
    demo_status: str


class SchemeDocumentsResponse(BaseModel):
    """Canonical document requirements for one scheme."""

    scheme_id: str
    documents: list[RequiredDocument]
