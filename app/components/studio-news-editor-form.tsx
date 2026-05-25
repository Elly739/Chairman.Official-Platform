"use client";

import Image from "next/image";
import { useActionState, useMemo, useState } from "react";
import { savePost } from "@/app/studio/actions";
import { posterDesignPresets } from "@/content/poster-designs";

const initialState = {
  message: "",
};

const newsTypes = [
  {
    id: "announcement",
    label: "Breaking / Announcement",
    kicker: "Announcement",
    tag: "Announcement",
    helper: "Important notices, platform updates, event announcements, and urgent public updates.",
    placeholder: "Chairman.Official introduces unified Create flow across all content types.",
  },
  {
    id: "release",
    label: "Product Update",
    kicker: "Release Notes",
    tag: "Product Update",
    helper: "Mini changelog style: what changed, what improved, and what was fixed.",
    placeholder: "Version 1.2.0: Unified Create system introduced.",
  },
  {
    id: "event",
    label: "Event / Scheduled Drop",
    kicker: "Scheduled Drop",
    tag: "Event",
    helper: "Upcoming launches, campaigns, campus/community events, birthdays, deadlines, and calendar moments.",
    placeholder: "Elly to celebrate his birthday on 16 June.",
  },
  {
    id: "statement",
    label: "Official Statement",
    kicker: "Official Statement",
    tag: "Statement",
    helper: "Authority voice for clarifications, decisions, direction shifts, and official positions.",
    placeholder: "A clarification on the next direction for Chairman.Official publishing.",
  },
] as const;

type NewsType = (typeof newsTypes)[number]["id"];

const announcementDesigns = posterDesignPresets.filter((preset) => preset.kind === "announcement");

function collapseWhitespace(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function clip(value: string, maxLength: number) {
  const cleaned = collapseWhitespace(value);
  if (cleaned.length <= maxLength) return cleaned;
  return `${cleaned.slice(0, maxLength - 3).trimEnd()}...`;
}

function getSelectedNewsType(value: NewsType) {
  return newsTypes.find((type) => type.id === value) ?? newsTypes[0];
}

function getBody(caption: string, details: string, newsType: NewsType, eventDate: string) {
  const body = [caption.trim()];
  const detailLines = details
    .split(/\r?\n/)
    .map((line) => line.replace(/^[-*]\s*/, "").trim())
    .filter(Boolean);

  if (detailLines.length) {
    body.push(detailLines.map((line) => `- ${line}`).join("\n"));
  }

  if (newsType === "event" && eventDate) {
    body.push(`Scheduled for ${eventDate}.`);
  }

  return body.filter(Boolean).join("\n\n");
}

export function StudioNewsEditorForm() {
  const [state, formAction, pending] = useActionState(savePost, initialState);
  const [newsType, setNewsType] = useState<NewsType>("announcement");
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [details, setDetails] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [status, setStatus] = useState("published");
  const [selectedDesignId, setSelectedDesignId] = useState(announcementDesigns[0]?.id ?? "");

  const selectedType = getSelectedNewsType(newsType);
  const selectedDesign = announcementDesigns.find((design) => design.id === selectedDesignId) ?? announcementDesigns[0];
  const summary = useMemo(() => clip(caption || selectedType.helper, 180), [caption, selectedType.helper]);
  const socialHook = useMemo(() => clip(title || selectedType.placeholder, 120), [selectedType.placeholder, title]);
  const shareCaption = useMemo(() => clip(caption || title || selectedType.helper, 150), [caption, selectedType.helper, title]);
  const body = useMemo(() => getBody(caption, details, newsType, eventDate), [caption, details, eventDate, newsType]);
  const tags = [selectedType.tag, newsType === "release" ? "Release Notes" : "News", "Official"].join(", ");
  const coverImage = selectedDesign?.coverImage ?? "/media/news-cover.svg";
  const coverAlt = selectedDesign?.coverAlt ?? "Official news announcement card";
  const portraitImage = selectedDesign?.portraitImage ?? "";
  const portraitAlt = selectedDesign?.portraitAlt ?? "";

  return (
    <form action={formAction} className="grid gap-8 xl:grid-cols-[1fr_0.86fr]">
      <input type="hidden" name="originalSlug" value="" />
      <input type="hidden" name="slug" value="" />
      <input type="hidden" name="category" value="news" />
      <input type="hidden" name="kicker" value={selectedType.kicker} />
      <input type="hidden" name="summary" value={summary} />
      <input type="hidden" name="socialHook" value={socialHook} />
      <input type="hidden" name="shareCaption" value={shareCaption} />
      <input type="hidden" name="socialCardTemplate" value={selectedDesign?.template ?? "portrait"} />
      <input type="hidden" name="platformCopyInstagram" value={shareCaption} />
      <input type="hidden" name="platformCopyX" value={socialHook} />
      <input type="hidden" name="platformCopyLinkedIn" value={caption || shareCaption} />
      <input type="hidden" name="audience" value="Public audience, media, supporters" />
      <input type="hidden" name="tags" value={tags} />
      <input type="hidden" name="distributionChannels" value="Website, WhatsApp, Instagram, LinkedIn" />
      <input type="hidden" name="publishedAt" value="" />
      <input type="hidden" name="scheduledFor" value="" />
      <input type="hidden" name="coverImage" value={coverImage} />
      <input type="hidden" name="coverAlt" value={coverAlt} />
      <input type="hidden" name="portraitImage" value={portraitImage} />
      <input type="hidden" name="portraitAlt" value={portraitAlt} />
      <input type="hidden" name="body" value={body} />

      <section className="grid gap-6">
        <article className="rounded-[2rem] border border-[var(--color-line)] bg-white p-6 shadow-[0_14px_40px_rgba(10,61,98,0.08)] lg:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-brand)]">News card</p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-[var(--color-ink)]">Create official news as a card plus caption.</h2>
          <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
            News is for announcements, release notes, scheduled drops, and official statements. The card carries the headline; the caption gives the explanation.
          </p>
        </article>

        <article className="rounded-[2rem] border border-[var(--color-line)] bg-white p-6 shadow-[0_14px_40px_rgba(10,61,98,0.08)] lg:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-brand)]">News type</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {newsTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setNewsType(type.id)}
                className={`rounded-[1.5rem] border p-5 text-left transition ${
                  newsType === type.id
                    ? "border-[var(--color-brand)] bg-[var(--color-soft)] shadow-[0_12px_30px_rgba(10,61,98,0.12)]"
                    : "border-[var(--color-line)] bg-white hover:border-[var(--color-brand)]"
                }`}
              >
                <p className="font-heading text-xl font-semibold text-[var(--color-ink)]">{type.label}</p>
                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{type.helper}</p>
              </button>
            ))}
          </div>
        </article>

        <article className="rounded-[2rem] border border-[var(--color-line)] bg-white p-6 shadow-[0_14px_40px_rgba(10,61,98,0.08)] lg:p-8">
          <div className="grid gap-5">
            <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
              Headline
              <input
                name="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
                placeholder={selectedType.placeholder}
                className="studio-input"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
              Caption / explanation
              <textarea
                value={caption}
                onChange={(event) => setCaption(event.target.value)}
                required
                rows={6}
                placeholder="Explain the announcement in plain public language. This becomes the news caption and article body."
                className="studio-input min-h-44"
              />
            </label>

            {newsType === "release" ? (
              <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
                Release notes
                <textarea
                  value={details}
                  onChange={(event) => setDetails(event.target.value)}
                  rows={5}
                  placeholder={"Unified Create system introduced\nPoster selection flow refactored\nRemoved duplicate post editor entry points"}
                  className="studio-input min-h-36"
                />
              </label>
            ) : null}

            {newsType === "event" ? (
              <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
                Date or schedule note
                <input
                  value={eventDate}
                  onChange={(event) => setEventDate(event.target.value)}
                  placeholder="16 June, 10:00 AM"
                  className="studio-input"
                />
              </label>
            ) : null}
          </div>
        </article>

        <article className="rounded-[2rem] border border-[var(--color-line)] bg-white p-6 shadow-[0_14px_40px_rgba(10,61,98,0.08)] lg:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-brand)]">Announcement card design</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {announcementDesigns.map((design) => (
              <button
                key={design.id}
                type="button"
                onClick={() => setSelectedDesignId(design.id)}
                className={`overflow-hidden rounded-[1.5rem] border bg-white text-left transition hover:border-[var(--color-brand)] ${
                  selectedDesign?.id === design.id ? "border-[var(--color-brand)] shadow-[0_12px_30px_rgba(10,61,98,0.12)]" : "border-[var(--color-line)]"
                }`}
              >
                <div className="relative aspect-[16/10] bg-[var(--color-soft)]">
                  <Image src={design.previewImage} alt={design.previewAlt} fill className="object-cover object-top" sizes="360px" />
                </div>
                <div className="p-4">
                  <p className="font-heading text-lg font-semibold text-[var(--color-ink)]">{design.label}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{design.blurb}</p>
                </div>
              </button>
            ))}
          </div>
        </article>

        <article className="rounded-[2rem] border border-[var(--color-line)] bg-white p-6 shadow-[0_14px_40px_rgba(10,61,98,0.08)] lg:p-8">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
              Publishing status
              <select name="editorialStatus" value={status} onChange={(event) => setStatus(event.target.value)} className="studio-input">
                <option value="published">Publish now</option>
                <option value="draft">Save as draft</option>
                <option value="review">Ready for review</option>
              </select>
            </label>
          </div>

          {state.message ? <p className="mt-5 rounded-[1rem] bg-rose-50 px-4 py-3 text-sm text-rose-700">{state.message}</p> : null}

          <button type="submit" disabled={pending} className="mt-6 rounded-full bg-[var(--color-brand)] px-6 py-3 text-sm font-semibold text-white disabled:opacity-60">
            {pending ? "Publishing..." : status === "published" ? "Publish news" : "Save news"}
          </button>
        </article>
      </section>

      <aside className="grid gap-6 xl:sticky xl:top-24 xl:self-start">
        <article className="overflow-hidden rounded-[2rem] border border-[var(--color-line)] bg-white shadow-[0_14px_40px_rgba(10,61,98,0.08)]">
          <div className="relative aspect-[4/5] bg-[var(--color-brand)]">
            <Image src={coverImage} alt={coverAlt} fill className="object-cover object-top opacity-80" sizes="(max-width: 1280px) 100vw, 420px" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,27,45,0.2),rgba(5,27,45,0.88))]" />
            <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/72">Chairman.Official News</p>
                <span className="rounded-full border border-white/16 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/76">
                  {selectedType.kicker}
                </span>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-white/64">{selectedType.label}</p>
                <h3 className="mt-4 font-heading text-4xl font-semibold leading-tight text-white">{title || "News headline preview"}</h3>
                <p className="mt-5 text-sm leading-7 text-white/82">{caption || "The caption will explain the news after the card carries the headline."}</p>
              </div>
            </div>
          </div>
        </article>

        <article className="rounded-[2rem] border border-[var(--color-line)] bg-white p-6 shadow-[0_14px_40px_rgba(10,61,98,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-brand)]">What will be saved</p>
          <div className="mt-5 grid gap-4 text-sm leading-7 text-[var(--color-muted)]">
            <p><span className="font-semibold text-[var(--color-ink)]">Type:</span> {selectedType.label}</p>
            <p><span className="font-semibold text-[var(--color-ink)]">Card:</span> {selectedDesign?.label ?? "Announcement card"}</p>
            <p><span className="font-semibold text-[var(--color-ink)]">Summary:</span> {summary}</p>
            <p><span className="font-semibold text-[var(--color-ink)]">Tags:</span> {tags}</p>
          </div>
        </article>
      </aside>
    </form>
  );
}
