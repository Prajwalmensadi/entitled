"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createApplication, listBenefits, submitApplication, type Scheme } from "@/lib/api";
import { getSelectedDocumentIds, getStoredProfileId } from "@/lib/journey";

type ApplicationPageProps = { params: Promise<{ id: string }> };

export default function ApplicationPage({ params }: ApplicationPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [scheme, setScheme] = useState<Scheme | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    listBenefits()
      .then((benefits) => setScheme(benefits.find((item) => item.scheme_id === id) || null))
      .catch((loadError: unknown) => setError(loadError instanceof Error ? loadError.message : "We could not load this benefit."));
  }, [id]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const profileId = getStoredProfileId();
    if (!profileId) {
      setError("Create your profile before preparing an application.");
      return;
    }
    const formData = new FormData(event.currentTarget);
    setLoading(true);
    setError(null);
    try {
      const draft = await createApplication({
        profile_id: profileId,
        scheme_id: id,
        provided_document_ids: getSelectedDocumentIds(id),
        application_data: {
          institution: String(formData.get("institution")),
          course: String(formData.get("course")),
          reason: String(formData.get("reason")),
        },
      });
      const submittedApplication = await submitApplication(draft.application_id);
      router.push(`/applications/${submittedApplication.application_id}`);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "We could not submit this simulated application.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-cream text-foreground">
      <nav className="sticky top-0 z-20 border-b border-border bg-cream/90 backdrop-blur-md"><div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8"><Link href="/" className="group flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-olive-deep text-sm font-bold text-white">E</div><span className="font-semibold tracking-tight text-olive-deep">Entitled</span></Link><span className="rounded-full bg-sand px-3 py-1.5 text-xs font-semibold text-muted">Application</span></div></nav>
      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-12"><Link href={`/benefits/${id}/documents`} className="group inline-flex min-h-10 items-center rounded-lg text-sm font-semibold text-olive">← Back to documents</Link><header className="mt-7"><p className="text-sm font-semibold uppercase tracking-[0.14em] text-terracotta">Application preparation</p><h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.03em] text-olive-deep sm:text-5xl">Prepare your application</h1><p className="mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg">Review your information and complete the remaining details before simulated submission.</p></header>
        <section className="mt-8 rounded-[2rem] bg-olive-deep p-6 text-white shadow-[0_20px_60px_rgba(38,58,46,0.12)] sm:p-8"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#d8b09f]">Applying for</p><h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{scheme?.scheme_name || "Loading benefit…"}</h2><p className="mt-2 text-sm leading-6 text-[#d5ded7]">{scheme?.benefit.summary}</p></section>
        <form onSubmit={handleSubmit}><section className="mt-6 rounded-[2rem] border border-border bg-surface p-6 shadow-[0_18px_55px_rgba(38,58,46,0.06)] sm:p-8"><p className="text-sm font-semibold uppercase tracking-[0.12em] text-terracotta">Final details</p><h2 className="mt-2 text-2xl font-semibold tracking-tight text-olive-deep sm:text-3xl">Tell us a little more</h2><div className="mt-7 grid gap-6 sm:grid-cols-2"><label className="block"><span className="text-sm font-semibold text-olive-deep">College / institution</span><input name="institution" required className="mt-3 min-h-12 w-full rounded-xl border border-border bg-white px-4" /></label><label className="block"><span className="text-sm font-semibold text-olive-deep">Course / programme</span><input name="course" required className="mt-3 min-h-12 w-full rounded-xl border border-border bg-white px-4" /></label><label className="block sm:col-span-2"><span className="text-sm font-semibold text-olive-deep">Why are you applying?</span><textarea name="reason" rows={5} required className="mt-3 w-full resize-none rounded-xl border border-border bg-white px-4 py-3" /></label></div><div role="note" className="mt-7 rounded-2xl border border-[#d8d0bd] bg-sand p-4 text-sm leading-6 text-muted"><strong className="text-olive-deep">Simulation:</strong> This sends a simulated application only. It does not submit to a government system.</div>{error && <div role="alert" className="mt-4 rounded-2xl border border-[#e7c9bd] bg-[#faf0e8] p-4 text-sm text-[#8a4c35]">{error}</div>}<div className="mt-7 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between"><Link href={`/benefits/${id}/documents`} className="inline-flex min-h-11 items-center justify-center rounded-xl border border-border bg-white px-5 text-sm font-semibold text-olive-deep">← Review documents</Link><button type="submit" disabled={loading || !scheme} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-olive-deep px-6 text-sm font-semibold text-white disabled:opacity-50">{loading ? "Submitting…" : "Submit simulated application"}</button></div></section></form>
      </div>
    </main>
  );
}
