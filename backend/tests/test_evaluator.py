import pytest

from app.rules.evaluator import evaluate_rules


def _profile(**overrides):
    profile = {
        "age": 19,
        "state": "Karnataka",
        "district": "Bengaluru",
        "education_level": "undergraduate",
        "course": "engineering",
        "family_income": 250000,
        "marks": 72,
        "category": "general",
        "gender": "female",
        "disability_status": False,
    }
    profile.update(overrides)
    return profile


def _condition(rule_id, field, operator, **values):
    return {"rule_id": rule_id, "field": field, "operator": operator, **values}


def _group(*rules, operator="all"):
    return {"operator": operator, "rules": list(rules)}


@pytest.mark.parametrize(
    ("rule", "profile", "expected"),
    [
        (_condition("equals-pass", "state", "equals", value="Karnataka"), _profile(), "passed"),
        (_condition("equals-fail", "state", "equals", value="Kerala"), _profile(), "failed"),
        (_condition("in-pass", "state", "in", values=["Karnataka", "Kerala"]), _profile(), "passed"),
        (_condition("in-fail", "state", "in", values=["Kerala"]), _profile(), "failed"),
        (_condition("gte-boundary", "marks", "gte", value=72), _profile(), "passed"),
        (_condition("gte-fail", "marks", "gte", value=73), _profile(), "failed"),
        (_condition("lte-boundary", "marks", "lte", value=72), _profile(), "passed"),
        (_condition("lte-fail", "marks", "lte", value=71), _profile(), "failed"),
        (_condition("between-lower", "marks", "between", minimum=72, maximum=80), _profile(), "passed"),
        (_condition("between-upper", "marks", "between", minimum=60, maximum=72), _profile(), "passed"),
        (_condition("exists-pass", "course", "exists"), _profile(), "passed"),
        (_condition("exists-missing", "course", "exists"), _profile(course=None), "needs_information"),
        (_condition("true-pass", "disability_status", "is_true"), _profile(disability_status=True), "passed"),
        (_condition("true-fail", "disability_status", "is_true"), _profile(), "failed"),
    ],
)
def test_condition_operators(rule, profile, expected) -> None:
    outcome = evaluate_rules(profile, _group(rule))

    assert outcome.result == expected
    assert outcome.rule_results[0].result == expected


def test_all_group_returns_failed_when_any_rule_fails() -> None:
    outcome = evaluate_rules(
        _profile(),
        _group(
            _condition("state-pass", "state", "equals", value="Karnataka"),
            _condition("income-fail", "family_income", "lte", value=200000),
        ),
    )

    assert outcome.result == "failed"
    assert [trace.result for trace in outcome.rule_results] == ["passed", "failed"]


def test_any_group_returns_passed_when_any_rule_passes() -> None:
    outcome = evaluate_rules(
        _profile(),
        _group(
            _condition("state-fail", "state", "equals", value="Kerala"),
            _condition("course-pass", "course", "equals", value="engineering"),
            operator="any",
        ),
    )

    assert outcome.result == "passed"


def test_nested_groups_use_the_same_deterministic_semantics() -> None:
    outcome = evaluate_rules(
        _profile(),
        _group(
            _group(
                _condition("state-fail", "state", "equals", value="Kerala"),
                _condition("category-pass", "category", "equals", value="general"),
                operator="any",
            ),
            _condition("age-pass", "age", "gte", value=18),
        ),
    )

    assert outcome.result == "passed"
    assert len(outcome.rule_results) == 3


def test_unsupported_or_malformed_rule_fails_safely() -> None:
    outcome = evaluate_rules(
        _profile(),
        _group(
            {
                "rule_id": "unsupported",
                "field": "state",
                "operator": "contains",
                "value": "Karnataka",
            }
        ),
    )

    assert outcome.result == "failed"
    assert outcome.rule_results[0].result == "failed"
    assert outcome.missing_information == []


def test_all_group_returns_needs_information_without_failures() -> None:
    outcome = evaluate_rules(
        _profile(course=None),
        _group(
            _condition("state-pass", "state", "exists"),
            _condition("course-missing", "course", "exists"),
        ),
    )

    assert outcome.result == "needs_information"
    assert outcome.missing_information == ["course"]


def test_any_group_returns_needs_information_when_none_pass() -> None:
    outcome = evaluate_rules(
        _profile(course=None),
        _group(
            _condition("state-fail", "state", "equals", value="Kerala"),
            _condition("course-missing", "course", "exists"),
            operator="any",
        ),
    )

    assert outcome.result == "needs_information"
