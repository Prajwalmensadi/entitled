"use client";

import Link from "next/link";

const timeline = [
    {
        title: "Application submitted",
        description: "Your application has been successfully submitted.",
        date: "28 Aug 2026",
        status: "completed",
    },
    {
        title: "Application received",
        description: "The application has been received for processing.",
        date: "Pending backend update",
        status: "current",
    },
    {
        title: "Under review",
        description:
            "The application will be checked against the scheme requirements.",
        date: "Not started",
        status: "upcoming",
    },
    {
        title: "Decision",
        description: "You will see the final application decision here.",
        date: "Not started",
        status: "upcoming",
    },
];

export default function ApplicationTrackerPage() {
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
                        Application tracker
                    </span>
                </div>
            </nav>

            <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8 sm:py-12">
                {/* Back */}
                <Link
                    href="/benefits"
                    className="group inline-flex min-h-10 items-center rounded-lg text-sm font-semibold text-olive transition-colors duration-200 hover:text-terracotta focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
                >
                    <span className="mr-2 transition-transform duration-200 group-hover:-translate-x-1">
                        ←
                    </span>
                    Back to benefits
                </Link>

                {/* Hero */}
                <header className="relative mt-7 overflow-hidden rounded-[2rem] bg-olive-deep px-6 py-8 text-white shadow-[0_24px_70px_rgba(38,58,46,0.15)] sm:px-9 sm:py-10">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-terracotta/20 blur-3xl"
                    />

                    <div className="relative max-w-3xl">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-lg text-[#e5c4b5] ring-1 ring-white/10">
                            ✓
                        </div>

                        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-[#d8b09f]">
                            Application tracking
                        </p>

                        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
                            Track your application
                        </h1>

                        <p className="mt-4 max-w-2xl leading-7 text-[#e4ebe4] sm:text-lg">
                            See the current status of your application and what happens
                            next.
                        </p>
                    </div>
                </header>

                {/* Application summary */}
                <section className="mt-6 rounded-[2rem] border border-border bg-surface p-6 shadow-[0_18px_55px_rgba(38,58,46,0.07)] sm:p-8">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-light">
                                Application
                            </p>

                            <h2 className="mt-2 text-xl font-semibold text-olive-deep sm:text-2xl">
                                Engineering Student Scholarship
                            </h2>

                            <p className="mt-2 text-sm text-muted">
                                Application ID: EDU-2026-004271
                            </p>
                        </div>

                        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#edf3e8] px-4 py-2 text-sm font-semibold text-olive">
                            <span
                                aria-hidden="true"
                                className="h-2 w-2 rounded-full bg-olive"
                            />
                            Application received
                        </span>
                    </div>

                    <div className="mt-7 rounded-2xl border border-[#d7dfcc] bg-[#f1f5eb] p-5">
                        <p className="text-sm font-semibold text-olive-deep">
                            Your application is in progress
                        </p>

                        <p className="mt-1 text-sm leading-6 text-muted">
                            Your application has been submitted successfully. Further
                            status updates will appear here.
                        </p>
                    </div>
                </section>

                {/* Timeline */}
                <section className="mt-6 rounded-[2rem] border border-border bg-surface p-6 shadow-[0_18px_55px_rgba(38,58,46,0.07)] sm:p-8">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-terracotta">
                            Progress
                        </p>

                        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-olive-deep sm:text-3xl">
                            Application progress
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-muted">
                            Follow the progress of your application from submission to
                            decision.
                        </p>
                    </div>

                    <ol className="mt-8">
                        {timeline.map((item, index) => {
                            const completed = item.status === "completed";
                            const current = item.status === "current";

                            return (
                                <li
                                    key={item.title}
                                    className="relative flex gap-5"
                                >
                                    {/* Connecting line */}
                                    {index < timeline.length - 1 && (
                                        <div
                                            aria-hidden="true"
                                            className={`absolute left-[19px] top-11 h-[calc(100%-12px)] w-0.5 ${completed
                                                    ? "bg-olive/50"
                                                    : "bg-border"
                                                }`}
                                        />
                                    )}

                                    {/* Timeline indicator */}
                                    <div
                                        className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 ${completed
                                                ? "bg-olive-deep text-white shadow-sm"
                                                : current
                                                    ? "border-2 border-olive bg-surface text-olive shadow-[0_0_0_5px_rgba(88,107,82,0.08)]"
                                                    : "border border-border bg-cream text-muted-light"
                                            }`}
                                    >
                                        {completed ? "✓" : index + 1}
                                    </div>

                                    {/* Timeline content */}
                                    <div className="pb-10">
                                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                                            <h3
                                                className={`font-semibold ${current
                                                        ? "text-olive-deep"
                                                        : completed
                                                            ? "text-olive"
                                                            : "text-muted"
                                                    }`}
                                            >
                                                {item.title}
                                            </h3>

                                            {current && (
                                                <span className="w-fit rounded-full bg-sand px-2.5 py-1 text-xs font-semibold text-terracotta">
                                                    Current
                                                </span>
                                            )}
                                        </div>

                                        <p className="mt-1 max-w-xl text-sm leading-6 text-muted">
                                            {item.description}
                                        </p>

                                        <p className="mt-2 text-xs font-medium text-muted-light">
                                            {item.date}
                                        </p>
                                    </div>
                                </li>
                            );
                        })}
                    </ol>
                </section>

                {/* Help */}
                <section className="mt-6 rounded-[2rem] border border-border bg-surface p-6 shadow-[0_18px_55px_rgba(38,58,46,0.06)] sm:p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.12em] text-terracotta">
                        Application support
                    </p>

                    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-olive-deep">
                        Need help?
                    </h2>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                        Keep your application ID available if you need to refer to this
                        application later.
                    </p>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                        {/* Go back to the application */}
                        <Link
                            href="/benefits/demo-engineering-scholarship/application"
                            className="group inline-flex min-h-11 items-center justify-center rounded-xl border border-border bg-surface px-5 text-sm font-semibold text-olive-deep transition-all duration-200 hover:-translate-y-0.5 hover:bg-sand focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
                        >
                            View application
                            <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">
                                →
                            </span>
                        </Link>

                        <Link
                            href="/benefits"
                            className="group inline-flex min-h-11 items-center justify-center rounded-xl bg-olive-deep px-5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-olive hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
                        >
                            Explore more benefits
                            <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">
                                →
                            </span>
                        </Link>
                    </div>
                </section>

                {/* Prototype note */}
                <div
                    role="note"
                    className="mt-6 rounded-2xl border border-[#d8d0bd] bg-sand p-4 text-sm leading-6 text-olive-deep"
                >
                    <strong className="font-semibold">
                        Prototype data:
                    </strong>{" "}
                    Application status shown here is demo data. The final status
                    will come from the backend application/tracking service.
                </div>
            </div>
        </main>
    );
}