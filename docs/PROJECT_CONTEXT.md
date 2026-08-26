# Build What Moves India — Project Context

> Living technical/product context for all coding agents and engineers working on the project.
>
> Last updated: 2026-08-26
>
> Repository: `entitled`
>
> Current backend branch at the time of this document: `feature/backend-foundation`

---

# 1. PROJECT IDENTITY

## Project

Build What Moves India

## Product

Citizen-first public-benefits navigator focused on education and scholarship benefits for the hackathon MVP.

The product helps a citizen:

1. Create a personal profile.
2. Discover relevant education/scholarship benefits.
3. Understand why a benefit appears relevant.
4. Understand required documents.
5. Complete a guided application.
6. Submit a simulated application.
7. Receive an application ID.
8. Track submitted applications.

The system uses synthetic/demo data and simulated government integrations.

It is NOT an official Government of India service.

The prototype must never imply government endorsement, affiliation, or live government integration.

---

# 2. PROJECT GOAL

Build a polished, credible, end-to-end citizen journey rather than a collection of disconnected technical features.

The primary success criterion is:

Profile
↓
Benefits
↓
Eligibility
↓
Documents
↓
Application
↓
Submission
↓
Tracking

The product should feel like one coherent citizen experience.

---

# 3. SOURCE OF TRUTH

The shared GitHub repository is the single source of truth.

Repository structure:

```text
entitled/
├── frontend/
├── backend/
├── data/
│   └── schemes/
├── docs/
├── .env.example
├── .gitignore
├── AGENTS.md
├── README.md
└── ...