"""FastAPI application entry point."""

from fastapi import FastAPI

from app.api.router import api_router
from app.config import get_settings


def create_app() -> FastAPI:
    """Create and configure the Entitled API application."""

    settings = get_settings()
    app = FastAPI(title="Entitled API", version="0.1.0")
    app.state.settings = settings
    app.include_router(api_router, prefix="/api")
    return app


app = create_app()
