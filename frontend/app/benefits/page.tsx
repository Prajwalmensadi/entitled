"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { listBenefits, type Scheme } from "@/lib/api";

export default function BenefitsPage() {
    const [benefits, setBenefits] = useState<Scheme[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        listBenefits()
            .then(setBenefits)
            .catch((loadError: unknown) => {
                setError(
                    loadError instanceof Error
                        ? loadError.message
                        : "We could not load benefits. Please try again.",
                );
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <main className="min-h-screen bg-cream text-foreground">
            {/* Navigation */}
            <nav className="sticky top-0 z-20 border-b border-border bg-cream/90 backdrop-blur-md">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
                    <Link
                        href="/"
                        className="group flex items-center gap-3 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-olive-deep text-sm font-bold text-white shadow-sm transition-transform duration-200 group-hover:-translate-y-0.5">
                            E
                        </div>

                        <span className="font-semibold tracking-tight text-olive-deep">
                            Entitled
                        </span>
                    </Link>

                    <span className="rounded-full bg-sand px-3 py-1.5 text-xs font-semibold text-muted">
                        Benefits
                    </span>
                </div>
            </nav>

            <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
                {/* Hero */}
                <header className="relative overflow-hidden rounded-[2rem] bg-olive-deep px-6 py-8 text-white shadow-[0_24px_70px_rgba(38,58,46,0.16)] sm:px-10 sm:py-10">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-terracotta/20 blur-3xl"
                    />

                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -bottom-28 right-24 h-48 w-48 rounded-full bg-olive/30 blur-3xl"
                    />

                    <div className="relative max-w-3xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#d8b09f]">
                            Your benefits
                        </p>

                        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
                            Support that fits your journey.
                        </h1>

                        <p className="mt-4 max-w-2xl text-base leading-7 text-[#e5ebe5] sm:text-lg">
                            Explore scholarships, grants and other support that may be
                            relevant to your profile.
                        </p>

                        <div className="mt-7 flex flex-wrap gap-3">
                            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur-sm">
                                {benefits.length} benefits
                            </span>

                            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur-sm">
                                Eligibility checked separately
                            </span>
                        </div>
                    </div>
                </header>

                {/* Prototype notice */}
                <div
                    role="note"
                    className="mt-6 rounded-2xl border border-[#d8d0bd] bg-sand p-4 text-sm leading-6 text-olive-deep"
                >
                    <strong className="font-semibold">Prototype data:</strong>{" "}
                    The benefits shown here are synthetic demo data. Eligibility is
                    checked separately using the backend eligibility service.
                </div>

                {/* Benefits */}
                <section className="mt-10" aria-labelledby="benefits-heading">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-terracotta">
                                Explore
                            </p>

                            <h2
                                id="benefits-heading"
                                className="mt-2 text-2xl font-semibold tracking-tight text-olive-deep sm:text-3xl"
                            >
                                Benefits you may be eligible for
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-muted">
                                Review each benefit before checking your eligibility.
                            </p>
                        </div>

                        <span className="text-sm font-medium text-muted-light">
                            {benefits.length} available
                        </span>
                    </div>

                    <div className="mt-6 grid gap-5 lg:grid-cols-2">
                        {loading && (
                            <p className="text-sm leading-6 text-muted">Loading available benefits…</p>
                        )}

                        {error && (
                            <p role="alert" className="text-sm leading-6 text-[#8a4c35]">{error}</p>
                        )}

                        {!loading && !error && benefits.length === 0 && (
                            <p className="text-sm leading-6 text-muted">No demo benefits are available right now.</p>
                        )}

                        {benefits.map((benefit, index) => (
                            <article
                                key={benefit.scheme_id}
                                className={`group flex h-full flex-col rounded-3xl border border-border bg-surface p-6 shadow-[0_14px_45px_rgba(38,58,46,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#c8cbbf] hover:shadow-[0_22px_55px_rgba(38,58,46,0.11)] sm:p-7 ${index === 0 ? "lg:col-span-2" : ""
                                    }`}
                            >
                                <div className="flex items-start justify-between gap-5">
                                    <div>
                                        <span className="inline-flex rounded-full bg-[#eef0e8] px-3 py-1.5 text-xs font-semibold text-olive">
                                            {benefit.category}
                                        </span>

                                        <h3 className="mt-4 text-xl font-semibold tracking-tight text-olive-deep sm:text-2xl">
                                            {benefit.scheme_name}
                                        </h3>
                                    </div>

                                    <div
                                        aria-hidden="true"
                                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sand text-terracotta transition-all duration-300 group-hover:-translate-y-1 group-hover:rotate-3"
                                    >
                                        →
                                    </div>
                                </div>

                                <p className="mt-4 font-semibold text-olive">
                                    {benefit.benefit.summary}
                                </p>

                                <p className="mt-2 max-w-2xl leading-6 text-muted">
                                    {benefit.description}
                                </p>

                                <div className="mt-6 grid gap-4 border-t border-border pt-6 sm:grid-cols-3">
                                    <div className="flex gap-3">
                                        <span
                                            aria-hidden="true"
                                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#eef0e8] text-sm font-semibold text-olive"
                                        >
                                            ✓
                                        </span>

                                        <div>
                                            <p className="text-sm font-semibold text-olive-deep">
                                                Requirement
                                            </p>

                                            <p className="mt-1 text-sm leading-5 text-muted">
                                                Requirements are checked separately.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <span
                                            aria-hidden="true"
                                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sand text-sm text-terracotta"
                                        >
                                            •
                                        </span>

                                        <div>
                                            <p className="text-sm font-semibold text-olive-deep">
                                                Deadline
                                            </p>

                                            <p className="mt-1 text-sm leading-5 text-muted">
                                                {benefit.deadline.date || benefit.deadline.type}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <span
                                            aria-hidden="true"
                                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sand text-sm text-terracotta"
                                        >
                                            •
                                        </span>

                                        <div>
                                            <p className="text-sm font-semibold text-olive-deep">
                                                Documents
                                            </p>

                                            <p className="mt-1 text-sm leading-5 text-muted">
                                                {benefit.required_documents.length} listed
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-7 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                                    <p className="text-xs text-muted-light">
                                        Check eligibility before applying.
                                    </p>

                                    <Link
                                        href={`/benefits/${benefit.scheme_id}`}
                                        className="group/button inline-flex min-h-11 items-center justify-center rounded-xl bg-olive-deep px-5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-olive focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
                                    >
                                        View details
                                        <span className="ml-2 transition-transform duration-200 group-hover/button:translate-x-1">
                                            →
                                        </span>
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                {/* Bottom reassurance */}
                <div className="mt-8 flex items-start gap-3 rounded-2xl border border-border bg-surface/70 p-4">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sand text-sm font-semibold text-olive-deep">
                        i
                    </div>

                    <p className="text-sm leading-6 text-muted">
                        Eligibility is determined separately by the backend service. This
                        page is for discovering and exploring available benefits.
                    </p>
                </div>
            </div>
        </main>
    );
}
