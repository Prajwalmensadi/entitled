import json

from fastapi.testclient import TestClient

from app.ai.profile_extraction import extract_profile_candidate


class FakeProvider:
    def __init__(self, output: str = "{}", error: Exception = None) -> None:
        self.output = output
        self.error = error

    def extract(self, message: str) -> str:
        if self.error is not None:
            raise self.error
        return self.output


def configure_provider(monkeypatch, provider: FakeProvider) -> None:
    monkeypatch.setattr(
        "app.api.routes.ai.get_profile_extraction_provider",
        lambda: provider,
    )


def test_profile_extraction_returns_complete_validated_candidate(
    client: TestClient,
    monkeypatch,
) -> None:
    configure_provider(
        monkeypatch,
        FakeProvider(
            json.dumps(
                {
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
            )
        ),
    )

    response = client.post(
        "/api/ai/profile-extraction",
        json={"message": "I am 19 and study engineering in Karnataka."},
    )

    assert response.status_code == 200
    assert response.json() == {
        "age": 19,
        "state": "Karnataka",
        "district": "Bengaluru",
        "education_level": "undergraduate",
        "course": "engineering",
        "family_income": 250000,
        "marks": 72.0,
        "category": "general",
        "gender": "female",
        "disability_status": False,
    }


def test_profile_extraction_preserves_missing_fields_as_null(
    client: TestClient,
    monkeypatch,
) -> None:
    configure_provider(monkeypatch, FakeProvider('{"age": 19, "state": "Karnataka"}'))

    response = client.post(
        "/api/ai/profile-extraction",
        json={"message": "I am 19 and live in Karnataka."},
    )

    assert response.status_code == 200
    assert response.json() == {
        "age": 19,
        "state": "Karnataka",
        "district": None,
        "education_level": None,
        "course": None,
        "family_income": None,
        "marks": None,
        "category": None,
        "gender": None,
        "disability_status": None,
    }


def test_profile_extraction_allows_no_optional_information(
    client: TestClient,
    monkeypatch,
) -> None:
    configure_provider(monkeypatch, FakeProvider('{"age": 19}'))

    response = client.post(
        "/api/ai/profile-extraction",
        json={"message": "I am 19."},
    )

    assert response.status_code == 200
    assert response.json()["age"] == 19
    assert response.json()["district"] is None
    assert response.json()["disability_status"] is None


def test_profile_extraction_rejects_malformed_model_output(
    client: TestClient,
    monkeypatch,
) -> None:
    configure_provider(monkeypatch, FakeProvider('{"age": 999}'))

    response = client.post(
        "/api/ai/profile-extraction",
        json={"message": "I am 19."},
    )

    assert response.status_code == 502
    assert response.json() == {"detail": "AI returned invalid profile data"}


def test_profile_extraction_returns_safe_error_for_provider_failure(
    client: TestClient,
    monkeypatch,
) -> None:
    configure_provider(
        monkeypatch,
        FakeProvider(error=RuntimeError("provider request failed")),
    )

    response = client.post(
        "/api/ai/profile-extraction",
        json={"message": "I am 19."},
    )

    assert response.status_code == 503
    assert response.json() == {"detail": "AI profile extraction is unavailable"}


def test_profile_extraction_never_calculates_eligibility(monkeypatch) -> None:
    def fail_if_called(*args, **kwargs):
        raise AssertionError("Eligibility must not be called by profile extraction")

    monkeypatch.setattr("app.services.eligibility.check_eligibility", fail_if_called)

    candidate = extract_profile_candidate(
        "I am 19.",
        FakeProvider('{"age": 19}'),
    )

    assert candidate.age == 19
