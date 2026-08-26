"""FastAPI application entry point."""

from typing import Optional

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from app.api.router import api_router
from app.config import get_settings
from app.db.session import build_engine, build_session_factory
from app.models import Base


def create_app(database_url: Optional[str] = None) -> FastAPI:
    """Create and configure the Entitled API application."""

    settings = get_settings()
    resolved_database_url = database_url or settings.database_url
    engine = build_engine(resolved_database_url)
    session_factory = build_session_factory(engine)

    Base.metadata.create_all(bind=engine)

    app = FastAPI(title="Entitled API", version="0.1.0")
    app.state.settings = settings
    app.state.database_url = resolved_database_url
    app.state.engine = engine
    app.state.session_factory = session_factory
    app.include_router(api_router, prefix="/api")

    @app.exception_handler(Exception)
    async def handle_unexpected_error(_: Request, __: Exception) -> JSONResponse:
        """Avoid exposing internal implementation details in server errors."""

        return JSONResponse(
            status_code=500,
            content={"detail": "Internal server error"},
        )

    return app
