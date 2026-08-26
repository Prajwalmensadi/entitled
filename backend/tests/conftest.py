from collections.abc import Generator

import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient

from app.main import create_app


@pytest.fixture
def test_app(tmp_path) -> Generator[FastAPI, None, None]:
    database_url = f"sqlite:///{tmp_path / 'profiles-test.db'}"
    app = create_app(database_url=database_url)
    yield app
    app.state.engine.dispose()


@pytest.fixture
def client(test_app: FastAPI) -> Generator[TestClient, None, None]:
    with TestClient(test_app) as test_client:
        yield test_client
