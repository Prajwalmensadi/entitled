"""Engine and session-factory construction."""

from typing import Any

from sqlalchemy import Engine, create_engine
from sqlalchemy.orm import sessionmaker


def build_engine(database_url: str) -> Engine:
    """Build an engine compatible with SQLite and PostgreSQL URLs."""

    connect_args: dict[str, Any] = {}
    if database_url.startswith("sqlite"):
        connect_args["check_same_thread"] = False

    return create_engine(database_url, connect_args=connect_args)


def build_session_factory(engine: Engine) -> sessionmaker:
    """Build the application's session factory."""

    return sessionmaker(bind=engine, autoflush=False, autocommit=False)
