"use client";

import Image from "next/image";
import { useActionState, useMemo, useRef, useState, useTransition } from "react";
import { savePost } from "@/app/studio/actions";
import type { MediaItem } from "@/lib/content";

const initialState = {
  message: "",
};

const defaultChannels = "Website, LinkedIn, Newsletter";
const defaultAudience = "Readers, partners, digital audience";

function collapseWhitespace(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function getParagraphs(value: string) {
  return value
    .split(/\r?\n\r?\n/)
    .map((paragraph) => collapseWhitespace(paragraph))
    .filter(Boolean);
}

function clip(value: string, maxLength: number) {
  const cleaned = collapseWhitespace(value);
  if (cleaned.length <= maxLength) return cleaned;
  return `${cleaned.slice(0, maxLength - 3).trimEnd()}...`;
}

function inferSummary(body: string, fallbackTitle: string) {
  const firstParagraph = getParagraphs(body)[0] ?? fallbackTitle;
  return clip(firstParagraph, 190);
}

function inferSocialHook(summary: string, title: string) {
  const sentence = summary.split(/[.!?]/)[0]?.trim() || summary || title;
  return clip(sentence, 120);
}

function inferShareCaption(summary: string, title: string) {
  return clip(summary || title, 150);
}

function fileNameLabel(name: string) {
  const trimmed = name.includes(".") ? name.slice(0, name.lastIndexOf(".")) : name;
  return trimmed.replace(/[-_]+/g, " ").trim();
}

export function StudioInsightEditorForm({
  mediaItems,
  suggestedTags,
}: {
  mediaItems: MediaItem[];
  suggestedTags: string[];
}) {
  const [state, formAction, pending] = useActionState(savePost, initialState);
  const [isUploading, startUploadTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [coverAlt, setCoverAlt] = useState("");
  const [status, setStatus] = useState("draft");
  const [featured, setFeatured] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>(suggestedTags.slice(0, 2));
  const [customTags, setCustomTags] = useState("");
  const [audience, setAudience] = useState(defaultAudience);
  const [uploadMessage, setUploadMessage] = useState("");
  const [editorMediaItems, setEditorMediaItems] = useState(mediaItems);

  const summary = useMemo(() => inferSummary(body, title), [body, title]);
  const socialHook = useMemo(() => inferSocialHook(summary, title), [summary, title]);
  const shareCaption = useMemo(() => inferShareCaption(summary, title), [summary, title]);
  const allTags = useMemo(() => {
    const custom = customTags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    return Array.from(new Set([...selectedTags, ...custom]));
  }, [customTags, selectedTags]);
  const previewImage = coverImage || "/media/blog-cover.svg";
  const previewAlt = coverAlt || title || "Insight cover image";
  const paragraphCount = getParagraphs(body).length;
  const wordCount = collapseWhitespace(body).split(/\s+/).filter(Boolean).length;

  function toggleTag(tag: string) {
    setSelectedTags((current) =>
      current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag]
    );
  }

  function handleInlineUpload() {
    setUploadMessage("");

    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setUploadMessage("Choose an image first.");
      return;
    }

    const label = fileNameLabel(file.name);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title || label);
    formData.append("alt", title ? `${title} cover image` : label);
    formData.append("description", title ? `Cover image for ${title}` : "Insight cover image");

    startUploadTransition(async () => {
      const response = await fetch("/api/studio/media", {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json()) as {
        item?: MediaItem;
        message?: string;
      };

      if (!response.ok || !payload.item) {
        setUploadMessage(payload.message ?? "Upload failed. Try again.");
        return;
      }

      setEditorMediaItems((current) => [payload.item!, ...current.filter((item) => item.src !== payload.item!.src)]);
      setCoverImage(payload.item.src ?? "");
      setCoverAlt(payload.item.alt ?? payload.item.title);
      setUploadMessage(`Uploaded ${payload.item.title}. It is now the insight cover.`);
      if (fileInputRef.current) fileInputRef.current.value = "";
    });
  }

  return (
    <form action={formAction} className="grid gap-6 xl:grid-cols-[1fr_0.86fr]">
      <input type="hidden" name="originalSlug" value="" />
      <input type="hidden" name="slug" value="" />
      <input type="hidden" name="category" value="blog" />
      <input type="hidden" name="kicker" value="Insight Essay" />
      <input type="hidden" name="summary" value={summary} />
      <input type="hidden" name="socialHook" value={socialHook} />
      <input type="hidden" name="shareCaption" value={shareCaption} />
      <input type="hidden" name="socialCardTemplate" value="statement" />
      <input type="hidden" name="platformCopyInstagram" value={socialHook} />
      <input type="hidden" name="platformCopyX" value={socialHook} />
      <input type="hidden" name="platformCopyLinkedIn" value={shareCaption} />
      <input type="hidden" name="distributionChannels" value={defaultChannels} />
      <input type="hidden" name="publishedAt" value="" />
      <input type="hidden" name="scheduledFor" value="" />
      <input type="hidden" name="coverImage" value={coverImage} />
      <input type="hidden" name="coverAlt" value={coverAlt} />
      <input type="hidden" name="portraitImage" value={coverImage} />
      <input type="hidden" name="portraitAlt" value={coverAlt} />
      <input type="hidden" name="tags" value={allTags.join(", ")} />
      <input type="hidden" name="audience" value={audience} />
      <input type="hidden" name="body" value={body} />
      {featured ? <input type="hidden" name="featured" value="on" /> : null}

      <section className="grid gap-6">
        <article className="rounded-[2rem] border border-[var(--color-line)] bg-white p-6 shadow-[0_14px_40px_rgba(10,61,98,0.08)] lg:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-brand)]">Insight article</p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-[var(--color-ink)]">Write the article. The system handles the structure.</h2>
          <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
            Add a title, write the article body, and choose a cover image. Summary, read time, slug, share text, and card wording are generated from the article.
          </p>
        </article>

        <article className="rounded-[2rem] border border-[var(--color-line)] bg-white p-6 shadow-[0_14px_40px_rgba(10,61,98,0.08)] lg:p-8">
          <div className="grid gap-5">
            <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
              Article title
              <input
                name="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
                placeholder="Why modern public leadership needs product thinking"
                className="studio-input"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
              Article body
              <textarea
                value={body}
                onChange={(event) => setBody(event.target.value)}
                required
                rows={18}
                placeholder={"Write the full insight here.\n\nUse a blank line between paragraphs. The public article page will use those paragraphs automatically."}
                className="studio-input min-h-[32rem]"
              />
            </label>
          </div>
        </article>

        <article className="rounded-[2rem] border border-[var(--color-line)] bg-white p-6 shadow-[0_14px_40px_rgba(10,61,98,0.08)] lg:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-brand)]">Cover image</p>
          <h3 className="mt-3 font-heading text-2xl font-semibold text-[var(--color-ink)]">Upload or choose an existing image</h3>

          <div className="mt-5 grid gap-4">
            <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
              Upload image
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                className="studio-input file:mr-4 file:rounded-full file:border-0 file:bg-[var(--color-brand)] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
              />
            </label>
            {uploadMessage ? <p className="rounded-[1rem] bg-[var(--color-soft)] px-4 py-3 text-sm text-[var(--color-brand)]">{uploadMessage}</p> : null}
            <button
              type="button"
              onClick={handleInlineUpload}
              disabled={isUploading}
              className="w-fit rounded-full border border-[var(--color-brand)] bg-white px-5 py-3 text-sm font-semibold text-[var(--color-brand)] disabled:opacity-60"
            >
              {isUploading ? "Uploading..." : "Upload and use image"}
            </button>
          </div>

          {editorMediaItems.length ? (
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {editorMediaItems.slice(0, 8).map((item) => (
                <button
                  key={`${item.src}-${item.title}`}
                  type="button"
                  onClick={() => {
                    setCoverImage(item.src ?? "");
                    setCoverAlt(item.alt ?? item.title);
                  }}
                  className={`overflow-hidden rounded-[1.25rem] border bg-[var(--color-surface)] text-left transition hover:border-[var(--color-brand)] ${
                    coverImage === item.src ? "border-[var(--color-brand)] shadow-[0_12px_30px_rgba(10,61,98,0.12)]" : "border-[var(--color-line)]"
                  }`}
                >
                  <div className="relative aspect-[16/10] bg-white">
                    <Image src={item.src ?? "/media/blog-cover.svg"} alt={item.alt ?? item.title} fill className="object-contain" sizes="240px" />
                  </div>
                  <div className="p-3">
                    <p className="truncate text-sm font-semibold text-[var(--color-ink)]">{item.title}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[var(--color-muted)]">Use as cover</p>
                  </div>
                </button>
              ))}
            </div>
          ) : null}
        </article>

        <article className="rounded-[2rem] border border-[var(--color-line)] bg-white p-6 shadow-[0_14px_40px_rgba(10,61,98,0.08)] lg:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-brand)]">Simple publishing choices</p>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
              Status
              <select name="editorialStatus" value={status} onChange={(event) => setStatus(event.target.value)} className="studio-input">
                <option value="draft">Save as draft</option>
                <option value="review">Ready for review</option>
                <option value="published">Publish now</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
              Audience
              <select value={audience} onChange={(event) => setAudience(event.target.value)} className="studio-input">
                <option value={defaultAudience}>Readers, partners, digital audience</option>
                <option value="Young professionals, civic innovators">Young professionals, civic innovators</option>
                <option value="Founders, operators, policy partners">Founders, operators, policy partners</option>
                <option value="Students, creators, public leaders">Students, creators, public leaders</option>
              </select>
            </label>
          </div>

          {suggestedTags.length ? (
            <div className="mt-5">
              <p className="text-sm font-medium text-[var(--color-ink)]">Themes</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {suggestedTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      selectedTags.includes(tag)
                        ? "border-[var(--color-brand)] bg-[var(--color-brand)] text-white"
                        : "border-[var(--color-line)] bg-white text-[var(--color-brand)] hover:bg-[var(--color-soft)]"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <label className="mt-5 grid gap-2 text-sm font-medium text-[var(--color-ink)]">
            Add custom themes
            <input value={customTags} onChange={(event) => setCustomTags(event.target.value)} placeholder="Execution, Governance" className="studio-input" />
          </label>

          <label className="mt-5 flex items-center gap-3 text-sm font-medium text-[var(--color-ink)]">
            <input type="checkbox" checked={featured} onChange={(event) => setFeatured(event.target.checked)} />
            Feature this insight on the homepage
          </label>

          {state.message ? <p className="mt-5 rounded-[1rem] bg-rose-50 px-4 py-3 text-sm text-rose-700">{state.message}</p> : null}

          <button type="submit" disabled={pending} className="mt-6 rounded-full bg-[var(--color-brand)] px-6 py-3 text-sm font-semibold text-white disabled:opacity-60">
            {pending ? "Saving..." : status === "published" ? "Publish insight" : "Save insight"}
          </button>
        </article>
      </section>

      <aside className="grid gap-6 xl:sticky xl:top-24 xl:self-start">
        <article className="overflow-hidden rounded-[2rem] border border-[var(--color-line)] bg-white shadow-[0_14px_40px_rgba(10,61,98,0.08)]">
          <div className="relative aspect-[16/10] bg-[var(--color-soft)]">
            <Image src={previewImage} alt={previewAlt} fill className="object-cover" sizes="(max-width: 1280px) 100vw, 420px" />
          </div>
          <div className="p-6">
            <p className="font-mono text-xs tracking-[0.06em] text-[var(--color-muted)]">Insight Essay</p>
            <h3 className="mt-4 font-heading text-3xl font-semibold leading-tight text-[var(--color-ink)]">{title || "Your insight title"}</h3>
            <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{summary || "The summary will be detected from the opening paragraph."}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {(allTags.length ? allTags : ["Leadership", "Governance"]).slice(0, 3).map((tag) => (
                <span key={tag} className="rounded-md border border-[#e8c98b] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-brand)]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </article>

        <article className="rounded-[2rem] border border-[var(--color-line)] bg-white p-6 shadow-[0_14px_40px_rgba(10,61,98,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-brand)]">Detected automatically</p>
          <div className="mt-5 grid gap-4 text-sm leading-7 text-[var(--color-muted)]">
            <p><span className="font-semibold text-[var(--color-ink)]">Summary:</span> {summary || "Waiting for the first paragraph."}</p>
            <p><span className="font-semibold text-[var(--color-ink)]">Social hook:</span> {socialHook || "Waiting for article text."}</p>
            <p><span className="font-semibold text-[var(--color-ink)]">Share caption:</span> {shareCaption || "Waiting for article text."}</p>
            <p><span className="font-semibold text-[var(--color-ink)]">Structure:</span> {paragraphCount} paragraphs, {wordCount} words.</p>
          </div>
        </article>
      </aside>
    </form>
  );
}
