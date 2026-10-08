import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Build your profile",
    description:
      "Tell us a few details about yourself so we can understand what support may apply to you.",
  },
  {
    number: "02",
    title: "Discover benefits",
    description:
      "Explore scholarships, grants and other public benefits relevant to your situation.",
  },
  {
    number: "03",
    title: "Check eligibility",
    description:
      "See how your information matches the requirements and understand why you qualify.",
  },
  {
    number: "04",
    title: "Apply with confidence",
    description:
      "Review the documents you need and move through the application step by step.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-cream text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-20 border-b border-border bg-cream/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
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

          <span className="hidden rounded-full bg-sand px-3 py-1.5 text-xs font-semibold text-muted sm:inline-flex">
            Benefits, made simpler.
          </span>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 pb-14 pt-8 sm:px-8 sm:pb-20 sm:pt-12">
        <div className="relative overflow-hidden rounded-[2rem] bg-olive-deep px-6 py-10 text-white shadow-[0_28px_80px_rgba(38,58,46,0.16)] sm:px-10 sm:py-14 lg:px-14 lg:py-16">
          {/* Decorative shapes */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-terracotta/20 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 right-20 h-64 w-64 rounded-full bg-olive/30 blur-3xl"
          />

          <div className="relative grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-[#d8b09f]" />
                Built for citizens
              </div>

              <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                Find the support you&apos;re entitled to.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-[#e4ebe4] sm:text-lg">
                Tell us a little about yourself. Entitled helps you discover
                public benefits that may fit your situation, understand what
                you need, and know what to do next.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/profile"
                  className="group inline-flex min-h-12 items-center justify-center rounded-xl bg-[#f1e6dc] px-6 text-base font-semibold text-olive-deep shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-olive-deep"
                >
                  Get started
                  <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </Link>

                <div className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 bg-white/10 px-6 text-sm font-medium text-white/85 backdrop-blur-sm">
                  Takes about 2 minutes
                </div>
              </div>

              <p className="mt-5 text-xs leading-5 text-white/55">
                Hackathon prototype using synthetic/demo data.
              </p>
            </div>

            {/* Hero side card */}
            <div className="rounded-[1.75rem] border border-white/10 bg-white/10 p-5 shadow-xl backdrop-blur-sm sm:p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#d8b09f]">
                What you&apos;ll get
              </p>

              <div className="mt-6 space-y-4">
                {[
                  [
                    "01",
                    "A simple profile",
                    "Share only what is needed to get started.",
                  ],
                  [
                    "02",
                    "Relevant benefits",
                    "See support that may match your situation.",
                  ],
                  [
                    "03",
                    "Clear next steps",
                    "Understand requirements before you apply.",
                  ],
                ].map(([number, title, description]) => (
                  <div
                    key={number}
                    className="group flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#d8b09f]/15 text-xs font-bold text-[#e5c4b5]">
                      {number}
                    </div>

                    <div>
                      <h2 className="font-semibold text-white">{title}</h2>

                      <p className="mt-1 text-sm leading-6 text-[#d5ded7]">
                        {description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-[#172d23]/50 p-4">
                <p className="text-sm font-medium text-white">
                  Your information stays understandable.
                </p>

                <p className="mt-1 text-xs leading-5 text-[#c6d2ca]">
                  You&apos;ll be able to review and edit the information you
                  provide before continuing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8 sm:pb-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-terracotta">
            How it works
          </p>

          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-olive-deep sm:text-4xl">
            From discovery to application, without the confusion.
          </h2>

          <p className="mt-3 leading-7 text-muted">
            Entitled guides you through the process one step at a time, so you
            can understand your options before making an application.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <article
              key={step.number}
              className="group rounded-[1.75rem] border border-border bg-surface p-5 shadow-[0_14px_45px_rgba(38,58,46,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#c8cbbf] hover:shadow-[0_22px_55px_rgba(38,58,46,0.1)] sm:p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sand text-xs font-bold text-terracotta transition-transform duration-300 group-hover:scale-105">
                {step.number}
              </div>

              <h3 className="mt-5 text-lg font-semibold tracking-tight text-olive-deep">
                {step.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-5 pb-12 sm:px-8 sm:pb-16">
        <div className="relative overflow-hidden rounded-[2rem] border border-[#d8d0bd] bg-sand px-6 py-8 sm:px-10 sm:py-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-terracotta/10 blur-3xl"
          />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-terracotta">
                Ready when you are
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-olive-deep sm:text-3xl">
                Start discovering the support available to you.
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted">
                It only takes a few details to get started.
              </p>
            </div>

            <Link
              href="/profile"
              className="group inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-olive-deep px-6 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-olive focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
            >
              Get started
              <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-muted-light sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span className="font-semibold text-olive-deep">Entitled</span>

          <span>Hackathon prototype · Synthetic/demo data</span>
        </div>
      </footer>
    </main>
  );
}