"use client";

import { useActionState } from "react";
import { subscribeAudience, type PublicActionState } from "@/app/public-actions";

const initialState: PublicActionState = {};

type NewsletterFormProps = {
  source?: string;
  compact?: boolean;
};

export function NewsletterForm({ source = "Website Homepage", compact = false }: NewsletterFormProps) {
  const [state, formAction, isPending] = useActionState(subscribeAudience, initialState);

  return (
    <form action={formAction} className={compact ? "flex flex-col gap-3 sm:flex-row" : "mt-8 flex flex-col gap-4 sm:flex-row sm:items-center"}>
      <input type="hidden" name="source" value={source} />
      <input
        name="email"
        type="email"
        placeholder="Enter your email"
        className={compact ? "studio-input sm:max-w-sm" : "studio-input sm:max-w-md"}
      />
      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center justify-center rounded-full bg-[var(--color-brand)] px-6 py-3 text-sm font-semibold text-white disabled:cursor-wait disabled:opacity-70"
      >
        {isPending ? "Joining..." : "Subscribe"}
      </button>
      {state.message ? (
        <p className={`text-sm ${state.success ? "text-[var(--color-brand)]" : "text-[#9f2f2f]"}`}>
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
