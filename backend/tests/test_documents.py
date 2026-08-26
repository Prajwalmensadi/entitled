from fastapi.testclient import TestClient

from app.db.seed import seed_scheme_database


def test_get_scheme_documents_returns_canonical_requirements(
    client: TestClient,
) -> None:
    seed_scheme_database(client.app.state.database_url)

    response = client.get("/api/benefits/demo-education-support-001/documents")

    assert response.status_code == 200
    assert response.json() == {
        "scheme_id": "demo-education-support-001",
        "documents": [
            {
                "document_id": "demo-student-record",
                "name": "Demo student record",
                "required": True,
                "notes": "Synthetic prototype document requirement.",
            },
            {
                "document_id": "demo-supporting-note",
                "name": "Demo supporting note",
                "required": False,
                "notes": "Optional synthetic prototype document.",
            },
        ],
    }


def test_scheme_document_response_preserves_flags_notes_and_hides_rules(
    client: TestClient,
) -> None:
    seed_scheme_database(client.app.state.database_url)

    response = client.get("/api/benefits/demo-education-support-001/documents")

    assert response.status_code == 200
    documents = response.json()["documents"]
    assert [document["required"] for document in documents] == [True, False]
    assert [document["notes"] for document in documents] == [
        "Synthetic prototype document requirement.",
        "Optional synthetic prototype document.",
    ]
    assert "eligibility_rules" not in response.json()


def test_get_scheme_documents_returns_404_for_missing_scheme(client: TestClient) -> None:
    response = client.get("/api/benefits/not-a-scheme/documents")

    assert response.status_code == 404
    assert response.json() == {"detail": "Scheme not found"}
