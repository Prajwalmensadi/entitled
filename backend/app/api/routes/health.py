"""Health-check endpoint."""

from fastapi import APIRouter

from app.schemas.health import HealthResponse

router = APIRouter(tags=["health"])


@router.get("/health", response_model=HealthResponse)
def get_health() -> HealthResponse:
    """Return a minimal liveness response."""

    return HealthResponse(status="ok")
