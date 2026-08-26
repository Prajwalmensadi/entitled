# Architecture

## High-Level Architecture

Citizen
    ↓
Next.js Frontend
    ↓
FastAPI Backend
    ↓
Service Layer
    ├── Profile Service
    ├── Scheme Service
    ├── Eligibility Engine
    ├── Document Service
    ├── Application Service
    ├── Tracking Service
    └── AI Service
    ↓
Database

AI is used for:
- Natural-language profile extraction
- Eligibility explanation
- Application assistance

Eligibility decisions are produced by deterministic rules,
not by the LLM.