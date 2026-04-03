"use client";

import { useActionState } from "react";
import { loginStudio } from "@/app/studio/actions";

const initialState = {
  message: "",
};

export function StudioLoginForm({ nextPath = "/studio" }: { nextPath?: string }) {
  const [state, formAction, pending] = useActionState(loginStudio, initialState);

  return (
    <form action={formAction} className="mt-8 grid gap-5">
      <input type="hidden" name="next" value={nextPath} />
      <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
        Studio password
        <input
          type="password"
          name="password"
          required
          className="rounded-[1rem] border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-ink)] outline-none"
        />
      </label>
      {state.message ? (
        <p className="rounded-[1rem] bg-rose-50 px-4 py-3 text-sm text-rose-700">{state.message}</p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-[var(--color-brand)] px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
      >
        {pending ? "Opening Studio..." : "Enter Studio"}
      </button>
    </form>
  );
}
