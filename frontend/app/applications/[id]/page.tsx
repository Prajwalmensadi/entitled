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
        description: "The application will be checked against the scheme requirements.",
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
        <main className="min-h-screen bg-[#f7f8f5] text-[#17201a]">
            <nav className="border-b border-[#e1e6e1] bg-white">
                <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
                    <Link
                        href="/"
                        className="flex items-center gap-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2f7652] focus:ring-offset-2"
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#173b2b] text-sm font-bold text-white">
                            E
                        </div>

                        <span className="font-semibold">Entitled</span>
                    </Link>

                    <span className="text-sm text-[#66716a]">
                        Application tracker
                    </span>
                </div>
            </nav>

            <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8 sm:py-12">
                <Link
                    href="/benefits"
                    className="inline-flex min-h-10 items-center rounded-lg text-sm font-medium text-[#2f7652] underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-[#2f7652] focus:ring-offset-2"
                >
                    ← Back to benefits
                </Link>

                <header className="mt-8">
                    <p className="text-sm font-medium text-[#66716a]">
                        Application tracking
                    </p>

                    <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                        Track your application
                    </h1>

                    <p className="mt-3 max-w-2xl leading-7 text-[#68736c]">
                        See the current status of your application and what happens next.
                    </p>
                </header>

                <section className="mt-8 rounded-3xl border border-[#dfe5df] bg-white p-6 shadow-[0_16px_50px_rgba(23,59,43,0.06)] sm:p-8">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-[#7a837d]">
                                Application
                            </p>

                            <h2 className="mt-2 text-xl font-semibold">
                                Engineering Student Scholarship
                            </h2>

                            <p className="mt-2 text-sm text-[#68736c]">
                                Application ID: EDU-2026-004271
                            </p>
                        </div>

                        <span className="inline-flex w-fit items-center rounded-full bg-[#eaf4ed] px-4 py-2 text-sm font-semibold text-[#246044]">
                            Application received
                        </span>
                    </div>

                    <div className="mt-7 rounded-2xl border border-[#d6e4da] bg-[#f0f7f2] p-4">
                        <p className="text-sm font-semibold text-[#24553d]">
                            Your application is in progress
                        </p>

                        <p className="mt-1 text-sm leading-6 text-[#4e6658]">
                            Your application has been submitted successfully. Further
                            status updates will appear here.
                        </p>
                    </div>
                </section>

                <section className="mt-6 rounded-3xl border border-[#dfe5df] bg-white p-6 shadow-[0_16px_50px_rgba(23,59,43,0.06)] sm:p-8">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        Application progress
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-[#68736c]">
                        Follow the progress of your application from submission to
                        decision.
                    </p>

                    <ol className="mt-8">
                        {timeline.map((item, index) => {
                            const completed = item.status === "completed";
                            const current = item.status === "current";

                            return (
                                <li key={item.title} className="relative flex gap-5">
                                    {index < timeline.length - 1 && (
                                        <div
                                            aria-hidden="true"
                                            className={`absolute left-[15px] top-9 h-[calc(100%-8px)] w-px ${completed
                                                    ? "bg-[#8bb49a]"
                                                    : "bg-[#dfe5df]"
                                                }`}
                                        />
                                    )}

                                    <div
                                        className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${completed
                                                ? "bg-[#173b2b] text-white"
                                                : current
                                                    ? "border-2 border-[#2f7652] bg-white text-[#246044]"
                                                    : "bg-[#eef1ee] text-[#7a837d]"
                                            }`}
                                    >
                                        {completed ? "✓" : index + 1}
                                    </div>

                                    <div className="pb-9">
                                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                                            <h3
                                                className={`font-semibold ${current ? "text-[#173b2b]" : ""
                                                    }`}
                                            >
                                                {item.title}
                                            </h3>

                                            {current && (
                                                <span className="w-fit rounded-full bg-[#eaf4ed] px-2.5 py-1 text-xs font-semibold text-[#246044]">
                                                    Current
                                                </span>
                                            )}
                                        </div>

                                        <p className="mt-1 text-sm leading-6 text-[#68736c]">
                                            {item.description}
                                        </p>

                                        <p className="mt-2 text-xs text-[#7a837d]">
                                            {item.date}
                                        </p>
                                    </div>
                                </li>
                            );
                        })}
                    </ol>
                </section>

                <section className="mt-6 rounded-3xl border border-[#dfe5df] bg-white p-6 shadow-[0_16px_50px_rgba(23,59,43,0.06)] sm:p-8">
                    <h2 className="text-xl font-semibold">Need help?</h2>

                    <p className="mt-2 text-sm leading-6 text-[#68736c]">
                        Keep your application ID available if you need to refer to this
                        application later.
                    </p>

                    <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                        <button
                            type="button"
                            className="min-h-11 rounded-xl border border-[#ccd5ce] bg-white px-5 text-sm font-semibold text-[#173b2b] transition hover:bg-[#f4f6f3] focus:outline-none focus:ring-2 focus:ring-[#2f7652] focus:ring-offset-2"
                        >
                            View application
                        </button>

                        <Link
                            href="/benefits"
                            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#173b2b] px-5 text-sm font-semibold text-white transition hover:bg-[#24553d] focus:outline-none focus:ring-2 focus:ring-[#173b2b] focus:ring-offset-2"
                        >
                            Explore more benefits
                        </Link>
                    </div>
                </section>

                <div
                    role="note"
                    className="mt-6 rounded-2xl border border-[#e4dfc8] bg-[#faf8ec] p-4 text-sm leading-6 text-[#625c3e]"
                >
                    <strong className="font-semibold">Hackathon prototype:</strong>{" "}
                    Application status shown here is demo data. The final status will
                    come from the backend application/tracking service.
                </div>
            </div>
        </main>
    );
}
