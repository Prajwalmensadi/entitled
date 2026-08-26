# Entitled — Backend & AI Engineering Rules

## Ownership and scope

The backend/AI engineer owns:

- FastAPI backend
- Database and persistence
- Scheme data
- Deterministic eligibility engine
- AI integration
- Application workflow and simulated submission
- Application tracking
- API contracts
- Validation, security, and backend tests

Person 2 owns `/frontend`. Do not modify frontend code unless explicitly requested.
Do not recreate or unnecessarily restructure the repository.

## Product flow

Citizen → profile → discover education/scholarship benefits → understand eligibility
→ see required documents → guided application → simulated submission
→ application ID → application tracking.

Critical decision flow:

Profile → validation → deterministic eligibility rules → eligibility result
→ AI explanation.

## Technology choices

Use only the technologies needed for this prototype:

- Python
- FastAPI
- Pydantic
- SQLAlchemy
- SQLite for local development
- PostgreSQL only when deployment requires it
- pytest
- OpenAI API where AI assistance is appropriate

Do not introduce unnecessary frameworks, infrastructure, or services.

## Eligibility rules and AI

Eligibility must be deterministic, explainable, and testable.

- The LLM must never determine, approve, deny, or alter eligibility.
- Represent eligibility requirements as explicit rules over validated profile data.
- Return clear reasons for each eligibility result, including unmet criteria.
- Use AI only for bounded assistance such as natural-language profile extraction,
  plain-language eligibility explanations, document/application guidance, and
  other non-decisioning support.
- Validate AI inputs and outputs.
- AI output must not silently modify a profile, eligibility decision, or
  application state.

## Scheme data

Use synthetic/demo data only.

- Clearly label all simplified or demo schemes and requirements.
- Do not invent requirements for real schemes.
- If adding a real scheme, verify its requirements against authoritative sources
  and record the source and verification date in project documentation or data
  metadata.
- Keep scheme data structured, reviewable, and separate from business logic
  where practical.

## Privacy, security, and prohibited data

This is an independent hackathon prototype, not an official government service.

Never collect, store, generate, or request:

- Real Aadhaar numbers
- Real PAN numbers
- Real OTPs
- Real payment information
- Restricted government data

Do not use unauthorized government APIs, reverse engineer private government
APIs, or implement real government submission flows.

Government submissions must always be simulated. Do not claim that the
prototype is an official government service.

Use synthetic citizen data in fixtures, tests, demos, and documentation. Avoid
sending unnecessary profile information to AI services. Never commit secrets,
`.env` files, or local databases.

## API and validation

- Keep route handlers thin and place domain logic in focused backend modules.
- Use explicit Pydantic request and response models.
- Validate inputs at API boundaries and return consistent error responses.
- Keep API behavior documented in `docs/API_CONTRACT.md`.
- Document breaking or frontend-relevant contract changes before relying on them.
- Generate stable simulated application IDs and support tracking by ID.

## Database and application workflow

- Use SQLite for local development and keep models portable to PostgreSQL.
- Preserve clear application states for guided completion, simulated submission,
  and tracking.
- Store only the minimum data needed for the prototype.
- Use migrations or a documented schema-init approach once persistence is added.

## Quality and workflow

Work in small vertical slices. Before significant implementation:

1. Inspect relevant repository code and git status.
2. Define or update the API/data contract.
3. Implement the scoped change.
4. Add and run proportionate tests.
5. Update relevant documentation.
6. Report frontend impact, including endpoint, schema, or environment changes.

Add pytest coverage for eligibility rules, validation, workflow/state transitions,
and API behavior. Keep rules and tests easy to audit.

## Repository discipline

The repository is the source of truth.

- Preserve existing user changes and uncommitted work.
- Do not overwrite placeholders or files owned by another contributor without
  checking git status and scope.
- Do not use destructive git commands unless explicitly requested.
- Keep commits focused when commits are requested.
- Keep backend-only changes out of `/frontend` unless frontend changes are
  explicitly requested.
