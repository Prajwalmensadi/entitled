import Link from "next/link";

type Benefit = {
    id: string;
    name: string;
    category: string;
    benefit: string;
    description: string;
    requirement: string;
    deadline: string;
    documents: string;
};

const demoBenefits: Benefit[] = [
    {
        id: "demo-engineering-scholarship",
        name: "Engineering Student Scholarship",
        category: "Education support",
        benefit: "Annual financial support",
        description:
            "A prototype scholarship example for demonstrating how citizens can understand a benefit before checking eligibility.",
        requirement: "Student profile and academic details",
        deadline: "Deadline shown when available",
        documents: "Documents shown after eligibility check",
    },
    {
        id: "demo-merit-scholarship",
        name: "Merit Scholarship for Students",
        category: "Academic support",
        benefit: "Scholarship assistance",
        description:
            "A synthetic benefit used to demonstrate how citizens can explore education support in one simple experience.",
        requirement: "Academic information may be required",
        deadline: "Deadline shown when available",
        documents: "Documents shown after eligibility check",
    },
    {
        id: "demo-student-support",
        name: "Student Support Grant",
        category: "Student support",
        benefit: "Financial assistance",
        description:
            "A synthetic benefit example showing how different forms of education support can be presented clearly.",
        requirement: "Personal and education details",
        deadline: "Deadline shown when available",
        documents: "Documents shown after eligibility check",
    },
];

type BenefitDetailsPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function BenefitDetailsPage({
    params,
}: BenefitDetailsPageProps) {
    const { id } = await params;

    const benefit = demoBenefits.find((item) => item.id === id);

    if (!benefit) {
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

                <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
                    <div className="rounded-3xl border border-[#dfe5df] bg-white p-6 shadow-[0_12px_40px_rgba(23,59,43,0.05)] sm:p-8">
                        <p className="text-sm font-medium text-[#66716a]">
                            Benefit not found
                        </p>

                        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
                            We couldn&apos;t find this benefit
                        </h1>

                        <p className="mt-3 leading-6 text-[#68736c]">
                            The benefit may no longer be available in this prototype.
                        </p>

                        <Link
                            href="/benefits"
                            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#173b2b] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#24553d] focus:outline-none focus:ring-2 focus:ring-[#173b2b] focus:ring-offset-2"
                        >
                            Back to benefits
                        </Link>
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
                    href="/benefits"
                    className="inline-flex min-h-10 items-center rounded-lg text-sm font-medium text-[#2f7652] underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-[#2f7652] focus:ring-offset-2"
                >
                    ← Back to benefits
                </Link>

                <header className="mt-8">
                    <span className="inline-flex rounded-full bg-[#eef4ef] px-3 py-1 text-xs font-medium text-[#2f7652]">
                        {benefit.category}
                    </span>

                    <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
                        {benefit.name}
                    </h1>

                    <p className="mt-4 text-lg font-medium text-[#24553d]">
                        {benefit.benefit}
                    </p>

                    <p className="mt-3 max-w-2xl leading-7 text-[#68736c]">
                        {benefit.description}
                    </p>
                </header>

                <div
                    role="note"
                    className="mt-8 rounded-2xl border border-[#d8e4da] bg-[#eef6f0] p-4 text-sm leading-6 text-[#24553d]"
                >
                    <strong className="font-semibold">Hackathon prototype:</strong>{" "}
                    This screen uses synthetic benefit data. Eligibility is determined
                    separately by the backend eligibility service.
                </div>

                <div className="mt-8 grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
                    <section
                        aria-labelledby="requirements-heading"
                        className="rounded-3xl border border-[#dfe5df] bg-white p-5 shadow-[0_12px_40px_rgba(23,59,43,0.05)] sm:p-7"
                    >
                        <h2
                            id="requirements-heading"
                            className="text-xl font-semibold tracking-tight"
                        >
                            What you should know
                        </h2>

                        <div className="mt-6 space-y-5">
                            <div className="flex gap-4">
                                <div
                                    aria-hidden="true"
                                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#eef4ef] text-[#2f7652]"
                                >
                                    ✓
                                </div>

                                <div>
                                    <h3 className="font-semibold">Important requirement</h3>
                                    <p className="mt-1 leading-6 text-[#68736c]">
                                        {benefit.requirement}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div
                                    aria-hidden="true"
                                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f3f5f3] text-[#66716a]"
                                >
                                    1
                                </div>

                                <div>
                                    <h3 className="font-semibold">Deadline</h3>
                                    <p className="mt-1 leading-6 text-[#68736c]">
                                        {benefit.deadline}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div
                                    aria-hidden="true"
                                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f3f5f3] text-[#66716a]"
                                >
                                    2
                                </div>

                                <div>
                                    <h3 className="font-semibold">Documents</h3>
                                    <p className="mt-1 leading-6 text-[#68736c]">
                                        {benefit.documents}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <aside className="h-fit rounded-3xl border border-[#dfe5df] bg-white p-5 shadow-[0_12px_40px_rgba(23,59,43,0.05)] sm:p-6">
                        <p className="text-sm font-medium text-[#66716a]">
                            Next step
                        </p>

                        <h2 className="mt-2 text-xl font-semibold tracking-tight">
                            Check whether this fits you
                        </h2>

                        <p className="mt-3 text-sm leading-6 text-[#68736c]">
                            We&apos;ll compare your profile with the benefit&apos;s
                            requirements and explain the result clearly.
                        </p>

                        <button
                            type="button"
                            disabled
                            aria-describedby="eligibility-note"
                            className="mt-6 inline-flex min-h-12 w-full cursor-not-allowed items-center justify-center rounded-xl bg-[#173b2b] px-5 text-sm font-semibold text-white opacity-60"
                        >
                            Check my eligibility
                        </button>

                        <p
                            id="eligibility-note"
                            className="mt-3 text-xs leading-5 text-[#7a837d]"
                        >
                            Eligibility checking will be connected to the backend in the
                            next integration step.
                        </p>
                    </aside>
                </div>
            </div>
        </main>
    );
}