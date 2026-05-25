"use client";

import { useEffect, useMemo, useState } from "react";

const checklistItems = [
  { id: "saved", label: "Saved latest post changes" },
  { id: "downloaded", label: "Downloaded at least one card" },
  { id: "caption", label: "Copied the final caption" },
  { id: "link", label: "Copied the public post link" },
  { id: "instagram", label: "Posted to Instagram" },
  { id: "x", label: "Posted to X" },
  { id: "linkedin", label: "Posted to LinkedIn" },
] as const;

type ChecklistState = Record<string, boolean>;

function createInitialState() {
  return checklistItems.reduce<ChecklistState>((accumulator, item) => {
    accumulator[item.id] = false;
    return accumulator;
  }, {});
}

function mergeWithInitialState(parsed: unknown): ChecklistState {
  const baseState = createInitialState();
  if (!parsed || typeof parsed !== "object") {
    return baseState;
  }

  for (const item of checklistItems) {
    const value = (parsed as Record<string, unknown>)[item.id];
    if (typeof value === "boolean") {
      baseState[item.id] = value;
    }
  }

  return baseState;
}

export function StudioPublishingChecklist({ postSlug }: { postSlug: string }) {
  const storageKey = useMemo(() => `studio-publishing-checklist:${postSlug}`, [postSlug]);
  const [state, setState] = useState<ChecklistState>(() => {
    if (typeof window === "undefined") {
      return createInitialState();
    }

    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) {
        return createInitialState();
      }

      return mergeWithInitialState(JSON.parse(raw));
    } catch {
      return createInitialState();
    }
  });

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state, storageKey]);

  const completedCount = checklistItems.filter((item) => state[item.id]).length;
  const progress = Math.round((completedCount / checklistItems.length) * 100);

  return (
    <section className="mt-6 rounded-[1.5rem] border border-[var(--color-line)] bg-[var(--color-surface)] p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-brand)]">Publishing Checklist</p>
          <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
            Track distribution quickly so nothing is missed after you save and export.
          </p>
        </div>
        <div className="rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-sm font-semibold text-[var(--color-brand)]">
          {completedCount}/{checklistItems.length} done ({progress}%)
        </div>
      </div>

      <div className="mt-4 grid gap-2">
        {checklistItems.map((item) => (
          <label key={item.id} className="flex items-center gap-3 rounded-[0.9rem] bg-white px-3 py-2 text-sm text-[var(--color-ink)]">
            <input
              type="checkbox"
              checked={state[item.id]}
              onChange={(event) =>
                setState((current) => ({
                  ...current,
                  [item.id]: event.target.checked,
                }))
              }
            />
            <span>{item.label}</span>
          </label>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setState(createInitialState())}
        className="mt-4 rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-sm font-semibold text-[var(--color-brand)]"
      >
        Reset checklist
      </button>
    </section>
  );
}
