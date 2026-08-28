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
                        Eligibility
                    </span>
                </div>
            </nav>

            <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8 sm:py-12">
                {/* Back */}
                <Link
                    href={`/benefits/${id}`}
                    className="group inline-flex min-h-10 items-center rounded-lg text-sm font-semibold text-olive transition-colors duration-200 hover:text-terracotta focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
                >
                    <span className="mr-2 transition-transform duration-200 group-hover:-translate-x-1">
                        ←
                    </span>
                    Back to benefit
                </Link>

                {/* Result hero */}
                <header className="relative mt-7 overflow-hidden rounded-[2rem] bg-olive-deep px-6 py-8 text-white shadow-[0_24px_70px_rgba(38,58,46,0.15)] sm:px-9 sm:py-10">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-terracotta/20 blur-3xl"
                    />

                    <div className="relative">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-xl text-[#e5c4b5] ring-1 ring-white/10">
                            ✓
                        </div>

                        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-[#d8b09f]">
                            Eligibility check
                        </p>

                        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
                            You appear eligible
                        </h1>

                        <p className="mt-4 max-w-2xl leading-7 text-[#e4ebe4] sm:text-lg">
                            This assessment is based on the information provided in your
                            profile. Here&apos;s what matched the benefit requirements.
                        </p>
                    </div>
                </header>

                {/* Prototype notice */}
                <div
                    role="note"
                    className="mt-6 rounded-2xl border border-[#d8d0bd] bg-sand p-4 text-sm leading-6 text-olive-deep"
                >
                    <strong className="font-semibold">Prototype preview:</strong>{" "}
                    Eligibility results shown here are demo data. The final result will
                    come from the backend eligibility service.
                </div>

                {/* Rule results */}
                <section
                    aria-labelledby="evidence-heading"
                    className="mt-8 rounded-[2rem] border border-border bg-surface p-6 shadow-[0_18px_55px_rgba(38,58,46,0.07)] sm:p-8"
                >
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-terracotta">
                            Your assessment
                        </p>

                        <h2
                            id="evidence-heading"
                            className="mt-2 text-2xl font-semibold tracking-tight text-olive-deep sm:text-3xl"
                        >
                            Why you appear eligible
                        </h2>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                            We&apos;ll show the specific information used by the eligibility
                            service here.
                        </p>
                    </div>

                    <div className="mt-7 overflow-hidden rounded-2xl border border-border">
                        {/* Desktop heading */}
                        <div className="hidden grid-cols-[1fr_1fr_auto] gap-4 bg-[#f5f1e9] px-5 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-muted sm:grid">
                            <span>Requirement</span>
                            <span>Your information</span>
                            <span>Status</span>
                        </div>

                        <div className="divide-y divide-border">
                            {demoRules.map((rule, index) => (
                                <div
                                    key={rule.requirement}
                                    className="group grid gap-4 px-5 py-5 transition-colors duration-200 hover:bg-[#fcfaf6] sm:grid-cols-[1fr_1fr_auto] sm:items-center"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eef0e8] text-sm font-semibold text-olive transition-transform duration-200 group-hover:scale-105">
                                            {index + 1}
                                        </span>

                                        <p className="text-sm font-semibold text-olive-deep">
                                            {rule.requirement}
                                        </p>
                                    </div>

                                    <p className="text-sm leading-5 text-muted">
                                        {rule.value}
                                    </p>

                                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#edf3e8] px-3 py-1.5 text-xs font-semibold text-olive">
                                        <span aria-hidden="true">✓</span>
                                        Met
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#d7dfcc] bg-[#f1f5eb] p-4">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-olive text-sm font-semibold text-white">
                            ✓
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-olive-deep">
                                All demo requirements are met
                            </p>

                            <p className="mt-1 text-sm leading-5 text-muted">
                                The backend will provide the actual rule results when
                                eligibility checking is integrated.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Next steps */}
                <section
                    aria-labelledby="next-heading"
                    className="mt-6 rounded-[2rem] border border-border bg-surface p-6 shadow-[0_18px_55px_rgba(38,58,46,0.06)] sm:p-8"
                >
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-terracotta">
                            Your next steps
                        </p>

                        <h2
                            id="next-heading"
                            className="mt-2 text-2xl font-semibold tracking-tight text-olive-deep"
                        >
                            You can continue from here
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-muted">
                            Eligibility checking does not submit an application.
                        </p>
                    </div>

                    <div className="mt-7 grid gap-4 sm:grid-cols-2">
                        {/* Documents */}
                        <div className="group rounded-2xl border border-border bg-cream p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#c8cbbf] hover:shadow-[0_12px_30px_rgba(38,58,46,0.07)]">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sand text-terracotta transition-transform duration-200 group-hover:scale-105">
                                1
                            </div>

                            <h3 className="mt-5 font-semibold text-olive-deep">
                                Check your documents
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-muted">
                                See what you already have and what may still be needed.
                            </p>

                            <Link
                                href={`/benefits/${id}/documents`}
                                className="mt-5 inline-flex items-center text-sm font-semibold text-olive transition-colors duration-200 hover:text-terracotta focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
                            >
                                Check documents
                                <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">
                                    →
                                </span>
                            </Link>
                        </div>

                        {/* Application */}
                        <div className="group rounded-2xl border border-border bg-cream p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#c8cbbf] hover:shadow-[0_12px_30px_rgba(38,58,46,0.07)]">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sand text-terracotta transition-transform duration-200 group-hover:scale-105">
                                2
                            </div>

                            <h3 className="mt-5 font-semibold text-olive-deep">
                                Prepare your application
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-muted">
                                Complete the guided application when you&apos;re ready.
                            </p>

                            <Link
                                href={`/benefits/${id}/application`}
                                className="mt-5 inline-flex items-center text-sm font-semibold text-olive transition-colors duration-200 hover:text-terracotta focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
                            >
                                Prepare application
                                <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">
                                    →
                                </span>
                            </Link>
                        </div>
                    </div>

                    <div className="mt-6 border-t border-border pt-6">
                        <Link
                            href={`/benefits/${id}`}
                            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-border bg-surface px-5 text-sm font-semibold text-olive-deep transition-all duration-200 hover:-translate-y-0.5 hover:bg-sand focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
                        >
                            ← Back to benefit
                        </Link>
                    </div>
                </section>
            </div>
        </main>
    );
}