"""Deterministic evaluation of canonical scheme eligibility rules."""

from collections.abc import Mapping
from dataclasses import dataclass
from typing import Any, Literal, Optional, Union, get_args

from pydantic import ValidationError

from app.schemas.scheme import ProfileField, RuleCondition, RuleGroup

ConditionResult = Literal["passed", "failed", "needs_information"]


@dataclass(frozen=True)
class RuleTrace:
    """A deterministic trace for one evaluated rule condition."""

    rule_id: str
    field: Optional[str]
    operator: Optional[str]
    result: ConditionResult
    reason: str


@dataclass(frozen=True)
class EvaluationOutcome:
    """Internal group result with traces and fields still needed."""

    result: ConditionResult
    rule_results: list[RuleTrace]
    missing_information: list[str]


def evaluate_rules(
    profile: object,
    rules: Union[RuleGroup, dict[str, Any]],
) -> EvaluationOutcome:
    """Evaluate a canonical rule tree without any probabilistic decisioning."""

    try:
        rule_group = rules if isinstance(rules, RuleGroup) else RuleGroup.model_validate(rules)
    except ValidationError:
        return EvaluationOutcome(
            result="failed",
            rule_results=[
                RuleTrace(
                    rule_id="invalid-rule",
                    field=None,
                    operator=None,
                    result="failed",
                    reason="The configured eligibility rule is invalid or unsupported.",
                )
            ],
            missing_information=[],
        )

    return _evaluate_group(profile, rule_group)


def _evaluate_group(profile: object, group: RuleGroup) -> EvaluationOutcome:
    outcomes = [
        _evaluate_group(profile, rule)
        if isinstance(rule, RuleGroup)
        else _evaluate_condition(profile, rule)
        for rule in group.rules
    ]
    rule_results = [trace for outcome in outcomes for trace in outcome.rule_results]
    missing_information = _unique_fields(
        field for outcome in outcomes for field in outcome.missing_information
    )
    results = [outcome.result for outcome in outcomes]

    if group.operator == "all":
        if "failed" in results:
            result: ConditionResult = "failed"
        elif "needs_information" in results:
            result = "needs_information"
        else:
            result = "passed"
    else:
        if "passed" in results:
            result = "passed"
        elif "needs_information" in results:
            result = "needs_information"
        else:
            result = "failed"

    return EvaluationOutcome(result, rule_results, missing_information)


def _evaluate_condition(profile: object, rule: RuleCondition) -> EvaluationOutcome:
    if rule.field not in get_args(ProfileField):
        return _failed_outcome(rule, "The configured eligibility field is unsupported.")

    value = _get_profile_value(profile, rule.field)
    if _is_missing(value):
        field_label = _field_label(rule.field)
        trace = RuleTrace(
            rule_id=rule.rule_id,
            field=rule.field,
            operator=rule.operator,
            result="needs_information",
            reason=f"{field_label} is required to evaluate this rule.",
        )
        return EvaluationOutcome("needs_information", [trace], [rule.field])

    try:
        passed = _apply_operator(value, rule)
    except (TypeError, ValueError):
        return _failed_outcome(
            rule,
            "The configured eligibility rule could not be evaluated safely.",
        )

    field_label = _field_label(rule.field)
    if rule.operator == "exists":
        reason = f"{field_label} information is present."
    elif passed:
        reason = f"{field_label} satisfies the configured rule."
    else:
        reason = f"{field_label} does not satisfy the configured rule."
    trace = RuleTrace(
        rule_id=rule.rule_id,
        field=rule.field,
        operator=rule.operator,
        result="passed" if passed else "failed",
        reason=reason,
    )
    return EvaluationOutcome(trace.result, [trace], [])


def _apply_operator(value: Any, rule: RuleCondition) -> bool:
    if rule.operator == "equals":
        return value == rule.value
    if rule.operator == "in":
        return value in (rule.values or [])
    if rule.operator == "gte":
        return value >= rule.value
    if rule.operator == "lte":
        return value <= rule.value
    if rule.operator == "between":
        return bool(rule.minimum <= value <= rule.maximum)
    if rule.operator == "exists":
        return True
    if rule.operator == "is_true":
        return value is True
    raise ValueError("Unsupported eligibility operator")


def _get_profile_value(profile: object, field: str) -> Any:
    if isinstance(profile, Mapping):
        return profile.get(field)
    return getattr(profile, field, None)


def _is_missing(value: Any) -> bool:
    return value is None or (isinstance(value, str) and not value.strip())


def _failed_outcome(rule: RuleCondition, reason: str) -> EvaluationOutcome:
    trace = RuleTrace(
        rule_id=rule.rule_id,
        field=rule.field,
        operator=rule.operator,
        result="failed",
        reason=reason,
    )
    return EvaluationOutcome("failed", [trace], [])


def _field_label(field: str) -> str:
    return field.replace("_", " ").capitalize()


def _unique_fields(fields: Any) -> list[str]:
    return list(dict.fromkeys(fields))
