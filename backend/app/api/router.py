"""Top-level API router."""

from fastapi import APIRouter

from app.api.routes.applications import router as applications_router
from app.api.routes.benefits import router as benefits_router
from app.api.routes.eligibility import router as eligibility_router
from app.api.routes.health import router as health_router
from app.api.routes.profile import router as profile_router

api_router = APIRouter()
api_router.include_router(health_router)
api_router.include_router(profile_router)
api_router.include_router(benefits_router)
api_router.include_router(eligibility_router)
api_router.include_router(applications_router)
