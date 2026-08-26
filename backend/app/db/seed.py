"""Explicit, validated scheme-seeding operation."""

import json
import sys
from pathlib import Path
from typing import Optional

from pydantic import ValidationError

from app.config import get_settings
from app.db.session import build_engine, build_session_factory
from app.models import Base, Scheme
from app.schemas.scheme import SchemeSeedFile

REPOSITORY_ROOT = Path(__file__).resolve().parents[3]
DEFAULT_SEED_PATH = REPOSITORY_ROOT / "data" / "schemes" / "schemes.json"


def load_scheme_seed(seed_path: Path = DEFAULT_SEED_PATH) -> SchemeSeedFile:
    """Load and validate the complete authoritative scheme seed file."""

    with seed_path.open(encoding="utf-8") as seed_file:
        raw_data = json.load(seed_file)
    return SchemeSeedFile.model_validate(raw_data)


def seed_scheme_database(
    database_url: str,
    seed_path: Path = DEFAULT_SEED_PATH,
) -> int:
    """Validate then idempotently insert or update schemes by scheme_id."""

    seed_file = load_scheme_seed(seed_path)
    engine = build_engine(database_url)
    session_factory = build_session_factory(engine)
    try:
        Base.metadata.create_all(bind=engine)
        with session_factory.begin() as session:
            for seed_scheme in seed_file.schemes:
                scheme_data = seed_scheme.model_dump()
                scheme = session.get(Scheme, seed_scheme.scheme_id)
                if scheme is None:
                    session.add(Scheme(**scheme_data))
                else:
                    for field_name, value in scheme_data.items():
                        setattr(scheme, field_name, value)
    finally:
        engine.dispose()

    return len(seed_file.schemes)


def main() -> int:
    """Run the explicit scheme seed operation using DATABASE_URL settings."""

    try:
        count = seed_scheme_database(get_settings().database_url)
    except (OSError, json.JSONDecodeError, ValidationError, ValueError) as error:
        print(f"Scheme seed failed: {error}", file=sys.stderr)
        return 1

    print(f"Seeded {count} scheme record(s).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
