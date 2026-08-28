const PROFILE_ID_KEY = "entitled.profile_id";
const DOCUMENTS_KEY_PREFIX = "entitled.documents.";

export function getStoredProfileId(): number | null {
  if (typeof window === "undefined") {
    return null;
  }

  const storedValue = window.localStorage.getItem(PROFILE_ID_KEY);
  const profileId = Number(storedValue);
  return Number.isInteger(profileId) && profileId > 0 ? profileId : null;
}

export function setStoredProfileId(profileId: number): void {
  window.localStorage.setItem(PROFILE_ID_KEY, String(profileId));
}

export function getSelectedDocumentIds(schemeId: string): string[] {
  const storedValue = window.localStorage.getItem(
    `${DOCUMENTS_KEY_PREFIX}${schemeId}`,
  );
  if (!storedValue) {
    return [];
  }

  try {
    const documentIds: unknown = JSON.parse(storedValue);
    return Array.isArray(documentIds)
      ? documentIds.filter((documentId): documentId is string => typeof documentId === "string")
      : [];
  } catch {
    return [];
  }
}

export function setSelectedDocumentIds(
  schemeId: string,
  documentIds: string[],
): void {
  window.localStorage.setItem(
    `${DOCUMENTS_KEY_PREFIX}${schemeId}`,
    JSON.stringify(documentIds),
  );
}
