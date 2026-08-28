"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { getSchemeDocuments, type RequiredDocument } from "@/lib/api";
import { getSelectedDocumentIds, setSelectedDocumentIds } from "@/lib/journey";

type DocumentsPageProps = { params: Promise<{ id: string }> };

export default function DocumentsPage({ params }: DocumentsPageProps) {
  const { id } = use(params);
  const [documents, setDocuments] = useState<RequiredDocument[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>(() => getSelectedDocumentIds(id));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getSchemeDocuments(id)
      .then((response) => setDocuments(response.documents))
      .catch((loadError: unknown) => setError(loadError instanceof Error ? loadError.message : "We could not load document requirements."));
  }, [id]);

  function toggleDocument(documentId: string) {
    setSelectedIds((currentIds) => {
      const nextIds = currentIds.includes(documentId)
        ? currentIds.filter((item) => item !== documentId)
        : [...currentIds, documentId];
      setSelectedDocumentIds(id, nextIds);
      return nextIds;
    });
  }

  const requiredCount = documents.filter((document) => document.required).length;
  return (
    <main className="min-h-screen bg-cream text-foreground">
      <nav className="sticky top-0 z-20 border-b border-border bg-cream/90 backdrop-blur-md"><div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8"><Link href="/" className="group flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-olive-deep text-sm font-bold text-white">E</div><span className="font-semibold tracking-tight text-olive-deep">Entitled</span></Link><span className="rounded-full bg-sand px-3 py-1.5 text-xs font-semibold text-muted">Documents</span></div></nav>
      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-12"><Link href={`/benefits/${id}/eligibility`} className="group inline-flex min-h-10 items-center rounded-lg text-sm font-semibold text-olive">← Back to eligibility</Link><header className="relative mt-7 overflow-hidden rounded-[2rem] bg-olive-deep px-6 py-8 text-white shadow-[0_24px_70px_rgba(38,58,46,0.15)] sm:px-9 sm:py-10"><p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#d8b09f]">Application readiness</p><h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">Check your documents</h1><p className="mt-4 max-w-2xl text-base leading-7 text-[#e4ebe4] sm:text-lg">Select the documents you have available for this simulated application.</p></header>
        {error && <div role="alert" className="mt-6 rounded-2xl border border-[#e7c9bd] bg-[#faf0e8] p-4 text-sm text-[#8a4c35]">{error}</div>}
        <section className="mt-6 rounded-[2rem] border border-border bg-surface p-6 shadow-[0_18px_55px_rgba(38,58,46,0.07)] sm:p-8"><p className="text-sm font-semibold uppercase tracking-[0.12em] text-terracotta">Checklist</p><h2 className="mt-2 text-2xl font-semibold tracking-tight text-olive-deep sm:text-3xl">{selectedIds.length} selected · {requiredCount} required</h2><div className="mt-7 divide-y divide-border">{documents.map((document) => { const selected = selectedIds.includes(document.document_id); return <label key={document.document_id} className="group flex cursor-pointer flex-col gap-4 py-6 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-start gap-4"><input type="checkbox" checked={selected} onChange={() => toggleDocument(document.document_id)} className="mt-1 h-4 w-4 accent-[#65784e]"/><div><h3 className="font-semibold text-olive-deep">{document.name}{document.required ? " · Required" : " · Optional"}</h3>{document.notes && <p className="mt-1 max-w-xl text-sm leading-6 text-muted">{document.notes}</p>}</div></div><span className={`self-start rounded-full px-3 py-1.5 text-xs font-semibold sm:self-auto ${selected ? "bg-[#edf3e8] text-olive" : "bg-sand text-terracotta"}`}>{selected ? "Selected" : "Not selected"}</span></label>; })}</div></section>
        <section className="relative mt-6 overflow-hidden rounded-[2rem] bg-surface p-6 shadow-[0_18px_55px_rgba(38,58,46,0.07)] ring-1 ring-border sm:p-8"><p className="text-sm font-semibold uppercase tracking-[0.12em] text-terracotta">Next step</p><h2 className="mt-2 text-2xl font-semibold tracking-tight text-olive-deep sm:text-3xl">Prepare your application</h2><Link href={`/benefits/${id}/application`} className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-olive-deep px-6 text-sm font-semibold text-white">Prepare application →</Link></section>
      </div>
    </main>
  );
}
