"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { listBenefits, type Scheme } from "@/lib/api";
import { getStoredProfileId } from "@/lib/journey";

type BenefitDetailsPageProps = { params: Promise<{ id: string }> };

export default function BenefitDetailsPage({ params }: BenefitDetailsPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [benefit, setBenefit] = useState<Scheme | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    listBenefits()
      .then((benefits) => setBenefit(benefits.find((item) => item.scheme_id === id) || null))
      .catch((loadError: unknown) => setError(loadError instanceof Error ? loadError.message : "We could not load this benefit."));
  }, [id]);

  function startEligibilityCheck() {
    if (!getStoredProfileId()) {
      setError("Create your profile before checking eligibility.");
      return;
    }
    router.push(`/benefits/${id}/eligibility`);
  }

  if (error || !benefit) {
    return <main className="min-h-screen bg-[#f7f8f5] px-5 py-16 text-[#17201a]"><div className="mx-auto max-w-3xl rounded-3xl border border-[#dfe5df] bg-white p-6 shadow-[0_12px_40px_rgba(23,59,43,0.05)] sm:p-8"><p className="text-sm leading-6 text-[#66716a]">{error || "Loading benefit details…"}</p><Link href="/benefits" className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#173b2b] px-5 text-sm font-semibold text-white">Back to benefits</Link></div></main>;
  }

  return (
    <main className="min-h-screen bg-[#f7f8f5] text-[#17201a]">
      <nav className="border-b border-[#e1e6e1] bg-white"><div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8"><Link href="/" className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#173b2b] text-sm font-bold text-white">E</div><span className="font-semibold">Entitled</span></Link><span className="text-sm text-[#66716a]">Hackathon prototype</span></div></nav>
      <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8 sm:py-12">
        <Link href="/benefits" className="inline-flex min-h-10 items-center rounded-lg text-sm font-medium text-[#2f7652] underline-offset-4 hover:underline">← Back to benefits</Link>
        <header className="mt-8"><span className="inline-flex rounded-full bg-[#eef4ef] px-3 py-1 text-xs font-medium text-[#2f7652]">{benefit.category}</span><h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">{benefit.scheme_name}</h1><p className="mt-4 text-lg font-medium text-[#24553d]">{benefit.benefit.summary}</p><p className="mt-3 max-w-2xl leading-7 text-[#68736c]">{benefit.description}</p></header>
        <div role="note" className="mt-8 rounded-2xl border border-[#d8e4da] bg-[#eef6f0] p-4 text-sm leading-6 text-[#24553d]"><strong className="font-semibold">Hackathon prototype:</strong> This is synthetic/demo benefit data. Eligibility is determined only by the backend check.</div>
        <div className="mt-8 grid gap-5 lg:grid-cols-[1.3fr_0.7fr]"><section className="rounded-3xl border border-[#dfe5df] bg-white p-5 shadow-[0_12px_40px_rgba(23,59,43,0.05)] sm:p-7"><h2 className="text-xl font-semibold tracking-tight">What you should know</h2><div className="mt-6 space-y-5 text-[#68736c]"><div><h3 className="font-semibold text-[#17201a]">Deadline</h3><p className="mt-1 leading-6">{benefit.deadline.date || benefit.deadline.type}</p></div><div><h3 className="font-semibold text-[#17201a]">Documents</h3><p className="mt-1 leading-6">{benefit.required_documents.length} document requirements are listed for this benefit.</p></div></div></section><aside className="h-fit rounded-3xl border border-[#dfe5df] bg-white p-5 shadow-[0_12px_40px_rgba(23,59,43,0.05)] sm:p-6"><p className="text-sm font-medium text-[#66716a]">Next step</p><h2 className="mt-2 text-xl font-semibold tracking-tight">Check whether this fits you</h2><p className="mt-3 text-sm leading-6 text-[#68736c]">The backend will compare your saved profile with this benefit&apos;s canonical requirements.</p><button type="button" onClick={startEligibilityCheck} className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#173b2b] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#24553d]">Check my eligibility</button>{error && <p role="alert" className="mt-3 text-xs leading-5 text-[#8a4c35]">{error}</p>}</aside></div>
      </div>
    </main>
  );
}
