# API Contract

This document defines the interface between the Next.js frontend
and FastAPI backend.

Changes to this document must be communicated to both team members.

## Base URL

Development:

http://localhost:8000

Production:

TBD

---

## Health

### GET /api/health

Purpose:
Confirm that the backend process is running.

Response:

```json
{
  "status": "ok"
}
```

---

## Profile

### POST /api/profile

Purpose:
Create a citizen profile for the prototype.

Request schema:

- `age` (integer, required): a non-negative age up to 150.
- `state` (non-empty string, required)
- `district` (string, optional)
- `education_level` (non-empty string, required)
- `course` (string, optional)
- `family_income` (non-negative integer, required)
- `marks` (number from 0 through 100, optional)
- `category` (string, optional)
- `gender` (string, optional)
- `disability_status` (boolean, optional)

Example request:

```json
{
  "age": 19,
  "state": "Karnataka",
  "district": "Bengaluru",
  "education_level": "undergraduate",
  "course": "engineering",
  "family_income": 250000,
  "marks": 72,
  "category": "general",
  "gender": "female",
  "disability_status": false
}
```

Response schema:

The response returns all accepted profile fields plus a generated, stable
prototype profile `id`.

Example response:

```json
{
  "id": 1,
  "age": 19,
  "state": "Karnataka",
  "district": "Bengaluru",
  "education_level": "undergraduate",
  "course": "engineering",
  "family_income": 250000,
  "marks": 72,
  "category": "general",
  "gender": "female",
  "disability_status": false
}
```

Errors:

- `422 Unprocessable Entity`: malformed input, missing required fields, empty
  `state` or `education_level`, negative `age` or `family_income`, or `marks`
  outside 0–100.
- `500 Internal Server Error`: an unexpected application or database failure.
  The response does not expose internal implementation details.

Edge cases:

- Optional fields may be omitted and are returned as `null`.
- Optional text containing only whitespace is stored as `null`.
- This endpoint creates a new profile; profile update behavior is not part of
  this slice.
