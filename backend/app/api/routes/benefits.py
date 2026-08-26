"""Citizen-facing benefit discovery endpoints."""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.dependencies import get_db
from app.schemas.scheme import SchemeDocumentsResponse, SchemeResponse
from app.services.scheme import get_scheme, get_scheme_documents, list_schemes

router = APIRouter(tags=["benefits"])


@router.get("/benefits", response_model=list[SchemeResponse])
def get_benefits(db: Session = Depends(get_db)) -> list[SchemeResponse]:
    """List citizen-facing scheme information in deterministic order."""

    return list_schemes(db)


@router.get("/benefits/{scheme_id}", response_model=SchemeResponse)
def get_benefit(scheme_id: str, db: Session = Depends(get_db)) -> SchemeResponse:
    """Return citizen-facing information for one scheme."""

    scheme = get_scheme(db, scheme_id)
    if scheme is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Scheme not found",
        )
    return scheme


@router.get(
    "/benefits/{scheme_id}/documents",
    response_model=SchemeDocumentsResponse,
)
def get_benefit_documents(
    scheme_id: str,
    db: Session = Depends(get_db),
) -> SchemeDocumentsResponse:
    """Return canonical document requirements for one scheme."""

    scheme_documents = get_scheme_documents(db, scheme_id)
    if scheme_documents is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Scheme not found",
        )
    returned_scheme_id, documents = scheme_documents
    return SchemeDocumentsResponse(scheme_id=returned_scheme_id, documents=documents)
