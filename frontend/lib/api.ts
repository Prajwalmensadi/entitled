const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");

export type ProfileInput = {
  age: number;
  state: string;
  district?: string | null;
  education_level: string;
  course?: string | null;
  family_income: number;
  marks?: number | null;
  category?: string | null;
  gender?: string | null;
  disability_status?: boolean | null;
};

export type Profile = ProfileInput & {
  id: number;
};

export type Geography = {
  level: "national" | "state" | "district";
  states: string[];
  districts: string[];
};

export type BenefitDetails = {
  type: string;
  summary: string;
  amount: string | null;
  frequency: string | null;
};

export type RequiredDocument = {
  document_id: string;
  name: string;
  required: boolean;
  notes: string | null;
};

export type Deadline = {
  type: "date" | "rolling" | "not_announced";
  date: string | null;
  notes: string | null;
};

export type SourceReference = {
  reference_type: "synthetic_demo" | "authoritative_reference";
  name: string;
  url: string | null;
};

export type Scheme = {
  scheme_id: string;
  scheme_name: string;
  category: string;
  geography: Geography;
  description: string;
  benefit: BenefitDetails;
  required_documents: RequiredDocument[];
  deadline: Deadline;
  source: SourceReference;
  last_verified: string;
  demo_status: string;
};

export type EligibilityCheckRequest = {
  profile_id: number;
  scheme_id: string;
};

export type RuleResult = {
  rule_id: string;
  field: string | null;
  operator: string | null;
  result: "passed" | "failed" | "needs_information";
  reason: string;
};

export type EligibilityCheck = {
  scheme_id: string;
  status: "likely_eligible" | "likely_not_eligible" | "needs_more_information";
  rule_results: RuleResult[];
  missing_information: string[];
};

export type SchemeDocuments = {
  scheme_id: string;
  documents: RequiredDocument[];
};

export type ApplicationCreateInput = {
  profile_id: number;
  scheme_id: string;
  provided_document_ids: string[];
  application_data: Record<string, unknown>;
};

export type Application = {
  application_id: string;
  profile_id: number;
  scheme_id: string;
  status: "draft" | "submitted";
  application_data: Record<string, unknown>;
  provided_document_ids: string[];
  created_at: string;
  updated_at: string;
  submitted_at: string | null;
};

export class ApiError extends Error {
  readonly status: number;
  readonly detail: unknown;

  constructor(status: number, detail: unknown) {
    super(
      typeof detail === "string"
        ? detail
        : detail
          ? JSON.stringify(detail)
          : `API request failed with status ${status}`,
    );
    this.name = "ApiError";
    this.status = status;
    this.detail = detail;
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set("Accept", "application/json");
  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers,
  });
  const responseText = await response.text();
  const body = responseText ? parseResponseBody(responseText) : null;

  if (!response.ok) {
    throw new ApiError(
      response.status,
      isErrorResponse(body) ? body.detail : body,
    );
  }

  return body as T;
}

function parseResponseBody(responseText: string): unknown {
  try {
    return JSON.parse(responseText) as unknown;
  } catch {
    return responseText;
  }
}

function isErrorResponse(value: unknown): value is { detail?: unknown } {
  return typeof value === "object" && value !== null && "detail" in value;
}

export function createProfile(profile: ProfileInput): Promise<Profile> {
  return request("/api/profile", {
    method: "POST",
    body: JSON.stringify(profile),
  });
}

export function listBenefits(): Promise<Scheme[]> {
  return request("/api/benefits");
}

export function checkEligibility(
  eligibilityRequest: EligibilityCheckRequest,
): Promise<EligibilityCheck> {
  return request("/api/eligibility/check", {
    method: "POST",
    body: JSON.stringify(eligibilityRequest),
  });
}

export function getSchemeDocuments(schemeId: string): Promise<SchemeDocuments> {
  return request(`/api/benefits/${encodeURIComponent(schemeId)}/documents`);
}

export function createApplication(
  application: ApplicationCreateInput,
): Promise<Application> {
  return request("/api/applications", {
    method: "POST",
    body: JSON.stringify(application),
  });
}

export function listApplications(profileId: number): Promise<Application[]> {
  const query = new URLSearchParams({ profile_id: String(profileId) });
  return request(`/api/applications?${query.toString()}`);
}

export function getApplication(applicationId: string): Promise<Application> {
  return request(`/api/applications/${encodeURIComponent(applicationId)}`);
}

export function submitApplication(applicationId: string): Promise<Application> {
  return request(
    `/api/applications/${encodeURIComponent(applicationId)}/submit`,
    { method: "POST" },
  );
}
