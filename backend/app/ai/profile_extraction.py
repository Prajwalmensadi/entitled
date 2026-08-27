"""Bounded, non-decisioning AI profile extraction."""

import json
from os import getenv
from typing import Any, Protocol

import httpx
from pydantic import ValidationError

from app.schemas.profile import ProfileExtractionCandidate


EXTRACTION_INSTRUCTIONS = """Extract only profile information explicitly stated
or clearly provided by the citizen. Return one JSON object and no other text.
Allowed fields are age, state, district, education_level, course, family_income,
marks, category, gender, and disability_status. Use null for unavailable
information. Do not guess, infer unsupported personal attributes, determine
eligibility, recommend a scheme, describe government requirements, or claim a
government action occurred."""


class ProfileExtractionProvider(Protocol):
    """A provider that returns the raw structured model output."""

    def extract(self, message: str) -> str:
        """Extract a JSON object from a citizen message."""


class ProfileExtractionUnavailableError(Exception):
    """Raised when an AI provider cannot safely serve an extraction request."""


class ProfileExtractionOutputError(Exception):
    """Raised when model output is not a valid profile candidate."""


class OpenAIProfileExtractionProvider:
    """Small OpenAI Responses API adapter for profile extraction."""

    def __init__(self, api_key: str, model: str) -> None:
        self._api_key = api_key
        self._model = model

    def extract(self, message: str) -> str:
        """Request JSON-only extraction without storing the API response."""

        payload = {
            "model": self._model,
            "store": False,
            "instructions": EXTRACTION_INSTRUCTIONS,
            "input": message,
            "text": {"format": {"type": "json_object"}},
        }
        try:
            with httpx.Client(timeout=15.0) as client:
                response = client.post(
                    "https://api.openai.com/v1/responses",
                    headers={"Authorization": "Bearer " + self._api_key},
                    json=payload,
                )
                response.raise_for_status()
                body = response.json()
        except (httpx.HTTPError, ValueError) as error:
            raise ProfileExtractionUnavailableError() from error

        output_text = body.get("output_text")
        if not isinstance(output_text, str):
            raise ProfileExtractionOutputError()
        return output_text


def get_profile_extraction_provider() -> ProfileExtractionProvider:
    """Build the configured provider without making startup depend on a key."""

    api_key = getenv("OPENAI_API_KEY")
    if not api_key:
        raise ProfileExtractionUnavailableError()
    return OpenAIProfileExtractionProvider(
        api_key=api_key,
        model=getenv("OPENAI_MODEL", "gpt-4o-mini"),
    )


def extract_profile_candidate(
    message: str,
    provider: ProfileExtractionProvider,
) -> ProfileExtractionCandidate:
    """Validate provider output as a non-persistent candidate profile."""

    try:
        raw_output = provider.extract(message)
    except ProfileExtractionUnavailableError:
        raise
    except Exception as error:
        raise ProfileExtractionUnavailableError() from error

    try:
        parsed_output: Any = json.loads(raw_output)
    except (TypeError, json.JSONDecodeError) as error:
        raise ProfileExtractionOutputError() from error

    if not isinstance(parsed_output, dict):
        raise ProfileExtractionOutputError()

    try:
        return ProfileExtractionCandidate.model_validate(parsed_output)
    except ValidationError as error:
        raise ProfileExtractionOutputError() from error
