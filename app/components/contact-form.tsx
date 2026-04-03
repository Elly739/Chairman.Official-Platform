"use client";

import { useActionState } from "react";
import { submitContactInquiry, type PublicActionState } from "@/app/public-actions";

const initialState: PublicActionState = {};

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactInquiry, initialState);

  return (
    <form action={formAction} className="rounded-[1.75rem] border border-[var(--color-line)] bg-white p-8 shadow-[0_14px_40px_rgba(10,61,98,0.08)]">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-brand)]">Send a Message</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <input name="name" placeholder="Your name" className="studio-input" />
        <input name="email" type="email" placeholder="Your email" className="studio-input" />
      </div>
      <div className="mt-4">
        <input name="subject" placeholder="Subject" className="studio-input" />
      </div>
      <div className="mt-4">
        <textarea name="message" placeholder="Your message" rows={6} className="studio-input resize-y" />
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center rounded-full bg-[var(--color-brand)] px-6 py-3 text-sm font-semibold text-white disabled:cursor-wait disabled:opacity-70"
        >
          {isPending ? "Sending..." : "Submit Inquiry"}
        </button>
        {state.message ? (
          <p className={`text-sm ${state.success ? "text-[var(--color-brand)]" : "text-[#9f2f2f]"}`}>
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
