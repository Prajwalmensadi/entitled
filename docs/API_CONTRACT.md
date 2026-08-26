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

## Eligibility

### POST /api/eligibility/check

Purpose:
Evaluate the canonical deterministic eligibility rules for a seeded scheme
against an existing citizen profile. The endpoint does not use AI or an LLM to
make the eligibility decision.

Request:

```json
{
  "profile_id": 1,
  "scheme_id": "demo-education-support-001"
}
```

Response schema:

- `scheme_id`: stable scheme identifier.
- `status`: one of `likely_eligible`, `likely_not_eligible`, or
  `needs_more_information`.
- `rule_results`: deterministic condition-level trace containing `rule_id`,
  `field`, `operator`, `result`, and a deterministic reason.
- `missing_information`: profile fields required by rules but not present.

Example response:

```json
{
  "scheme_id": "demo-education-support-001",
  "status": "likely_eligible",
  "rule_results": [
    {
      "rule_id": "demo-state-present",
      "field": "state",
      "operator": "exists",
      "result": "passed",
      "reason": "State information is present."
    }
  ],
  "missing_information": []
}
```

Status behavior:

- `likely_eligible`: the rule tree passes with the available profile data.
- `likely_not_eligible`: the rule tree fails with the available profile data.
- `needs_more_information`: no determining pass/failure is possible because
  one or more profile fields required by rules are missing.

Errors:

- `404 Not Found`: `{"detail": "Profile not found"}` when `profile_id` is
  absent; `{"detail": "Scheme not found"}` when `scheme_id` is absent.
- `422 Unprocessable Entity`: malformed request data, including an invalid
  `profile_id` or an empty `scheme_id`.
- `500 Internal Server Error`: unexpected application or database failure,
  without implementation details.

Edge cases:

- The endpoint accepts only persisted `profile_id` and `scheme_id` references;
  it does not accept an arbitrary profile object.
- Raw scheme rules remain backend-owned and are read from the seeded scheme
  record at evaluation time.
- Missing information does not automatically make a citizen ineligible.

---

## Benefits

The benefits endpoints return synthetic/demo scheme data only in this slice.
They do not represent an official government service, and raw deterministic
eligibility rules are intentionally not exposed.

### GET /api/benefits

Purpose:
List citizen-facing benefit scheme information.

Response schema:

An array of scheme objects, ordered deterministically by `scheme_id`. Each
object contains:

- `scheme_id`
- `scheme_name`
- `category`
- `geography`
- `description`
- `benefit`
- `required_documents`
- `deadline`
- `source`
- `last_verified`
- `demo_status`

Example response:

```json
[
  {
    "scheme_id": "demo-education-support-001",
    "scheme_name": "Demo Education Support",
    "category": "education_scholarship",
    "geography": {
      "level": "state",
      "states": ["Demo State"],
      "districts": []
    },
    "description": "Synthetic demo scheme for prototype testing; it is not an official government service or programme.",
    "benefit": {
      "type": "demo_support",
      "summary": "Synthetic demonstration support for students in a prototype flow.",
      "amount": null,
      "frequency": null
    },
    "required_documents": [
      {
        "document_id": "demo-student-record",
        "name": "Demo student record",
        "required": true,
        "notes": "Synthetic prototype document requirement."
      },
      {
        "document_id": "demo-supporting-note",
        "name": "Demo supporting note",
        "required": false,
        "notes": "Optional synthetic prototype document."
      }
    ],
    "deadline": {
      "type": "rolling",
      "date": null,
      "notes": "Synthetic demo data."
    },
    "source": {
      "reference_type": "synthetic_demo",
      "name": "Entitled prototype seed data",
      "url": null
    },
    "last_verified": "2026-08-26",
    "demo_status": "demo_simplified"
  }
]
```

Errors:

- `500 Internal Server Error`: unexpected application or database failure.

Edge cases:

- An empty array is returned when no scheme data has been seeded.
- The endpoint does not expose `eligibility_rules`; they remain backend-owned
  data for the future deterministic eligibility engine.

### GET /api/benefits/{scheme_id}

Purpose:
Return citizen-facing information for one scheme identified by its stable
`scheme_id`.

Response schema:

Returns the same scheme object shape as `GET /api/benefits`.

Example response:

```json
{
  "scheme_id": "demo-education-support-001",
  "scheme_name": "Demo Education Support",
  "category": "education_scholarship",
  "demo_status": "demo_simplified"
}
```

Errors:

- `404 Not Found`: no scheme exists for the provided `scheme_id`.
- `500 Internal Server Error`: unexpected application or database failure.

Edge cases:

- A scheme must be loaded through the explicit seed operation before it can be
  returned.
- The response intentionally omits raw `eligibility_rules`.

### GET /api/benefits/{scheme_id}/documents

Purpose:
Return the canonical document requirements declared by one seeded scheme.
These are synthetic/demo requirements in the current prototype and are not
documents supplied by a citizen for an application.

Response schema:

- `scheme_id`: stable scheme identifier.
- `documents`: canonical array of `document_id`, `name`, `required`, and
  optional `notes` values.

Example response:

```json
{
  "scheme_id": "demo-education-support-001",
  "documents": [
    {
      "document_id": "demo-student-record",
      "name": "Demo student record",
      "required": true,
      "notes": "Synthetic prototype document requirement."
    },
    {
      "document_id": "demo-supporting-note",
      "name": "Demo supporting note",
      "required": false,
      "notes": "Optional synthetic prototype document."
    }
  ]
}
```

Errors:

- `404 Not Found`: no scheme exists for the provided `scheme_id`.
- `500 Internal Server Error`: unexpected application or database failure.

Edge cases:

- A scheme must be loaded through the explicit seed operation before document
  requirements can be returned.
- The endpoint returns the same canonical `required_documents` data used by the
  scheme and does not expose `eligibility_rules`.

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
---

## Applications

Applications are simulated prototype applications. They are not submitted to a real government system.

### POST /api/applications

Create a validated draft application.

The backend verifies:
- the profile exists
- the scheme exists
- the profile is currently likely eligible
- all provided document IDs belong to the scheme
- all required scheme documents are provided
- no existing application exists for the same profile and scheme

Request:

```json
{
  "profile_id": 1,
  "scheme_id": "demo-education-support-001",
  "provided_document_ids": [
    "demo-student-record"
  ],
  "application_data": {}
}