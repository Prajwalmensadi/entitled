import Link from "next/link";

const demoBenefits = [
    {
        id: "demo-engineering-scholarship",
        name: "Engineering Student Scholarship",
        category: "Education support",
        benefit: "Annual financial support",
        description:
            "A prototype scholarship example for demonstrating the benefit discovery experience.",
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
            "A synthetic benefit used to demonstrate how citizens can explore relevant support.",
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
            "A synthetic benefit example showing how different forms of education support can be presented simply.",
        requirement: "Personal and education details",
        deadline: "Deadline shown when available",
        documents: "Documents shown after eligibility check",
    },
];

export default function BenefitsPage() {
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

            <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-12">
                <header className="max-w-2xl">
                    <p className="text-sm font-medium text-[#2f7652]">
                        Your benefits
                    </p>

                    <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                        Benefits you may be eligible for
                    </h1>

                    <p className="mt-3 leading-7 text-[#68736c]">
                        Explore support that may be relevant to your profile. You can
                        check the eligibility requirements for each benefit before
                        starting an application.
                    </p>
                </header>

                <div
                    role="note"
                    className="mt-6 rounded-2xl border border-[#d8e4da] bg-[#eef6f0] p-4 text-sm leading-6 text-[#24553d]"
                >
                    <strong className="font-semibold">Hackathon prototype:</strong>{" "}
                    The benefits shown here are synthetic demo data. Eligibility is
                    checked separately using the backend eligibility service.
                </div>

                <section className="mt-8" aria-labelledby="benefits-heading">
                    <div className="flex items-end justify-between gap-4">
                        <div>
                            <h2
                                id="benefits-heading"
                                className="text-xl font-semibold tracking-tight"
                            >
                                Explore benefits
                            </h2>

                            <p className="mt-1 text-sm text-[#68736c]">
                                {demoBenefits.length} benefits available in this prototype
                            </p>
                        </div>
                    </div>

                    <div className="mt-5 grid gap-5 lg:grid-cols-2">
                        {demoBenefits.map((benefit) => (
                            <article
                                key={benefit.id}
                                className="flex h-full flex-col rounded-3xl border border-[#dfe5df] bg-white p-5 shadow-[0_12px_40px_rgba(23,59,43,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_45px_rgba(23,59,43,0.08)] sm:p-6"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <span className="inline-flex rounded-full bg-[#eef4ef] px-3 py-1 text-xs font-medium text-[#2f7652]">
                                            {benefit.category}
                                        </span>

                                        <h3 className="mt-4 text-xl font-semibold tracking-tight">
                                            {benefit.name}
                                        </h3>
                                    </div>
                                </div>

                                <p className="mt-3 text-base font-medium text-[#24553d]">
                                    {benefit.benefit}
                                </p>

                                <p className="mt-2 leading-6 text-[#68736c]">
                                    {benefit.description}
                                </p>

                                <div className="mt-5 space-y-3 border-t border-[#e7ebe7] pt-5">
                                    <div className="flex gap-3">
                                        <span
                                            aria-hidden="true"
                                            className="mt-0.5 text-[#2f7652]"
                                        >
                                            ✓
                                        </span>

                                        <div>
                                            <p className="text-sm font-medium">Important requirement</p>
                                            <p className="mt-1 text-sm leading-5 text-[#68736c]">
                                                {benefit.requirement}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <span
                                            aria-hidden="true"
                                            className="mt-0.5 text-[#68736c]"
                                        >
                                            •
                                        </span>

                                        <div>
                                            <p className="text-sm font-medium">Deadline</p>
                                            <p className="mt-1 text-sm leading-5 text-[#68736c]">
                                                {benefit.deadline}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <span
                                            aria-hidden="true"
                                            className="mt-0.5 text-[#68736c]"
                                        >
                                            •
                                        </span>

                                        <div>
                                            <p className="text-sm font-medium">Documents</p>
                                            <p className="mt-1 text-sm leading-5 text-[#68736c]">
                                                {benefit.documents}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 pt-1">
                                    <Link
                                        href={`/benefits/${benefit.id}`}
                                        className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#173b2b] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#24553d] focus:outline-none focus:ring-2 focus:ring-[#173b2b] focus:ring-offset-2 sm:w-auto"
                                    >
                                        View details
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}