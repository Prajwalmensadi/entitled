"""FastAPI dependencies for database access."""

from collections.abc import Generator

from fastapi import Request
from sqlalchemy.orm import Session


def get_db(request: Request) -> Generator[Session, None, None]:
    """Provide a request-scoped database session."""

    session = request.app.state.session_factory()
    try:
        yield session
    finally:
        session.close()
