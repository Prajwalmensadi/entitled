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
Create or update a citizen profile.

Request:

```json
{
  "age": 19,
  "state": "Karnataka",
  "education_level": "undergraduate",
  "course": "engineering",
  "family_income": 250000,
  "marks": 72
}
