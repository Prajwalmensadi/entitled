"""Bounded AI assistance endpoints."""

from fastapi import APIRouter, HTTPException, status

from app.ai.profile_extraction import (
    ProfileExtractionOutputError,
    ProfileExtractionUnavailableError,
    extract_profile_candidate,
    get_profile_extraction_provider,
)
from app.schemas.profile import ProfileExtractionCandidate, ProfileExtractionRequest


router = APIRouter(tags=["ai"])


@router.post(
    "/ai/profile-extraction",
    response_model=ProfileExtractionCandidate,
    status_code=status.HTTP_200_OK,
)
def post_profile_extraction(
    extraction_request: ProfileExtractionRequest,
) -> ProfileExtractionCandidate:
    """Return a validated, non-persistent profile candidate from citizen text."""

    try:
        provider = get_profile_extraction_provider()
        return extract_profile_candidate(extraction_request.message, provider)
    except ProfileExtractionUnavailableError:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="AI profile extraction is unavailable",
        )
    except ProfileExtractionOutputError:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="AI returned invalid profile data",
        )
