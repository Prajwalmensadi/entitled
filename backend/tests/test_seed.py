import json

import pytest
from pydantic import ValidationError
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.db.seed import load_scheme_seed, seed_scheme_database
from app.main import create_app
from app.models.scheme import Scheme


def _scheme_count(session: Session) -> int:
    return session.scalar(select(func.count()).select_from(Scheme)) or 0


def test_seed_file_validation_rejects_invalid_complete_seed(tmp_path) -> None:
    invalid_seed_path = tmp_path / "invalid-schemes.json"
    invalid_seed_path.write_text(
        json.dumps(
            {
                "schema_version": "1.0",
                "schemes": [{"scheme_id": "incomplete-demo"}],
            }
        ),
        encoding="utf-8",
    )

    with pytest.raises(ValidationError):
        load_scheme_seed(invalid_seed_path)


def test_seed_inserts_validated_demo_schemes(test_app) -> None:
    count = seed_scheme_database(test_app.state.database_url)

    assert count == 2
    session: Session = test_app.state.session_factory()
    try:
        stored_scheme = session.get(Scheme, "demo-education-support-001")
        assert stored_scheme is not None
        assert stored_scheme.demo_status == "demo_simplified"
        assert stored_scheme.source["reference_type"] == "synthetic_demo"
    finally:
        session.close()


def test_seed_is_idempotent(test_app) -> None:
    seed_scheme_database(test_app.state.database_url)
    seed_scheme_database(test_app.state.database_url)

    session: Session = test_app.state.session_factory()
    try:
        assert _scheme_count(session) == 2
    finally:
        session.close()


def test_seed_data_is_isolated_to_the_explicit_database(test_app, tmp_path) -> None:
    seed_scheme_database(test_app.state.database_url)
    separate_app = create_app(
        database_url=f"sqlite:///{tmp_path / 'separate-test.db'}"
    )

    session: Session = separate_app.state.session_factory()
    try:
        assert _scheme_count(session) == 0
    finally:
        session.close()
        separate_app.state.engine.dispose()
