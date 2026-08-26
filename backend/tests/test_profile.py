from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.models.profile import Profile

VALID_PROFILE = {
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


def test_create_profile_persists_and_returns_generated_id(client: TestClient) -> None:
    response = client.post("/api/profile", json=VALID_PROFILE)

    assert response.status_code == 201
    body = response.json()
    assert isinstance(body["id"], int)
    assert body["id"] > 0
    assert {key: body[key] for key in VALID_PROFILE} == VALID_PROFILE

    session: Session = client.app.state.session_factory()
    try:
        persisted = session.get(Profile, body["id"])
        assert persisted is not None
        assert persisted.state == "Karnataka"
        assert persisted.family_income == 250000
    finally:
        session.close()


def test_profile_requires_mandatory_fields(client: TestClient) -> None:
    response = client.post("/api/profile", json={"age": 19})

    assert response.status_code == 422


def test_profile_rejects_negative_family_income(client: TestClient) -> None:
    payload = {**VALID_PROFILE, "family_income": -1}

    response = client.post("/api/profile", json=payload)

    assert response.status_code == 422


def test_profile_rejects_marks_above_100(client: TestClient) -> None:
    payload = {**VALID_PROFILE, "marks": 101}

    response = client.post("/api/profile", json=payload)

    assert response.status_code == 422


def test_profile_rejects_negative_age(client: TestClient) -> None:
    payload = {**VALID_PROFILE, "age": -1}

    response = client.post("/api/profile", json=payload)

    assert response.status_code == 422


def test_profile_allows_optional_fields_to_be_omitted(client: TestClient) -> None:
    payload = {
        "age": 19,
        "state": "Karnataka",
        "education_level": "undergraduate",
        "family_income": 250000,
    }

    response = client.post("/api/profile", json=payload)

    assert response.status_code == 201
    body = response.json()
    assert "id" in body
    assert isinstance(body["id"], int)
    assert body["id"] > 0
    expected_fields = {
        **payload,
        "district": None,
        "course": None,
        "marks": None,
        "category": None,
        "gender": None,
        "disability_status": None,
    }
    assert {key: body[key] for key in expected_fields} == expected_fields
