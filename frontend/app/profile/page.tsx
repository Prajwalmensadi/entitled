"use client";

import { FormEvent, useState } from "react";

const states = [
  "Andhra Pradesh",
  "Delhi",
  "Gujarat",
  "Karnataka",
  "Kerala",
  "Maharashtra",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "West Bengal",
];

export default function ProfilePage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-[#f7f8f5] text-[#17201a]">
      <nav className="border-b border-[#e1e6e1] bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#173b2b] text-sm font-bold text-white">
              E
            </div>
            <span className="font-semibold">Entitled</span>
          </div>

          <span className="text-sm text-[#66716a]">Step 1 of 4</span>
        </div>
      </nav>

      <div className="mx-auto max-w-3xl px-5 py-8 sm:px-8 sm:py-12">
        <div className="mb-8">
          <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-[#e2e8e3]">
            <div className="h-full w-1/4 rounded-full bg-[#2f7652]" />
          </div>

          <p className="mt-3 text-sm font-medium text-[#66716a]">
            Your profile
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Tell us about yourself
          </h1>

          <p className="mt-3 max-w-xl leading-7 text-[#68736c]">
            This helps us understand which benefits may be relevant to you.
            You can review everything before continuing.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-[#dfe5df] bg-white p-5 shadow-[0_16px_50px_rgba(23,59,43,0.06)] sm:p-8"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold">Age</span>
              <span className="mt-1 block text-xs text-[#7a837d]">
                Your current age
              </span>
              <input
                name="age"
                type="number"
                min="0"
                max="120"
                placeholder="19"
                required
                className="mt-3 min-h-12 w-full rounded-xl border border-[#ccd5ce] bg-white px-4 text-base outline-none transition placeholder:text-[#a0a8a2] focus:border-[#2f7652] focus:ring-2 focus:ring-[#dcebe1]"
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold">State</span>
              <span className="mt-1 block text-xs text-[#7a837d]">
                Where you currently live
              </span>
              <select
                name="state"
                required
                defaultValue=""
                className="mt-3 min-h-12 w-full rounded-xl border border-[#ccd5ce] bg-white px-4 text-base outline-none transition focus:border-[#2f7652] focus:ring-2 focus:ring-[#dcebe1]"
              >
                <option value="" disabled>
                  Select your state
                </option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-semibold">Education level</span>
              <span className="mt-1 block text-xs text-[#7a837d]">
                Your current level of study
              </span>
              <select
                name="education_level"
                required
                defaultValue=""
                className="mt-3 min-h-12 w-full rounded-xl border border-[#ccd5ce] bg-white px-4 text-base outline-none transition focus:border-[#2f7652] focus:ring-2 focus:ring-[#dcebe1]"
              >
                <option value="" disabled>
                  Select education level
                </option>
                <option value="secondary">Secondary</option>
                <option value="undergraduate">Undergraduate</option>
                <option value="postgraduate">Postgraduate</option>
                <option value="other">Other</option>
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-semibold">Course</span>
              <span className="mt-1 block text-xs text-[#7a837d]">
                What are you studying?
              </span>
              <input
                name="course"
                type="text"
                placeholder="Engineering"
                required
                className="mt-3 min-h-12 w-full rounded-xl border border-[#ccd5ce] bg-white px-4 text-base outline-none transition placeholder:text-[#a0a8a2] focus:border-[#2f7652] focus:ring-2 focus:ring-[#dcebe1]"
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold">Family income</span>
              <span className="mt-1 block text-xs text-[#7a837d]">
                Approximate annual family income
              </span>
              <div className="relative mt-3">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#68736c]">
                  ₹
                </span>
                <input
                  name="family_income"
                  type="number"
                  min="0"
                  placeholder="250000"
                  required
                  className="min-h-12 w-full rounded-xl border border-[#ccd5ce] bg-white pl-9 pr-4 text-base outline-none transition placeholder:text-[#a0a8a2] focus:border-[#2f7652] focus:ring-2 focus:ring-[#dcebe1]"
                />
              </div>
            </label>

            <label className="block">
              <span className="text-sm font-semibold">Marks</span>
              <span className="mt-1 block text-xs text-[#7a837d]">
                Most recent percentage
              </span>
              <div className="relative mt-3">
                <input
                  name="marks"
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  placeholder="72"
                  required
                  className="min-h-12 w-full rounded-xl border border-[#ccd5ce] bg-white px-4 pr-10 text-base outline-none transition placeholder:text-[#a0a8a2] focus:border-[#2f7652] focus:ring-2 focus:ring-[#dcebe1]"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#68736c]">
                  %
                </span>
              </div>
            </label>
          </div>

          <div className="mt-8 border-t border-[#e7ebe7] pt-6">
            {submitted && (
              <div
                role="status"
                className="mb-5 rounded-2xl border border-[#cfe1d4] bg-[#f0f7f2] p-4 text-sm text-[#24553d]"
              >
                Profile captured locally for the prototype. API submission is
                not connected yet.
              </div>
            )}

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-5 text-[#7a837d]">
                You can edit these details before continuing.
              </p>

              <button
                type="submit"
                className="min-h-12 rounded-xl bg-[#173b2b] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#24553d] focus:outline-none focus:ring-2 focus:ring-[#173b2b] focus:ring-offset-2"
              >
                Continue
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
