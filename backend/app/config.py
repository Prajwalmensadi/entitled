"""Application configuration loaded from environment variables."""

from dataclasses import dataclass
from os import getenv
DEFAULT_DATABASE_URL = "sqlite:///./entitled.db"

@dataclass(frozen=True)
class Settings:
    """Runtime settings for the backend foundation."""

    app_env: str
    database_url: str


def get_settings() -> Settings:
    """Read current environment-backed application settings."""

    return Settings(
        app_env=getenv("APP_ENV", "development"),
        database_url=getenv("DATABASE_URL") or DEFAULT_DATABASE_URL,
    )
