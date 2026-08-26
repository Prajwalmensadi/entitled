"""Application service for deterministic profile eligibility checks."""

from app.models.profile import Profile
from app.models.scheme import Scheme
from app.rules.evaluator import EvaluationOutcome, evaluate_rules
from app.schemas.eligibility import EligibilityCheckResponse, RuleResultResponse


def check_eligibility(
    profile: Profile,
    scheme: Scheme,
) -> EligibilityCheckResponse:
    """Evaluate the scheme's canonical rules against a persisted profile."""

    outcome = evaluate_rules(profile, scheme.eligibility_rules)
    return EligibilityCheckResponse(
        scheme_id=scheme.scheme_id,
        status=_to_api_status(outcome),
        rule_results=[
            RuleResultResponse(
                rule_id=trace.rule_id,
                field=trace.field,
                operator=trace.operator,
                result=trace.result,
                reason=trace.reason,
            )
            for trace in outcome.rule_results
        ],
        missing_information=outcome.missing_information,
    )


def _to_api_status(outcome: EvaluationOutcome) -> str:
    if outcome.result == "passed":
        return "likely_eligible"
    if outcome.result == "needs_information":
        return "needs_more_information"
    return "likely_not_eligible"
