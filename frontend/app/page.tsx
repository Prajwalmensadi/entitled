import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f8f5] text-[#17201a]">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#173b2b] text-sm font-bold text-white">
            E
          </div>
          <span className="text-lg font-semibold tracking-tight">Entitled</span>
        </div>

        <span className="hidden text-sm text-[#66716a] sm:block">
          Benefits, made simpler.
        </span>
      </nav>

      <section className="mx-auto flex min-h-[calc(100vh-80px)] max-w-6xl items-center px-5 pb-16 pt-8 sm:px-8">
        <div className="grid w-full gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d8dfd9] bg-white px-3 py-1.5 text-sm text-[#526058] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#2f7652]" />
              Built for citizens
            </div>

            <h1 className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              Find the benefits you may be entitled to.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-[#5e6962]">
              Tell us a little about yourself. Entitled helps you understand
              which public benefits may fit your situation, what you need, and
              what to do next.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/profile"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#173b2b] px-6 text-base font-semibold text-white shadow-sm transition hover:bg-[#24553d] focus:outline-none focus:ring-2 focus:ring-[#173b2b] focus:ring-offset-2"
              >
                Get started
              </Link>

              <div className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#d5ddd7] bg-white px-6 text-sm font-medium text-[#526058]">
                Takes about 2 minutes
              </div>
            </div>

            <p className="mt-5 text-xs leading-5 text-[#78827c]">
              Hackathon prototype using synthetic/demo data.
            </p>
          </div>

          <div className="rounded-3xl border border-[#dfe5df] bg-white p-6 shadow-[0_20px_60px_rgba(23,59,43,0.08)] sm:p-8">
            <p className="text-sm font-medium text-[#66716a]">
              What you&apos;ll get
            </p>

            <div className="mt-6 space-y-5">
              {[
                ["01", "A simple profile", "Share only the information needed to get started."],
                ["02", "Relevant benefits", "See benefits that may match your situation."],
                ["03", "Clear next steps", "Understand requirements and what you need to do."],
              ].map(([number, title, description]) => (
                <div key={number} className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#edf3ee] text-xs font-bold text-[#2f7652]">
                    {number}
                  </div>
                  <div>
                    <h2 className="font-semibold">{title}</h2>
                    <p className="mt-1 text-sm leading-6 text-[#6a746d]">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7 rounded-2xl bg-[#f7f8f5] p-4">
              <p className="text-sm font-medium">Your information stays understandable.</p>
              <p className="mt-1 text-xs leading-5 text-[#6a746d]">
                You&apos;ll be able to review and edit the information you provide
                before continuing.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}