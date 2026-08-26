from fastapi.testclient import TestClient

from app.db.seed import seed_scheme_database


def test_get_benefits_returns_demo_schemes_in_scheme_id_order(
    client: TestClient,
) -> None:
    seed_scheme_database(client.app.state.database_url)

    response = client.get("/api/benefits")

    assert response.status_code == 200
    body = response.json()
    assert [scheme["scheme_id"] for scheme in body] == [
        "demo-education-support-001",
        "demo-stem-support-002",
    ]
    assert all(scheme["demo_status"] == "demo_simplified" for scheme in body)
    assert all("eligibility_rules" not in scheme for scheme in body)


def test_get_benefit_returns_citizen_facing_scheme_information(
    client: TestClient,
) -> None:
    seed_scheme_database(client.app.state.database_url)

    response = client.get("/api/benefits/demo-education-support-001")

    assert response.status_code == 200
    body = response.json()
    assert body["scheme_id"] == "demo-education-support-001"
    assert body["scheme_name"] == "Demo Education Support"
    assert body["source"]["reference_type"] == "synthetic_demo"
    assert "eligibility_rules" not in body


def test_get_nonexistent_benefit_returns_404(client: TestClient) -> None:
    response = client.get("/api/benefits/not-a-scheme")

    assert response.status_code == 404
    assert response.json() == {"detail": "Scheme not found"}
