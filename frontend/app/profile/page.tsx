"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { createProfile, type ProfileInput } from "@/lib/api";
import { setStoredProfileId } from "@/lib/journey";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const profile: ProfileInput = {
      age: Number(formData.get("age")),
      state: String(formData.get("state")),
      education_level: String(formData.get("education_level")),
      course: String(formData.get("course")) || null,
      family_income: Number(formData.get("family_income")),
      marks: Number(formData.get("marks")),
    };

    setLoading(true);
    setError(null);
    try {
      const savedProfile = await createProfile(profile);
      setStoredProfileId(savedProfile.id);
      setSubmitted(true);
      router.push("/benefits");
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "We could not save your profile. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-cream text-foreground">
      {/* Header */}
      <nav className="border-b border-border bg-surface/90 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-olive-deep text-sm font-bold text-white shadow-sm">
              E
            </div>

            <span className="text-base font-semibold tracking-tight">
              Entitled
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-xs font-medium uppercase tracking-[0.12em] text-muted-light sm:block">
              Your journey
            </span>

            <span className="rounded-full bg-sand px-3 py-1.5 text-sm font-semibold text-olive-deep">
              1 of 4
            </span>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8 sm:py-12">
        {/* Progress */}
        <div className="mb-10">
          <div className="h-1.5 overflow-hidden rounded-full bg-[#ebe6dd]">
            <div className="h-full w-1/4 rounded-full bg-olive" />
          </div>

          <div className="mt-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-olive">
              Your profile
            </p>

            <p className="text-xs text-muted-light">
              About 2 minutes
            </p>
          </div>
        </div>

        {/* Introduction */}
        <header className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-terracotta">
            Let&apos;s get started
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em] text-olive-deep sm:text-5xl">
            Tell us about yourself
          </h1>

          <p className="mt-4 max-w-xl text-base leading-7 text-muted sm:text-lg">
            This helps us understand which benefits may be relevant to you.
            You can review everything before continuing.
          </p>
        </header>

        {/* Form */}
        <Card
          padding="lg"
          className="border-border bg-surface shadow-[0_20px_60px_rgba(38,58,46,0.08)]"
        >
          <form onSubmit={handleSubmit}>
            <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {/* Age */}
              <label className="block">
                <span className="text-sm font-semibold text-olive-deep">
                  Age
                </span>

                <span className="mt-1 block text-xs leading-5 text-muted-light">
                  Your current age
                </span>

                <Input
                  name="age"
                  type="number"
                  min="0"
                  max="120"
                  placeholder="19"
                  required
                  className="mt-3"
                />
              </label>

              {/* State */}
              <label className="block">
                <span className="text-sm font-semibold text-olive-deep">
                  State
                </span>

                <span className="mt-1 block text-xs leading-5 text-muted-light">
                  Where you currently live
                </span>

                <Select
                  name="state"
                  required
                  defaultValue=""
                  className="mt-3"
                >
                  <option value="" disabled>
                    Select your state
                  </option>

                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </Select>
              </label>

              {/* Education */}
              <label className="block">
                <span className="text-sm font-semibold text-olive-deep">
                  Education level
                </span>

                <span className="mt-1 block text-xs leading-5 text-muted-light">
                  Your current level of study
                </span>

                <Select
                  name="education_level"
                  required
                  defaultValue=""
                  className="mt-3"
                >
                  <option value="" disabled>
                    Select education level
                  </option>

                  <option value="secondary">Secondary</option>
                  <option value="undergraduate">Undergraduate</option>
                  <option value="postgraduate">Postgraduate</option>
                  <option value="other">Other</option>
                </Select>
              </label>

              {/* Course */}
              <label className="block">
                <span className="text-sm font-semibold text-olive-deep">
                  Course
                </span>

                <span className="mt-1 block text-xs leading-5 text-muted-light">
                  What are you studying?
                </span>

                <Input
                  name="course"
                  type="text"
                  placeholder="Engineering"
                  required
                  className="mt-3"
                />
              </label>

              {/* Family income */}
              <label className="block">
                <span className="text-sm font-semibold text-olive-deep">
                  Family income
                </span>

                <span className="mt-1 block text-xs leading-5 text-muted-light">
                  Approximate annual family income
                </span>

                <div className="relative mt-3">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-olive">
                    ₹
                  </span>

                  <Input
                    name="family_income"
                    type="number"
                    min="0"
                    placeholder="250000"
                    required
                    className="pl-9"
                  />
                </div>
              </label>

              {/* Marks */}
              <label className="block">
                <span className="text-sm font-semibold text-olive-deep">
                  Marks
                </span>

                <span className="mt-1 block text-xs leading-5 text-muted-light">
                  Most recent percentage
                </span>

                <div className="relative mt-3">
                  <Input
                    name="marks"
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    placeholder="72"
                    required
                    className="pr-10"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-olive">
                    %
                  </span>
                </div>
              </label>
            </div>

            {/* Bottom section */}
            <div className="mt-9 border-t border-border pt-6">
              {submitted && (
                <div
                  role="status"
                  className="mb-6 rounded-2xl border border-[#d7dfcc] bg-[#f1f5eb] p-4 text-sm leading-6 text-olive-deep"
                >
                  <span className="font-semibold">Profile saved.</span>{" "}
                  Your profile is ready for benefit discovery.
                </div>
              )}

              {error && (
                <div
                  role="alert"
                  className="mb-6 rounded-2xl border border-[#e7c9bd] bg-[#faf0e8] p-4 text-sm leading-6 text-[#8a4c35]"
                >
                  {error}
                </div>
              )}

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-olive-deep">
                    Your information stays editable
                  </p>

                  <p className="mt-1 text-xs leading-5 text-muted-light">
                    You can review these details before continuing.
                  </p>
                </div>

                <Button type="submit" loading={loading}>
                  Continue
                  <span aria-hidden="true" className="ml-2">
                    →
                  </span>
                </Button>
              </div>
            </div>
          </form>
        </Card>

        {/* Small reassurance */}
        <div className="mt-6 flex items-start gap-3 px-1">
          <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sand text-xs text-olive-deep">
            ✓
          </div>

          <p className="text-xs leading-5 text-muted-light">
            We&apos;ll use these details only to help identify relevant benefits
            and eligibility information.
          </p>
        </div>
      </div>
    </main>
  );
}
