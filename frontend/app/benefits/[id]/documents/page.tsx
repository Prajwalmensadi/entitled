import Link from "next/link";

const documents = [
    {
        name: "College ID",
        description: "Proof of your current student status.",
        ready: true,
    },
    {
        name: "Marks card",
        description: "Your most recent academic marks document.", 
        ready: true,
    },
    {
        name: "Bank details",
        description: "Bank account information required for the application.",
        ready: true,
    },
    {
        name: "Income certificate",
        description: "Proof of family income, if required for this benefit.",
        ready: false,
    },
];

export default function DocumentsPage() {
    const readyCount = documents.filter((document) => document.ready).length;
    const progress = Math.round((readyCount / documents.length) * 100);

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
                        Documents
                    </span>
                </div>
            </nav>

            <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-12">
                {/* Back */}
                <Link
                    href="/benefits/demo-engineering-scholarship/eligibility"
                    className="group inline-flex min-h-10 items-center rounded-lg text-sm font-semibold text-olive transition-colors duration-200 hover:text-terracotta focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
                >
                    <span className="mr-2 transition-transform duration-200 group-hover:-translate-x-1">
                        ←
                    </span>
                    Back to eligibility
                </Link>

                {/* Hero */}
                <header className="relative mt-7 overflow-hidden rounded-[2rem] bg-olive-deep px-6 py-8 text-white shadow-[0_24px_70px_rgba(38,58,46,0.15)] sm:px-9 sm:py-10">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-terracotta/20 blur-3xl"
                    />

                    <div className="relative max-w-3xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#d8b09f]">
                            Application readiness
                        </p>

                        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
                            Check your documents
                        </h1>

                        <p className="mt-4 max-w-2xl text-base leading-7 text-[#e4ebe4] sm:text-lg">
                            See what you already have and what may still be needed before
                            you start the application.
                        </p>
                    </div>
                </header>

                {/* Progress */}
                <section
                    aria-labelledby="progress-heading"
                    className="mt-6 rounded-[2rem] border border-border bg-surface p-6 shadow-[0_18px_55px_rgba(38,58,46,0.07)] sm:p-7"
                >
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-terracotta">
                                Your progress
                            </p>

                            <h2
                                id="progress-heading"
                                className="mt-2 text-2xl font-semibold tracking-tight text-olive-deep"
                            >
                                {readyCount} of {documents.length} documents ready
                            </h2>

                            <p className="mt-1 text-sm leading-6 text-muted">
                                You can continue once you have the information needed for the
                                application.
                            </p>
                        </div>

                        <div className="shrink-0 text-left sm:text-right">
                            <p className="text-3xl font-semibold tracking-tight text-olive-deep">
                                {progress}%
                            </p>

                            <p className="text-xs font-medium text-muted-light">
                                ready
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 h-2 overflow-hidden rounded-full bg-[#ebe7de]">
                        <div
                            className="h-full rounded-full bg-olive transition-all duration-700 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </section>

                {/* Document checklist */}
                <section
                    aria-labelledby="documents-heading"
                    className="mt-6 rounded-[2rem] border border-border bg-surface p-6 shadow-[0_18px_55px_rgba(38,58,46,0.07)] sm:p-8"
                >
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-terracotta">
                            Checklist
                        </p>

                        <h2
                            id="documents-heading"
                            className="mt-2 text-2xl font-semibold tracking-tight text-olive-deep sm:text-3xl"
                        >
                            Your document checklist
                        </h2>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                            These are shown as prototype document states. The final
                            requirements will come from the benefit service.
                        </p>
                    </div>

                    <div className="mt-7 divide-y divide-border">
                        {documents.map((document) => (
                            <div
                                key={document.name}
                                className="group flex flex-col gap-4 py-6 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                            >
                                <div className="flex items-start gap-4">
                                    <div
                                        aria-hidden="true"
                                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-sm font-semibold transition-all duration-200 group-hover:scale-105 ${document.ready
                                                ? "bg-[#edf3e8] text-olive"
                                                : "bg-sand text-terracotta"
                                            }`}
                                    >
                                        {document.ready ? "✓" : "!"}
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-olive-deep">
                                            {document.name}
                                        </h3>

                                        <p className="mt-1 max-w-xl text-sm leading-6 text-muted">
                                            {document.description}
                                        </p>
                                    </div>
                                </div>

                                <span
                                    className={`self-start rounded-full px-3 py-1.5 text-xs font-semibold transition-colors duration-200 sm:self-auto ${document.ready
                                            ? "bg-[#edf3e8] text-olive"
                                            : "bg-sand text-terracotta"
                                        }`}
                                >
                                    {document.ready ? "Ready" : "Still needed"}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Next step */}
                <section className="relative mt-6 overflow-hidden rounded-[2rem] bg-surface p-6 shadow-[0_18px_55px_rgba(38,58,46,0.07)] ring-1 ring-border sm:p-8">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-terracotta/10 blur-3xl"
                    />

                    <div className="relative max-w-2xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-terracotta">
                            Next step
                        </p>

                        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-olive-deep sm:text-3xl">
                            Prepare your application
                        </h2>

                        <p className="mt-3 leading-7 text-muted">
                            Once your documents are ready, you can complete the guided
                            application step by step.
                        </p>

                        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href="/benefits/demo-engineering-scholarship/application"
                                className="group inline-flex min-h-12 items-center justify-center rounded-xl bg-olive-deep px-6 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-olive hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
                            >
                                Prepare application
                                <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">
                                    →
                                </span>
                            </Link>

                            <Link
                                href="/benefits/demo-engineering-scholarship/eligibility"
                                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border bg-surface px-6 text-sm font-semibold text-olive-deep transition-all duration-200 hover:-translate-y-0.5 hover:bg-sand focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
                            >
                                Back to eligibility
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Prototype footer */}
                <p className="mt-8 text-xs leading-5 text-muted-light">
                    Hackathon prototype — document availability and requirements shown
                    here are synthetic demo data.
                </p>
            </div>
        </main>
    );
}