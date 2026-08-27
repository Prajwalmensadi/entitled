from typing import Optional
from fastapi.testclient import TestClient

from app.db.seed import seed_scheme_database
from app.models.application import Application

VALID_PROFILE = {
    "age": 19,
    "state": "Demo State",
    "district": "Demo District",
    "education_level": "undergraduate",
    "course": "engineering",
    "family_income": 250000,
    "marks": 72,
    "category": "general",
    "gender": "female",
    "disability_status": False,
}

SCHEME_ID = "demo-education-support-001"
REQUIRED_DOCUMENT_ID = "demo-student-record"
OPTIONAL_DOCUMENT_ID = "demo-supporting-note"


def seed_schemes(client: TestClient) -> None:
    seed_scheme_database(client.app.state.database_url)


def create_profile(client: TestClient, **overrides: object) -> int:
    payload = {**VALID_PROFILE, **overrides}
    response = client.post("/api/profile", json=payload)
    assert response.status_code == 201
    return response.json()["id"]


def create_valid_application(
    client: TestClient,
    profile_id: int,
    documents: Optional[list[str]] = None,
) -> dict:
    response = client.post(
        "/api/applications",
        json={
            "profile_id": profile_id,
            "scheme_id": SCHEME_ID,
            "provided_document_ids": (
                documents
                if documents is not None
                else [REQUIRED_DOCUMENT_ID]
            ),
            "application_data": {},
        },
    )
    assert response.status_code == 201
    return response.json()


def setup_flow(client: TestClient) -> int:
    seed_schemes(client)
    return create_profile(client)


def test_create_application_returns_draft_with_public_id(
    client: TestClient,
) -> None:
    profile_id = setup_flow(client)

    body = create_valid_application(client, profile_id)

    assert body["application_id"].startswith("APP-")
    assert body["profile_id"] == profile_id
    assert body["scheme_id"] == SCHEME_ID
    assert body["status"] == "draft"
    assert body["provided_document_ids"] == [REQUIRED_DOCUMENT_ID]
    assert body["application_data"] == {}
    assert body["submitted_at"] is None

    # Internal database ID must not be exposed.
    assert "id" not in body


def test_application_is_persisted(
    client: TestClient,
) -> None:
    profile_id = setup_flow(client)

    body = create_valid_application(client, profile_id)

    session = client.app.state.session_factory()
    try:
        application = session.query(Application).filter_by(
            application_id=body["application_id"]
        ).one()

        assert application.profile_id == profile_id
        assert application.scheme_id == SCHEME_ID
        assert application.status == "draft"
    finally:
        session.close()


def test_missing_profile_returns_404(client: TestClient) -> None:
    seed_schemes(client)

    response = client.post(
        "/api/applications",
        json={
            "profile_id": 99999,
            "scheme_id": SCHEME_ID,
            "provided_document_ids": [REQUIRED_DOCUMENT_ID],
            "application_data": {},
        },
    )

    assert response.status_code == 404
    assert response.json() == {"detail": "Profile not found"}


def test_missing_scheme_returns_404(client: TestClient) -> None:
    profile_id = create_profile(client)

    response = client.post(
        "/api/applications",
        json={
            "profile_id": profile_id,
            "scheme_id": "does-not-exist",
            "provided_document_ids": [],
            "application_data": {},
        },
    )

    assert response.status_code == 404
    assert response.json() == {"detail": "Scheme not found"}


def test_missing_required_document_returns_422(
    client: TestClient,
) -> None:
    profile_id = setup_flow(client)

    response = client.post(
        "/api/applications",
        json={
            "profile_id": profile_id,
            "scheme_id": SCHEME_ID,
            "provided_document_ids": [],
            "application_data": {},
        },
    )

    assert response.status_code == 422
    assert response.json()["detail"]["document_ids"] == [
        REQUIRED_DOCUMENT_ID
    ]


def test_unknown_document_returns_422(
    client: TestClient,
) -> None:
    profile_id = setup_flow(client)

    response = client.post(
        "/api/applications",
        json={
            "profile_id": profile_id,
            "scheme_id": SCHEME_ID,
            "provided_document_ids": [
                REQUIRED_DOCUMENT_ID,
                "not-a-real-document",
            ],
            "application_data": {},
        },
    )

    assert response.status_code == 422
    assert response.json()["detail"]["document_ids"] == [
        "not-a-real-document"
    ]


def test_duplicate_document_ids_are_rejected(
    client: TestClient,
) -> None:
    profile_id = setup_flow(client)

    response = client.post(
        "/api/applications",
        json={
            "profile_id": profile_id,
            "scheme_id": SCHEME_ID,
            "provided_document_ids": [
                REQUIRED_DOCUMENT_ID,
                REQUIRED_DOCUMENT_ID,
            ],
            "application_data": {},
        },
    )

    assert response.status_code == 422


def test_optional_document_is_preserved(
    client: TestClient,
) -> None:
    profile_id = setup_flow(client)

    body = create_valid_application(
        client,
        profile_id,
        [REQUIRED_DOCUMENT_ID, OPTIONAL_DOCUMENT_ID],
    )

    assert body["provided_document_ids"] == [
        REQUIRED_DOCUMENT_ID,
        OPTIONAL_DOCUMENT_ID,
    ]


def test_duplicate_application_returns_409(
    client: TestClient,
) -> None:
    profile_id = setup_flow(client)

    create_valid_application(client, profile_id)

    response = client.post(
        "/api/applications",
        json={
            "profile_id": profile_id,
            "scheme_id": SCHEME_ID,
            "provided_document_ids": [REQUIRED_DOCUMENT_ID],
            "application_data": {},
        },
    )

    assert response.status_code == 409
    assert response.json() == {
        "detail": "An application already exists for this profile and scheme"
    }


def test_list_applications_returns_newest_first(
    client: TestClient,
) -> None:
    profile_id = setup_flow(client)

    first = create_valid_application(client, profile_id)

    # The MVP prevents a second application for the same profile/scheme,
    # so create another profile for ordering verification.
    second_profile_id = create_profile(client, district="Another District")

    second = create_valid_application(client, second_profile_id)

    response = client.get(
        "/api/applications",
        params={"profile_id": second_profile_id},
    )

    assert response.status_code == 200
    assert [item["application_id"] for item in response.json()] == [
        second["application_id"]
    ]

    # The first application remains associated with its original profile.
    first_response = client.get(
        "/api/applications",
        params={"profile_id": profile_id},
    )

    assert first_response.status_code == 200
    assert [item["application_id"] for item in first_response.json()] == [
        first["application_id"]
    ]


def test_existing_profile_with_no_applications_returns_empty_list(
    client: TestClient,
) -> None:
    seed_schemes(client)
    profile_id = create_profile(client)

    response = client.get(
        "/api/applications",
        params={"profile_id": profile_id},
    )

    assert response.status_code == 200
    assert response.json() == []


def test_missing_profile_for_application_list_returns_404(
    client: TestClient,
) -> None:
    response = client.get(
        "/api/applications",
        params={"profile_id": 99999},
    )

    assert response.status_code == 404
    assert response.json() == {"detail": "Profile not found"}


def test_get_application_by_public_id(
    client: TestClient,
) -> None:
    profile_id = setup_flow(client)

    created = create_valid_application(client, profile_id)

    response = client.get(
        f"/api/applications/{created['application_id']}"
    )

    assert response.status_code == 200
    assert response.json() == created


def test_unknown_application_returns_404(
    client: TestClient,
) -> None:
    response = client.get("/api/applications/APP-does-not-exist")

    assert response.status_code == 404
    assert response.json() == {"detail": "Application not found"}


def test_submit_changes_draft_to_submitted(
    client: TestClient,
) -> None:
    profile_id = setup_flow(client)

    created = create_valid_application(client, profile_id)

    response = client.post(
        f"/api/applications/{created['application_id']}/submit"
    )

    assert response.status_code == 200

    body = response.json()

    assert body["application_id"] == created["application_id"]
    assert body["status"] == "submitted"
    assert body["submitted_at"] is not None


def test_submitted_application_is_trackable_in_list_and_detail(
    client: TestClient,
) -> None:
    profile_id = setup_flow(client)
    created = create_valid_application(client, profile_id)

    submit_response = client.post(
        f"/api/applications/{created['application_id']}/submit"
    )
    assert submit_response.status_code == 200

    list_response = client.get(
        "/api/applications",
        params={"profile_id": profile_id},
    )
    assert list_response.status_code == 200
    detail_response = client.get(
        f"/api/applications/{created['application_id']}"
    )
    assert detail_response.status_code == 200

    for response_body in (list_response.json()[0], detail_response.json()):
        assert response_body["status"] == "submitted"
        assert response_body["created_at"]
        assert response_body["submitted_at"] is not None


def test_repeated_submit_returns_409(
    client: TestClient,
) -> None:
    profile_id = setup_flow(client)

    created = create_valid_application(client, profile_id)

    submit_url = f"/api/applications/{created['application_id']}/submit"

    first = client.post(submit_url)
    assert first.status_code == 200

    second = client.post(submit_url)

    assert second.status_code == 409
    assert second.json() == {
        "detail": "Application has already been submitted"
    }


def test_submission_revalidates_required_documents(
    client: TestClient,
) -> None:
    profile_id = setup_flow(client)

    created = create_valid_application(client, profile_id)

    # Remove the required document directly from the stored application
    # to simulate stale/inconsistent draft data.
    session = client.app.state.session_factory()
    try:
        application = session.query(Application).filter_by(
            application_id=created["application_id"]
        ).one()

        application.provided_document_ids = []
        session.commit()
    finally:
        session.close()

    response = client.post(
        f"/api/applications/{created['application_id']}/submit"
    )

    assert response.status_code == 422
    assert response.json()["detail"]["document_ids"] == [
        REQUIRED_DOCUMENT_ID
    ]




def test_client_cannot_set_backend_owned_fields(
    client: TestClient,
) -> None:
    profile_id = setup_flow(client)

    response = client.post(
        "/api/applications",
        json={
            "profile_id": profile_id,
            "scheme_id": SCHEME_ID,
            "provided_document_ids": [REQUIRED_DOCUMENT_ID],
            "application_data": {},
            "status": "submitted",
            "application_id": "APP-fake",
            "created_at": "2026-08-26T00:00:00Z",
        },
    )

    assert response.status_code == 422
