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

    return (
        <main className="min-h-screen bg-[#f7f8f5] text-[#17201a]">
            <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-12">
                <Link
                    href="/benefits/demo-engineering-scholarship/eligibility"
                    className="inline-flex min-h-10 items-center rounded-lg text-sm font-medium text-[#2f7652] underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-[#2f7652] focus:ring-offset-2"
                >
                    ← Back to eligibility
                </Link>

                <header className="mt-8 max-w-3xl">
                    <p className="text-sm font-medium text-[#66716a]">
                        Application readiness
                    </p>

                    <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                        Check your documents
                    </h1>

                    <p className="mt-3 max-w-2xl text-base leading-7 text-[#68736c] sm:text-lg">
                        See what you already have and what may still be needed before you
                        start the application.
                    </p>
                </header>

                <div
                    role="status"
                    className="mt-8 rounded-2xl border border-[#d3e3d7] bg-[#f0f7f2] p-5"
                >
                    <p className="text-lg font-semibold text-[#173b2b]">
                        {readyCount} of {documents.length} documents ready
                    </p>

                    <p className="mt-1 text-sm leading-6 text-[#557064]">
                        You can continue once you have the information needed for the
                        application.
                    </p>
                </div>

                <section
                    aria-labelledby="documents-heading"
                    className="mt-8 rounded-3xl border border-[#dfe5df] bg-white p-5 shadow-[0_16px_50px_rgba(23,59,43,0.06)] sm:p-8"
                >
                    <div>
                        <h2
                            id="documents-heading"
                            className="text-2xl font-semibold tracking-tight"
                        >
                            Your document checklist
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-[#68736c]">
                            These are shown as prototype document states. The final
                            requirements will come from the benefit service.
                        </p>
                    </div>

                    <div className="mt-7 divide-y divide-[#e7ebe7]">
                        {documents.map((document) => (
                            <div
                                key={document.name}
                                className="flex flex-col gap-4 py-5 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                            >
                                <div className="flex items-start gap-4">
                                    <div
                                        aria-hidden="true"
                                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${document.ready
                                                ? "bg-[#eaf4ed] text-[#246044]"
                                                : "bg-[#f0f2f0] text-[#68736c]"
                                            }`}
                                    >
                                        {document.ready ? "✓" : "○"}
                                    </div>

                                    <div>
                                        <h3 className="font-semibold">{document.name}</h3>

                                        <p className="mt-1 text-sm leading-6 text-[#68736c]">
                                            {document.description}
                                        </p>
                                    </div>
                                </div>

                                <span
                                    className={`self-start rounded-full px-3 py-1 text-sm font-medium sm:self-auto ${document.ready
                                            ? "bg-[#eaf4ed] text-[#246044]"
                                            : "bg-[#f0f2f0] text-[#66716a]"
                                        }`}
                                >
                                    {document.ready ? "Ready" : "Still needed"}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mt-8 rounded-3xl border border-[#dfe5df] bg-white p-5 sm:p-8">
                    <div className="max-w-2xl">
                        <p className="text-sm font-medium text-[#66716a]">Next step</p>

                        <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                            Prepare your application
                        </h2>

                        <p className="mt-2 leading-7 text-[#68736c]">
                            Once your documents are ready, you can complete the guided
                            application step by step.
                        </p>

                        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href="/benefits/demo-engineering-scholarship/application"
                                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#173b2b] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#24553d] focus:outline-none focus:ring-2 focus:ring-[#173b2b] focus:ring-offset-2"
                            >
                                Prepare application
                            </Link>

                            <Link
                                href="/benefits/demo-engineering-scholarship/eligibility"
                                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#ccd5ce] bg-white px-6 text-sm font-semibold text-[#173b2b] transition hover:bg-[#f4f6f3] focus:outline-none focus:ring-2 focus:ring-[#2f7652] focus:ring-offset-2"
                            >
                                Back to eligibility
                            </Link>
                        </div>
                    </div>
                </section>

                <p className="mt-8 text-xs leading-5 text-[#7a837d]">
                    Hackathon prototype — document availability and requirements shown
                    here are synthetic demo data.
                </p>
            </div>
        </main>
    );
}
