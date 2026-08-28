"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { getApplication, listBenefits, type Application, type Scheme } from "@/lib/api";

type ApplicationTrackerPageProps = { params: Promise<{ id: string }> };

export default function ApplicationTrackerPage({ params }: ApplicationTrackerPageProps) {
  const { id } = use(params);
  const [application, setApplication] = useState<Application | null>(null);
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([getApplication(id), listBenefits()])
      .then(([loadedApplication, loadedSchemes]) => {
        setApplication(loadedApplication);
        setSchemes(loadedSchemes);
      })
      .catch((loadError: unknown) => setError(loadError instanceof Error ? loadError.message : "We could not load this application."));
  }, [id]);

  const schemeName = application
    ? schemes.find((scheme) => scheme.scheme_id === application.scheme_id)?.scheme_name || application.scheme_id
    : "";

  return <main className="min-h-screen bg-cream text-foreground"><nav className="sticky top-0 z-20 border-b border-border bg-cream/90 backdrop-blur-md"><div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8"><Link href="/" className="group flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-olive-deep text-sm font-bold text-white">E</div><span className="font-semibold tracking-tight text-olive-deep">Entitled</span></Link><span className="rounded-full bg-sand px-3 py-1.5 text-xs font-semibold text-muted">Application tracker</span></div></nav><div className="mx-auto max-w-4xl px-5 py-8 sm:px-8 sm:py-12"><Link href="/applications" className="group inline-flex min-h-10 items-center rounded-lg text-sm font-semibold text-olive">← Back to applications</Link><header className="relative mt-7 overflow-hidden rounded-[2rem] bg-olive-deep px-6 py-8 text-white shadow-[0_24px_70px_rgba(38,58,46,0.15)] sm:px-9 sm:py-10"><p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#d8b09f]">Application tracking</p><h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">Track your application</h1><p className="mt-4 max-w-2xl leading-7 text-[#e4ebe4] sm:text-lg">Status and timestamps below are returned by the backend.</p></header>{error && <div role="alert" className="mt-6 rounded-2xl border border-[#e7c9bd] bg-[#faf0e8] p-4 text-sm text-[#8a4c35]">{error}</div>}{!application && !error && <p className="mt-6 text-sm text-muted">Loading application…</p>}{application && <section className="mt-6 rounded-[2rem] border border-border bg-surface p-6 shadow-[0_18px_55px_rgba(38,58,46,0.07)] sm:p-8"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-light">Application</p><h2 className="mt-2 text-xl font-semibold text-olive-deep sm:text-2xl">{schemeName}</h2><p className="mt-2 text-sm text-muted">Application ID: {application.application_id}</p><span className="mt-5 inline-flex rounded-full bg-sand px-4 py-2 text-sm font-semibold text-olive-deep">{application.status}</span><div className="mt-7 space-y-3 rounded-2xl border border-border bg-cream p-5 text-sm text-muted"><p><strong className="text-olive-deep">Created:</strong> {application.created_at}</p><p><strong className="text-olive-deep">Submitted:</strong> {application.submitted_at || "Not submitted (draft)"}</p>{application.status === "submitted" && <p className="text-olive-deep">This was a simulated submission. No real government submission occurred.</p>}</div></section>}</div></main>;
}
