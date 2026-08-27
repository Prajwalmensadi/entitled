import Link from "next/link";

type EligibilityPageProps = {
    params: Promise<{
        id: string;
    }>;
};

const demoRules = [
    {
        requirement: "Age requirement",
        value: "Your profile information",
        status: "met",
    },
    {
        requirement: "Student requirement",
        value: "Your education information",
        status: "met",
    },
    {
        requirement: "Income requirement",
        value: "Your profile information",
        status: "met",
    },
    {
        requirement: "Academic requirement",
        value: "Your academic information",
        status: "met",
    },
];

export default async function EligibilityPage({
    params,
}: EligibilityPageProps) {
    const { id } = await params;

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
                    href={`/benefits/${id}`}
                    className="inline-flex min-h-10 items-center rounded-lg text-sm font-medium text-[#2f7652] underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-[#2f7652] focus:ring-offset-2"
                >
                    ← Back to benefit
                </Link>

                <header className="mt-8">
                    <p className="text-sm font-medium text-[#66716a]">
                        Eligibility check
                    </p>

                    <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                        You appear eligible
                    </h1>

                    <p className="mt-4 max-w-2xl text-base leading-7 text-[#68736c]">
                        This assessment is based on the information provided in your
                        profile. Here&apos;s what matched the benefit requirements.
                    </p>
                </header>

                <div
                    role="note"
                    className="mt-8 rounded-2xl border border-[#d8e4da] bg-[#eef6f0] p-4 text-sm leading-6 text-[#24553d]"
                >
                    <strong className="font-semibold">Prototype preview:</strong>{" "}
                    Eligibility results shown here are demo data. The final result will
                    come from the backend eligibility service.
                </div>

                <section
                    aria-labelledby="evidence-heading"
                    className="mt-8 rounded-3xl border border-[#dfe5df] bg-white p-5 shadow-[0_12px_40px_rgba(23,59,43,0.05)] sm:p-8"
                >
                    <div>
                        <h2
                            id="evidence-heading"
                            className="text-xl font-semibold tracking-tight"
                        >
                            Why you appear eligible
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-[#68736c]">
                            We&apos;ll show the specific information used by the eligibility
                            service here.
                        </p>
                    </div>

                    <div className="mt-6 overflow-hidden rounded-2xl border border-[#e1e6e1]">
                        <div className="hidden grid-cols-[1fr_1fr_auto] gap-4 bg-[#f7f8f5] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[#66716a] sm:grid">
                            <span>Requirement</span>
                            <span>Your information</span>
                            <span>Status</span>
                        </div>

                        <div className="divide-y divide-[#e7ebe7]">
                            {demoRules.map((rule) => (
                                <div
                                    key={rule.requirement}
                                    className="grid gap-3 px-5 py-4 sm:grid-cols-[1fr_1fr_auto] sm:items-center sm:gap-4"
                                >
                                    <div>
                                        <p className="text-sm font-semibold">
                                            {rule.requirement}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-[#68736c]">{rule.value}</p>
                                    </div>

                                    <div>
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eef6f0] px-3 py-1 text-xs font-semibold text-[#24553d]">
                                            <span aria-hidden="true">✓</span>
                                            Met
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section
                    aria-labelledby="next-heading"
                    className="mt-5 rounded-3xl border border-[#dfe5df] bg-white p-5 shadow-[0_12px_40px_rgba(23,59,43,0.05)] sm:p-8"
                >
                    <h2
                        id="next-heading"
                        className="text-xl font-semibold tracking-tight"
                    >
                        What happens next?
                    </h2>

                    <div className="mt-5 space-y-4">
                        <div className="flex gap-4">
                            <div
                                aria-hidden="true"
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#eef4ef] text-sm font-semibold text-[#2f7652]"
                            >
                                1
                            </div>

                            <div>
                                <h3 className="font-semibold">Check your documents</h3>
                                <p className="mt-1 text-sm leading-6 text-[#68736c]">
                                    See what you already have and what may still be needed.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div
                                aria-hidden="true"
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f3f5f3] text-sm font-semibold text-[#66716a]"
                            >
                                2
                            </div>

                            <div>
                                <h3 className="font-semibold">Prepare your application</h3>
                                <p className="mt-1 text-sm leading-6 text-[#68736c]">
                                    Complete the guided application when you&apos;re ready.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                        <Link
                            href={`/benefits/${id}/documents`}
                            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#173b2b] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#24553d] focus:outline-none focus:ring-2 focus:ring-[#173b2b] focus:ring-offset-2"
                        >
                            Check documents
                        </Link>

                        <Link
                            href={`/benefits/${id}`}
                            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#ccd5ce] bg-white px-5 text-sm font-semibold text-[#173b2b] transition hover:bg-[#f7f8f5] focus:outline-none focus:ring-2 focus:ring-[#2f7652] focus:ring-offset-2"
                        >
                            Back to benefit
                        </Link>
                    </div>
                </section>
            </div>
        </main>
    );
}
