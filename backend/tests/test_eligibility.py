from fastapi.testclient import TestClient

from app.db.seed import seed_scheme_database


def _create_profile(client: TestClient, **overrides) -> int:
    payload = {
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
    payload.update(overrides)
    response = client.post("/api/profile", json=payload)
    assert response.status_code == 201
    return response.json()["id"]


def test_valid_eligibility_request_returns_deterministic_trace(client: TestClient) -> None:
    seed_scheme_database(client.app.state.database_url)
    profile_id = _create_profile(client)

    response = client.post(
        "/api/eligibility/check",
        json={
            "profile_id": profile_id,
            "scheme_id": "demo-education-support-001",
        },
    )

    assert response.status_code == 200
    assert response.json() == {
        "scheme_id": "demo-education-support-001",
        "status": "likely_eligible",
        "rule_results": [
            {
                "rule_id": "demo-state-present",
                "field": "state",
                "operator": "exists",
                "result": "passed",
                "reason": "State information is present.",
            }
        ],
        "missing_information": [],
    }


def test_eligibility_returns_404_for_missing_profile(client: TestClient) -> None:
    seed_scheme_database(client.app.state.database_url)

    response = client.post(
        "/api/eligibility/check",
        json={"profile_id": 999, "scheme_id": "demo-education-support-001"},
    )

    assert response.status_code == 404
    assert response.json() == {"detail": "Profile not found"}


def test_eligibility_returns_404_for_missing_scheme(client: TestClient) -> None:
    profile_id = _create_profile(client)

    response = client.post(
        "/api/eligibility/check",
        json={"profile_id": profile_id, "scheme_id": "not-a-scheme"},
    )

    assert response.status_code == 404
    assert response.json() == {"detail": "Scheme not found"}


def test_eligibility_needs_more_information_for_missing_rule_field(
    client: TestClient,
) -> None:
    seed_scheme_database(client.app.state.database_url)
    profile_id = _create_profile(client, course=None)

    response = client.post(
        "/api/eligibility/check",
        json={"profile_id": profile_id, "scheme_id": "demo-stem-support-002"},
    )

    assert response.status_code == 200
    assert response.json() == {
        "scheme_id": "demo-stem-support-002",
        "status": "needs_more_information",
        "rule_results": [
            {
                "rule_id": "demo-course-present",
                "field": "course",
                "operator": "exists",
                "result": "needs_information",
                "reason": "Course is required to evaluate this rule.",
            }
        ],
        "missing_information": ["course"],
    }


def test_eligibility_request_validation_rejects_invalid_references(
    client: TestClient,
) -> None:
    response = client.post(
        "/api/eligibility/check",
        json={"profile_id": 0, "scheme_id": ""},
    )

    assert response.status_code == 422
