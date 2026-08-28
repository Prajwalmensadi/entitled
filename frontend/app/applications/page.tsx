"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { listApplications, listBenefits, type Application, type Scheme } from "@/lib/api";
import { getStoredProfileId } from "@/lib/journey";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [profileId] = useState(() => getStoredProfileId());

  useEffect(() => {
    if (!profileId) {
      return;
    }
    Promise.all([listApplications(profileId), listBenefits()])
      .then(([loadedApplications, loadedSchemes]) => {
        setApplications(loadedApplications);
        setSchemes(loadedSchemes);
      })
      .catch((loadError: unknown) => setError(loadError instanceof Error ? loadError.message : "We could not load your applications."));
  }, [profileId]);

  function schemeName(schemeId: string) {
    return schemes.find((scheme) => scheme.scheme_id === schemeId)?.scheme_name || schemeId;
  }

  return <main className="min-h-screen bg-cream text-foreground"><nav className="border-b border-border bg-surface/90"><div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8"><Link href="/" className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-olive-deep text-sm font-bold text-white">E</div><span className="font-semibold">Entitled</span></Link><span className="rounded-full bg-sand px-3 py-1.5 text-xs font-semibold text-muted">Applications</span></div></nav><div className="mx-auto max-w-4xl px-5 py-8 sm:px-8 sm:py-12"><h1 className="text-3xl font-semibold tracking-tight text-olive-deep sm:text-5xl">Your applications</h1><p className="mt-4 text-muted">Track your simulated prototype applications.</p>{!profileId && <div role="alert" className="mt-6 rounded-2xl border border-[#e7c9bd] bg-[#faf0e8] p-4 text-sm text-[#8a4c35]">Create your profile before viewing applications.</div>}{error && <div role="alert" className="mt-6 rounded-2xl border border-[#e7c9bd] bg-[#faf0e8] p-4 text-sm text-[#8a4c35]">{error}</div>}{profileId && !error && applications.length === 0 && <p className="mt-8 rounded-2xl border border-border bg-surface p-5 text-sm text-muted">No applications yet.</p>}<div className="mt-8 space-y-4">{applications.map((application) => <Link key={application.application_id} href={`/applications/${application.application_id}`} className="block rounded-3xl border border-border bg-surface p-6 shadow-[0_14px_45px_rgba(38,58,46,0.06)] transition hover:-translate-y-0.5"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-light">{application.status}</p><h2 className="mt-2 text-xl font-semibold text-olive-deep">{schemeName(application.scheme_id)}</h2><p className="mt-2 text-sm text-muted">Application ID: {application.application_id}</p><p className="mt-1 text-sm text-muted">Created: {application.created_at}</p><p className="mt-1 text-sm text-muted">Submitted: {application.submitted_at || "Not submitted (draft)"}</p></Link>)}</div></div></main>;
}
