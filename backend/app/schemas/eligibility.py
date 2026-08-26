"""Schemas for deterministic eligibility checks."""

from typing import Literal, Optional

from pydantic import BaseModel, Field, StrictInt


class EligibilityCheckRequest(BaseModel):
    """References to persisted profile and scheme records."""

    profile_id: StrictInt = Field(gt=0)
    scheme_id: str = Field(min_length=1)


class RuleResultResponse(BaseModel):
    """Deterministic result for one eligibility rule condition."""

    rule_id: str
    field: Optional[str]
    operator: Optional[str]
    result: Literal["passed", "failed", "needs_information"]
    reason: str


class EligibilityCheckResponse(BaseModel):
    """Deterministic eligibility outcome for a profile and scheme."""

    scheme_id: str
    status: Literal[
        "likely_eligible",
        "likely_not_eligible",
        "needs_more_information",
    ]
    rule_results: list[RuleResultResponse]
    missing_information: list[str]
