"use client";

import Link from "next/link";
import { use, useState } from "react";
import type { FormEvent } from "react";

type ApplicationPageProps = {
    params: Promise<{
        id: string;
    }>;
};

const applicationSections = [
    {
        number: "01",
        title: "Applicant information",
        description:
            "Review the personal information that will be used for your application.",
        status: "Ready",
    },
    {
        number: "02",
        title: "Education details",
        description:
            "Confirm your current education and academic information.",
        status: "Ready",
    },
    {
        number: "03",
        title: "Application details",
        description:
            "Provide the additional information required for this benefit.",
        status: "To complete",
    },
];

export default function ApplicationPage({
    params,
}: ApplicationPageProps) {
    const { id } = use(params);
    const [submitted, setSubmitted] = useState(false);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSubmitted(true);
    }

    if (submitted) {
        return (
            <main className="min-h-screen bg-cream text-foreground">
                <nav className="sticky top-0 z-20 border-b border-border bg-cream/90 backdrop-blur-md">
                    <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
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
                            Application
                        </span>
                    </div>
                </nav>

                <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
                    <section className="relative overflow-hidden rounded-[2rem] bg-olive-deep p-7 text-white shadow-[0_24px_70px_rgba(38,58,46,0.15)] sm:p-10">
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-terracotta/20 blur-3xl"
                        />

                        <div className="relative">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-xl text-[#e5c4b5] ring-1 ring-white/10">
                                ✓
                            </div>

                            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-[#d8b09f]">
                                Application ready
                            </p>

                            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                                Your application is ready to review
                            </h1>

                            <p className="mt-4 max-w-2xl leading-7 text-[#e4ebe4]">
                                Your prototype application has been prepared successfully.
                                The final submission will be connected to the backend
                                application service.
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <Link
                                    href="/applications"
                                    className="group inline-flex min-h-12 items-center justify-center rounded-xl bg-[#f1e6dc] px-6 text-sm font-semibold text-olive-deep shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-olive-deep"
                                >
                                    View application tracker
                                    <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">
                                        →
                                    </span>
                                </Link>

                                <Link
                                    href={`/benefits/${id}`}
                                    className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 bg-white/10 px-6 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
                                >
                                    Back to benefit
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-cream text-foreground">
            {/* Navigation */}
            <nav className="sticky top-0 z-20 border-b border-border bg-cream/90 backdrop-blur-md">
                <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
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
                        Application
                    </span>
                </div>
            </nav>

            <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-12">
                {/* Back */}
                <Link
                    href={`/benefits/${id}/documents`}
                    className="group inline-flex min-h-10 items-center rounded-lg text-sm font-semibold text-olive transition-colors duration-200 hover:text-terracotta focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
                >
                    <span className="mr-2 transition-transform duration-200 group-hover:-translate-x-1">
                        ←
                    </span>
                    Back to documents
                </Link>

                {/* Header */}
                <header className="mt-7">
                    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-terracotta">
                        Application preparation
                    </p>

                    <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.03em] text-olive-deep sm:text-5xl">
                        Prepare your application
                    </h1>

                    <p className="mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg">
                        Review your information and complete the remaining details
                        before submitting your application.
                    </p>
                </header>

                {/* Application identity */}
                <section className="mt-8 rounded-[2rem] bg-olive-deep p-6 text-white shadow-[0_20px_60px_rgba(38,58,46,0.12)] sm:p-8">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#d8b09f]">
                                Applying for
                            </p>

                            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                                Engineering Student Scholarship
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-[#d5ded7]">
                                Annual financial support for eligible students.
                            </p>
                        </div>

                        <span className="w-fit rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/90">
                            Prototype application
                        </span>
                    </div>
                </section>

                {/* Progress */}
                <section
                    aria-labelledby="progress-heading"
                    className="mt-8 rounded-[2rem] border border-border bg-surface p-6 shadow-[0_18px_55px_rgba(38,58,46,0.06)] sm:p-8"
                >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-terracotta">
                                Application progress
                            </p>

                            <h2
                                id="progress-heading"
                                className="mt-2 text-2xl font-semibold tracking-tight text-olive-deep"
                            >
                                Review before submitting
                            </h2>
                        </div>

                        <span className="text-sm font-medium text-muted">
                            2 of 3 ready
                        </span>
                    </div>

                    <div className="mt-6 h-2 overflow-hidden rounded-full bg-[#e7e8df]">
                        <div className="h-full w-2/3 rounded-full bg-olive transition-all duration-500" />
                    </div>

                    <div className="mt-7 grid gap-4 md:grid-cols-3">
                        {applicationSections.map((section) => (
                            <div
                                key={section.number}
                                className="group rounded-2xl border border-border bg-cream p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#c8cbbf] hover:shadow-[0_12px_30px_rgba(38,58,46,0.07)]"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sand text-xs font-bold text-terracotta">
                                        {section.number}
                                    </div>

                                    <span
                                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${section.status === "Ready"
                                                ? "bg-[#edf3e8] text-olive"
                                                : "bg-[#f5eee7] text-terracotta"
                                            }`}
                                    >
                                        {section.status}
                                    </span>
                                </div>

                                <h3 className="mt-5 font-semibold text-olive-deep">
                                    {section.title}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-muted">
                                    {section.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <section
                        aria-labelledby="details-heading"
                        className="mt-6 rounded-[2rem] border border-border bg-surface p-6 shadow-[0_18px_55px_rgba(38,58,46,0.06)] sm:p-8"
                    >
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-terracotta">
                                Final details
                            </p>

                            <h2
                                id="details-heading"
                                className="mt-2 text-2xl font-semibold tracking-tight text-olive-deep sm:text-3xl"
                            >
                                Tell us a little more
                            </h2>

                            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                                These fields are demonstration fields for the prototype.
                                The backend will provide the actual application questions.
                            </p>
                        </div>

                        <div className="mt-7 grid gap-6 sm:grid-cols-2">
                            <label className="block">
                                <span className="text-sm font-semibold text-olive-deep">
                                    College / institution
                                </span>

                                <span className="mt-1 block text-xs text-muted-light">
                                    Name of your current institution
                                </span>

                                <input
                                    name="institution"
                                    type="text"
                                    placeholder="Example University"
                                    required
                                    className="mt-3 min-h-12 w-full rounded-xl border border-border bg-white px-4 text-base text-foreground outline-none transition-all duration-200 placeholder:text-muted-light focus:border-olive focus:ring-2 focus:ring-[#dfe6d7]"
                                />
                            </label>

                            <label className="block">
                                <span className="text-sm font-semibold text-olive-deep">
                                    Course / programme
                                </span>

                                <span className="mt-1 block text-xs text-muted-light">
                                    Your current programme of study
                                </span>

                                <input
                                    name="course"
                                    type="text"
                                    placeholder="Engineering"
                                    required
                                    className="mt-3 min-h-12 w-full rounded-xl border border-border bg-white px-4 text-base text-foreground outline-none transition-all duration-200 placeholder:text-muted-light focus:border-olive focus:ring-2 focus:ring-[#dfe6d7]"
                                />
                            </label>

                            <label className="block sm:col-span-2">
                                <span className="text-sm font-semibold text-olive-deep">
                                    Why are you applying?
                                </span>

                                <span className="mt-1 block text-xs text-muted-light">
                                    Briefly describe your reason for applying
                                </span>

                                <textarea
                                    name="reason"
                                    rows={5}
                                    placeholder="Tell us briefly about your application..."
                                    required
                                    className="mt-3 w-full resize-none rounded-xl border border-border bg-white px-4 py-3 text-base text-foreground outline-none transition-all duration-200 placeholder:text-muted-light focus:border-olive focus:ring-2 focus:ring-[#dfe6d7]"
                                />
                            </label>
                        </div>

                        {/* Review notice */}
                        <div className="mt-7 rounded-2xl border border-[#d8d0bd] bg-sand p-4">
                            <div className="flex gap-3">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#efe4d8] text-sm font-semibold text-terracotta">
                                    i
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-olive-deep">
                                        Review before submitting
                                    </p>

                                    <p className="mt-1 text-sm leading-6 text-muted">
                                        Make sure your information and documents are
                                        accurate. Submitting an application does not
                                        guarantee approval.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-7 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                            <Link
                                href={`/benefits/${id}/documents`}
                                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-border bg-white px-5 text-sm font-semibold text-olive-deep transition-all duration-200 hover:-translate-y-0.5 hover:bg-sand focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
                            >
                                ← Review documents
                            </Link>

                            <button
                                type="submit"
                                className="group inline-flex min-h-12 items-center justify-center rounded-xl bg-olive-deep px-6 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-olive focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
                            >
                                Review &amp; submit
                                <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">
                                    →
                                </span>
                            </button>
                        </div>
                    </section>
                </form>

                {/* Prototype notice */}
                <div
                    role="note"
                    className="mt-6 rounded-2xl border border-border bg-surface/70 p-4 text-sm leading-6 text-muted"
                >
                    <strong className="font-semibold text-olive-deep">
                        Hackathon prototype:
                    </strong>{" "}
                    Application fields and submission are currently simulated.
                    The final application will be connected to the backend
                    application service.
                </div>
            </div>
        </main>
    );
}