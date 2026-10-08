"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { checkEligibility, type EligibilityCheck } from "@/lib/api";
import { getStoredProfileId } from "@/lib/journey";

type EligibilityPageProps = { params: Promise<{ id: string }> };

export default function EligibilityPage({ params }: EligibilityPageProps) {
  const { id } = use(params);
  const [result, setResult] = useState<EligibilityCheck | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [profileId] = useState(() => getStoredProfileId());

  useEffect(() => {
    if (!profileId) {
      return;
    }
    checkEligibility({ profile_id: profileId, scheme_id: id })
      .then(setResult)
      .catch((loadError: unknown) => setError(loadError instanceof Error ? loadError.message : "We could not check eligibility."));
  }, [id, profileId]);

  const title = result ? result.status.replaceAll("_", " ") : "Checking eligibility";
  return (
    <main className="min-h-screen bg-cream text-foreground">
      <nav className="sticky top-0 z-20 border-b border-border bg-cream/90 backdrop-blur-md"><div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8"><Link href="/" className="group flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-olive-deep text-sm font-bold text-white">E</div><span className="font-semibold tracking-tight text-olive-deep">Entitled</span></Link><span className="rounded-full bg-sand px-3 py-1.5 text-xs font-semibold text-muted">Eligibility</span></div></nav>
      <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8 sm:py-12"><Link href={`/benefits/${id}`} className="group inline-flex min-h-10 items-center rounded-lg text-sm font-semibold text-olive">← Back to benefit</Link>
        <header className="relative mt-7 overflow-hidden rounded-[2rem] bg-olive-deep px-6 py-8 text-white shadow-[0_24px_70px_rgba(38,58,46,0.15)] sm:px-9 sm:py-10"><p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#d8b09f]">Eligibility check</p><h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">{title}</h1><p className="mt-4 max-w-2xl leading-7 text-[#e4ebe4] sm:text-lg">This result is returned by the deterministic backend eligibility service.</p></header>
        {!profileId && <div role="alert" className="mt-6 rounded-2xl border border-[#e7c9bd] bg-[#faf0e8] p-4 text-sm leading-6 text-[#8a4c35]">Create your profile before checking eligibility.</div>}
        {error && <div role="alert" className="mt-6 rounded-2xl border border-[#e7c9bd] bg-[#faf0e8] p-4 text-sm leading-6 text-[#8a4c35]">{error}</div>}
        {!result && !error && <p className="mt-6 text-sm text-muted">Loading eligibility result…</p>}
        {result && <><section className="mt-8 rounded-[2rem] border border-border bg-surface p-6 shadow-[0_18px_55px_rgba(38,58,46,0.07)] sm:p-8"><p className="text-sm font-semibold uppercase tracking-[0.12em] text-terracotta">Backend rule results</p><h2 className="mt-2 text-2xl font-semibold tracking-tight text-olive-deep sm:text-3xl">Why this status was returned</h2><div className="mt-7 divide-y divide-border">{result.rule_results.map((rule) => <div key={rule.rule_id} className="py-5"><p className="font-semibold text-olive-deep">{rule.reason}</p><p className="mt-1 text-sm text-muted">{rule.field || "Rule"} · {rule.operator || "condition"} · {rule.result.replaceAll("_", " ")}</p></div>)}</div>{result.missing_information.length > 0 && <div className="mt-6 rounded-2xl border border-[#d8d0bd] bg-sand p-4 text-sm text-olive-deep"><strong>Missing information:</strong> {result.missing_information.join(", ")}</div>}</section><section className="mt-6 rounded-[2rem] border border-border bg-surface p-6 sm:p-8"><Link href={`/benefits/${id}/documents`} className="inline-flex min-h-11 items-center justify-center rounded-xl bg-olive-deep px-5 text-sm font-semibold text-white">Check documents →</Link></section></>}
      </div>
    </main>
  );
}
