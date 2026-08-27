"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

const steps = ["Personal", "Education", "Eligibility", "Documents", "Review"];

export default function ApplicationPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (currentStep < steps.length - 1) {
            setCurrentStep((step) => step + 1);
            return;
        }

        setSubmitted(true);
    }

    if (submitted) {
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
                            Hackathon prototype
                        </span>
                    </div>
                </nav>

                <div className="mx-auto max-w-2xl px-5 py-12 sm:px-8 sm:py-20">
                    <div className="rounded-3xl border border-[#dfe5df] bg-white p-6 text-center shadow-[0_16px_50px_rgba(23,59,43,0.06)] sm:p-10">
                        <div
                            aria-hidden="true"
                            className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#eaf4ed] text-xl font-bold text-[#246044]"
                        >
                            ✓
                        </div>

                        <p className="mt-6 text-sm font-medium text-[#66716a]">
                            Application submitted
                        </p>

                        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
                            Your application is recorded
                        </h1>

                        <div className="mt-6 rounded-2xl bg-[#f7f8f5] p-5">
                            <p className="text-xs font-medium uppercase tracking-wide text-[#66716a]">
                                Demo application ID
                            </p>

                            <p className="mt-2 text-xl font-semibold tracking-wide text-[#173b2b]">
                                EDU-2026-004271
                            </p>
                        </div>

                        <div
                            role="note"
                            className="mt-6 rounded-2xl border border-[#e4dfc8] bg-[#faf8ec] p-4 text-left text-sm leading-6 text-[#625c3e]"
                        >
                            <strong className="font-semibold">Hackathon prototype:</strong>{" "}
                            Government submission is simulated in this demonstration. This
                            does not represent a real submission to a government department.
                        </div>

                        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
                            <Link
                                href="/applications/demo-application"
                                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#173b2b] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#24553d] focus:outline-none focus:ring-2 focus:ring-[#173b2b] focus:ring-offset-2"
                            >
                                Track application
                            </Link>

                            <Link
                                href="/benefits"
                                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#ccd5ce] bg-white px-6 text-sm font-semibold text-[#173b2b] transition hover:bg-[#f4f6f3] focus:outline-none focus:ring-2 focus:ring-[#2f7652] focus:ring-offset-2"
                            >
                                Back to benefits
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

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
                        Hackathon prototype
                    </span>
                </div>
            </nav>

            <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8 sm:py-12">
                <Link
                    href="/benefits/demo-engineering-scholarship/documents"
                    className="inline-flex min-h-10 items-center rounded-lg text-sm font-medium text-[#2f7652] underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-[#2f7652] focus:ring-offset-2"
                >
                    ← Back to documents
                </Link>

                <header className="mt-8">
                    <p className="text-sm font-medium text-[#66716a]">
                        Application
                    </p>

                    <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                        Prepare your application
                    </h1>

                    <p className="mt-3 max-w-2xl leading-7 text-[#68736c]">
                        Complete each section step by step. You can review everything
                        before the application is submitted.
                    </p>
                </header>

                <nav
                    aria-label="Application progress"
                    className="mt-8 rounded-3xl border border-[#dfe5df] bg-white p-4 shadow-[0_12px_40px_rgba(23,59,43,0.05)] sm:p-5"
                >
                    <ol className="grid grid-cols-5 gap-1 sm:gap-3">
                        {steps.map((step, index) => {
                            const isComplete = index < currentStep;
                            const isCurrent = index === currentStep;

                            return (
                                <li key={step} className="min-w-0">
                                    <div
                                        className={`flex min-h-16 flex-col items-center justify-center rounded-xl px-1 text-center sm:px-3 ${isCurrent
                                                ? "bg-[#173b2b] text-white"
                                                : isComplete
                                                    ? "bg-[#eaf4ed] text-[#246044]"
                                                    : "bg-[#f3f5f3] text-[#7a837d]"
                                            }`}
                                        aria-current={isCurrent ? "step" : undefined}
                                    >
                                        <span className="text-xs font-semibold sm:text-sm">
                                            {isComplete ? "✓" : index + 1}
                                        </span>

                                        <span className="mt-1 text-[10px] font-medium leading-tight sm:text-xs">
                                            {step}
                                        </span>
                                    </div>
                                </li>
                            );
                        })}
                    </ol>
                </nav>

                <form
                    onSubmit={handleSubmit}
                    className="mt-6 rounded-3xl border border-[#dfe5df] bg-white p-5 shadow-[0_16px_50px_rgba(23,59,43,0.06)] sm:p-8"
                >
                    {currentStep === 0 && (
                        <section aria-labelledby="personal-heading">
                            <p className="text-sm font-medium text-[#66716a]">
                                Step 1
                            </p>

                            <h2
                                id="personal-heading"
                                className="mt-2 text-2xl font-semibold tracking-tight"
                            >
                                Personal information
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-[#68736c]">
                                Confirm the basic information needed for your application.
                            </p>

                            <div className="mt-7 grid gap-6 sm:grid-cols-2">
                                <label className="block">
                                    <span className="text-sm font-semibold">Full name</span>
                                    <span className="mt-1 block text-xs text-[#7a837d]">
                                        Enter your name as you want it shown on the application.
                                    </span>
                                    <input
                                        name="full_name"
                                        type="text"
                                        placeholder="Your full name"
                                        required
                                        className="mt-3 min-h-12 w-full rounded-xl border border-[#ccd5ce] bg-white px-4 text-base outline-none transition placeholder:text-[#a0a8a2] focus:border-[#2f7652] focus:ring-2 focus:ring-[#dcebe1]"
                                    />
                                </label>

                                <label className="block">
                                    <span className="text-sm font-semibold">Date of birth</span>
                                    <span className="mt-1 block text-xs text-[#7a837d]">
                                        Use the date shown on your supporting documents.
                                    </span>
                                    <input
                                        name="date_of_birth"
                                        type="date"
                                        required
                                        className="mt-3 min-h-12 w-full rounded-xl border border-[#ccd5ce] bg-white px-4 text-base outline-none transition focus:border-[#2f7652] focus:ring-2 focus:ring-[#dcebe1]"
                                    />
                                </label>
                            </div>
                        </section>
                    )}

                    {currentStep === 1 && (
                        <section aria-labelledby="education-heading">
                            <p className="text-sm font-medium text-[#66716a]">
                                Step 2
                            </p>

                            <h2
                                id="education-heading"
                                className="mt-2 text-2xl font-semibold tracking-tight"
                            >
                                Education
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-[#68736c]">
                                Confirm the education information associated with this
                                application.
                            </p>

                            <div className="mt-7 grid gap-6 sm:grid-cols-2">
                                <label className="block">
                                    <span className="text-sm font-semibold">
                                        Institution name
                                    </span>
                                    <span className="mt-1 block text-xs text-[#7a837d]">
                                        Your current college or institution.
                                    </span>
                                    <input
                                        name="institution"
                                        type="text"
                                        placeholder="Your college name"
                                        required
                                        className="mt-3 min-h-12 w-full rounded-xl border border-[#ccd5ce] bg-white px-4 text-base outline-none transition placeholder:text-[#a0a8a2] focus:border-[#2f7652] focus:ring-2 focus:ring-[#dcebe1]"
                                    />
                                </label>

                                <label className="block">
                                    <span className="text-sm font-semibold">Year of study</span>
                                    <span className="mt-1 block text-xs text-[#7a837d]">
                                        Your current year or level.
                                    </span>
                                    <select
                                        name="study_year"
                                        defaultValue=""
                                        required
                                        className="mt-3 min-h-12 w-full rounded-xl border border-[#ccd5ce] bg-white px-4 text-base outline-none transition focus:border-[#2f7652] focus:ring-2 focus:ring-[#dcebe1]"
                                    >
                                        <option value="" disabled>
                                            Select your year
                                        </option>
                                        <option value="1">First year</option>
                                        <option value="2">Second year</option>
                                        <option value="3">Third year</option>
                                        <option value="4">Fourth year</option>
                                        <option value="other">Other</option>
                                    </select>
                                </label>
                            </div>
                        </section>
                    )}

                    {currentStep === 2 && (
                        <section aria-labelledby="eligibility-heading">
                            <p className="text-sm font-medium text-[#66716a]">
                                Step 3
                            </p>

                            <h2
                                id="eligibility-heading"
                                className="mt-2 text-2xl font-semibold tracking-tight"
                            >
                                Eligibility information
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-[#68736c]">
                                This section summarises information already provided during
                                your profile and eligibility journey.
                            </p>

                            <div className="mt-7 rounded-2xl border border-[#dfe5df] bg-[#f7f8f5] p-5">
                                <dl className="grid gap-5 sm:grid-cols-2">
                                    <div>
                                        <dt className="text-xs font-medium uppercase tracking-wide text-[#7a837d]">
                                            Age
                                        </dt>
                                        <dd className="mt-1 font-semibold">19</dd>
                                    </div>

                                    <div>
                                        <dt className="text-xs font-medium uppercase tracking-wide text-[#7a837d]">
                                            State
                                        </dt>
                                        <dd className="mt-1 font-semibold">Karnataka</dd>
                                    </div>

                                    <div>
                                        <dt className="text-xs font-medium uppercase tracking-wide text-[#7a837d]">
                                            Education
                                        </dt>
                                        <dd className="mt-1 font-semibold">Undergraduate</dd>
                                    </div>

                                    <div>
                                        <dt className="text-xs font-medium uppercase tracking-wide text-[#7a837d]">
                                            Course
                                        </dt>
                                        <dd className="mt-1 font-semibold">Engineering</dd>
                                    </div>
                                </dl>
                            </div>

                            <p className="mt-4 text-xs leading-5 text-[#7a837d]">
                                These are prototype values. The integrated application will
                                use the confirmed profile and eligibility information returned
                                by the backend.
                            </p>
                        </section>
                    )}

                    {currentStep === 3 && (
                        <section aria-labelledby="documents-heading">
                            <p className="text-sm font-medium text-[#66716a]">
                                Step 4
                            </p>

                            <h2
                                id="documents-heading"
                                className="mt-2 text-2xl font-semibold tracking-tight"
                            >
                                Documents
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-[#68736c]">
                                Confirm that you have the documents needed for this
                                application.
                            </p>

                            <div className="mt-7 space-y-3">
                                {["College ID", "Marks card", "Bank details"].map(
                                    (document) => (
                                        <label
                                            key={document}
                                            className="flex cursor-pointer items-center gap-4 rounded-2xl border border-[#dfe5df] p-4 transition hover:bg-[#f7f8f5]"
                                        >
                                            <input
                                                type="checkbox"
                                                name="documents"
                                                value={document}
                                                required
                                                className="h-5 w-5 rounded border-[#aeb9b1] text-[#173b2b] accent-[#173b2b] focus:ring-2 focus:ring-[#2f7652]"
                                            />

                                            <span className="text-sm font-medium">{document}</span>
                                        </label>
                                    ),
                                )}
                            </div>
                        </section>
                    )}

                    {currentStep === 4 && (
                        <section aria-labelledby="review-heading">
                            <p className="text-sm font-medium text-[#66716a]">
                                Step 5
                            </p>

                            <h2
                                id="review-heading"
                                className="mt-2 text-2xl font-semibold tracking-tight"
                            >
                                Review application
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-[#68736c]">
                                This is your final review before the simulated submission.
                            </p>

                            <div className="mt-7 divide-y divide-[#e7ebe7] rounded-2xl border border-[#dfe5df]">
                                {[
                                    ["Personal information", "Complete"],
                                    ["Education", "Complete"],
                                    ["Eligibility", "Complete"],
                                    ["Documents", "Complete"],
                                ].map(([label, value]) => (
                                    <div
                                        key={label}
                                        className="flex items-center justify-between gap-4 p-4"
                                    >
                                        <span className="text-sm font-medium">{label}</span>

                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eaf4ed] px-3 py-1 text-xs font-semibold text-[#246044]">
                                            <span aria-hidden="true">✓</span>
                                            {value}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div
                                role="note"
                                className="mt-6 rounded-2xl border border-[#e4dfc8] bg-[#faf8ec] p-4 text-sm leading-6 text-[#625c3e]"
                            >
                                <strong className="font-semibold">Before you submit:</strong>{" "}
                                This is a hackathon prototype. Government submission is
                                simulated.
                            </div>
                        </section>
                    )}

                    <div className="mt-8 flex flex-col-reverse gap-3 border-t border-[#e7ebe7] pt-6 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            {currentStep > 0 ? (
                                <button
                                    type="button"
                                    onClick={() => setCurrentStep((step) => step - 1)}
                                    className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#ccd5ce] bg-white px-5 text-sm font-semibold text-[#173b2b] transition hover:bg-[#f4f6f3] focus:outline-none focus:ring-2 focus:ring-[#2f7652] focus:ring-offset-2"
                                >
                                    Back
                                </button>
                            ) : (
                                <Link
                                    href="/benefits/demo-engineering-scholarship/documents"
                                    className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#ccd5ce] bg-white px-5 text-sm font-semibold text-[#173b2b] transition hover:bg-[#f4f6f3] focus:outline-none focus:ring-2 focus:ring-[#2f7652] focus:ring-offset-2"
                                >
                                    Back
                                </Link>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#173b2b] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#24553d] focus:outline-none focus:ring-2 focus:ring-[#173b2b] focus:ring-offset-2"
                        >
                            {currentStep === steps.length - 1
                                ? "Submit application"
                                : "Continue"}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
