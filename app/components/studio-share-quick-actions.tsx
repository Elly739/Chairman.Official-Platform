"use client";

import { useState } from "react";

function buildPlatformShareUrl(platformId: string, caption: string, postUrl: string) {
  if (platformId === "x") {
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(caption)}&url=${encodeURIComponent(postUrl)}`;
  }

  if (platformId === "linkedin") {
    return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;
  }

  if (platformId === "instagram") {
    return "https://www.instagram.com/";
  }

  return `https://wa.me/?text=${encodeURIComponent(`${caption} ${postUrl}`)}`;
}

type StudioShareQuickActionsProps = {
  platformId: string;
  platformLabel: string;
  caption: string;
  postUrl: string;
};

export function StudioShareQuickActions({ platformId, platformLabel, caption, postUrl }: StudioShareQuickActionsProps) {
  const [message, setMessage] = useState("");
  const shareUrl = buildPlatformShareUrl(platformId, caption, postUrl);

  async function copyText(value: string, successMessage: string, fallbackMessage: string) {
    try {
      await navigator.clipboard.writeText(value);
      setMessage(successMessage);
    } catch {
      setMessage(fallbackMessage);
    }
  }

  async function copyCaptionAndOpen() {
    try {
      await navigator.clipboard.writeText(caption);
      setMessage("Caption copied. Composer opened in a new tab.");
    } catch {
      setMessage("Composer opened. If caption did not copy, use Copy Caption.");
    }

    window.open(shareUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="grid gap-3">
      <div className="grid gap-2 sm:grid-cols-2">
        <button type="button" onClick={copyCaptionAndOpen} className="rounded-full bg-[var(--color-brand)] px-4 py-2 text-sm font-semibold text-white">
          Copy + Open
        </button>
        <a href={shareUrl} target="_blank" rel="noreferrer" className="rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-center text-sm font-semibold text-[var(--color-brand)]">
          Open Composer
        </a>
        <button
          type="button"
          onClick={() =>
            copyText(
              caption,
              `${platformLabel} caption copied.`,
              "Could not copy caption automatically. Please copy it manually from the card text."
            )
          }
          className="rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-sm font-semibold text-[var(--color-brand)]"
        >
          Copy Caption
        </button>
        <button
          type="button"
          onClick={() => copyText(postUrl, "Public post link copied.", "Could not copy link automatically.")}
          className="rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-sm font-semibold text-[var(--color-brand)]"
        >
          Copy Link
        </button>
      </div>

      {platformId === "instagram" ? (
        <p className="text-xs leading-6 text-[var(--color-muted)]">
          Instagram web does not prefill captions reliably. Use Copy + Open, then paste caption manually.
        </p>
      ) : null}
      {platformId === "linkedin" ? (
        <p className="text-xs leading-6 text-[var(--color-muted)]">
          LinkedIn usually opens with the link only. Paste the copied caption in the composer.
        </p>
      ) : null}
      {message ? <p className="rounded-[1rem] bg-white px-4 py-2 text-xs text-[var(--color-brand)]">{message}</p> : null}
    </div>
  );
}
