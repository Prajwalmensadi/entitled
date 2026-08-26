"""Schemas for health endpoints."""

from pydantic import BaseModel


class HealthResponse(BaseModel):
    """Liveness response returned by the API."""

    status: str
