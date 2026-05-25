"use client";

import Image from "next/image";
import { useActionState, useRef, useState, useTransition } from "react";
import { deletePost, savePost } from "@/app/studio/actions";
import type { MediaItem, Post, SocialCardTemplate } from "@/lib/content";

const initialState = {
  message: "",
};

const templateDescriptions: Record<SocialCardTemplate, string> = {
  campaign: "Bold campaign layout with a highlighted quote panel and no required portrait.",
  portrait: "Portrait-led composition with a dedicated photo zone and fallback monogram if no image is set.",
  statement: "Text-first editorial layout for desk letters, essays, and idea-led posts.",
};

const livePlatforms = [
  { id: "instagram", label: "Instagram", ratio: "4:5" },
  { id: "x", label: "X", ratio: "16:9" },
  { id: "linkedin", label: "LinkedIn", ratio: "1:1" },
] as const;

function formatScheduleLabel(value?: string) {
  if (!value) {
    return "Not scheduled yet";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function getCategoryLabel(value: string) {
  if (value === "desk") return "Chairman's Desk";
  if (value === "blog") return "Insights";
  return "News";
}

function getStatusTone(value: string) {
  if (value === "published") return "bg-emerald-100 text-emerald-700";
  if (value === "review") return "bg-amber-100 text-amber-700";
  return "bg-slate-100 text-slate-700";
}

type StudioPostEditorFormProps = {
  post?: Post;
  mediaItems?: MediaItem[];
  defaultCategory?: Post["category"];
  defaultKicker?: string;
  defaultTemplate?: SocialCardTemplate;
};

export function StudioPostEditorForm({
  post,
  mediaItems = [],
  defaultCategory,
  defaultKicker,
  defaultTemplate,
}: StudioPostEditorFormProps) {
  const [state, formAction, pending] = useActionState(savePost, initialState);
  const [isUploading, startUploadTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const altInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const deleteAction = post ? deletePost.bind(null, post.slug) : null;

  const [title, setTitle] = useState(post?.title ?? "");
  const [category, setCategory] = useState(post?.category ?? defaultCategory ?? "news");
  const [editorialStatus, setEditorialStatus] = useState(post?.editorialStatus ?? "draft");
  const [kicker, setKicker] = useState(post?.kicker ?? defaultKicker ?? "");
  const [summary, setSummary] = useState(post?.summary ?? "");
  const [socialHook, setSocialHook] = useState(post?.socialHook ?? "");
  const [shareCaption, setShareCaption] = useState(post?.shareCaption ?? "");
  const [coverImage, setCoverImage] = useState(post?.coverImage ?? "");
  const [coverAlt, setCoverAlt] = useState(post?.coverAlt ?? "");
  const [portraitImage, setPortraitImage] = useState(post?.portraitImage ?? "");
  const [portraitAlt, setPortraitAlt] = useState(post?.portraitAlt ?? "");
  const [socialCardTemplate, setSocialCardTemplate] = useState<SocialCardTemplate>(
    post?.socialCardTemplate ?? defaultTemplate ?? "campaign"
  );
  const [scheduledFor, setScheduledFor] = useState(post?.scheduledFor ?? "");
  const [platformCopyInstagram, setPlatformCopyInstagram] = useState(post?.platformCopy?.instagram ?? post?.socialHook ?? "");
  const [platformCopyX, setPlatformCopyX] = useState(post?.platformCopy?.x ?? post?.socialHook ?? "");
  const [platformCopyLinkedIn, setPlatformCopyLinkedIn] = useState(post?.platformCopy?.linkedin ?? post?.socialHook ?? "");
  const [editorMediaItems, setEditorMediaItems] = useState(mediaItems);
  const [uploadMessage, setUploadMessage] = useState("");

  const previewImage = coverImage || "/media/news-cover.svg";
  const previewAlt = coverAlt || title || "Post cover preview";
  const portraitPreviewImage = portraitImage || previewImage;
  const portraitPreviewAlt = portraitAlt || coverAlt || title || "Portrait preview";
  const routeLabel = category === "desk" ? "/chairmans-desk/[slug]" : `/${category}/[slug]`;

  const liveCopy = {
    instagram: platformCopyInstagram || socialHook || summary,
    x: platformCopyX || socialHook || summary,
    linkedin: platformCopyLinkedIn || socialHook || summary,
  };

  function resetUploadFields() {
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (titleInputRef.current) titleInputRef.current.value = "";
    if (altInputRef.current) altInputRef.current.value = "";
    if (descriptionInputRef.current) descriptionInputRef.current.value = "";
  }

  function handleInlineUpload() {
    setUploadMessage("");

    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setUploadMessage("Choose a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", titleInputRef.current?.value ?? "");
    formData.append("alt", altInputRef.current?.value ?? "");
    formData.append("description", descriptionInputRef.current?.value ?? "");

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
      if (!portraitImage) {
        setPortraitImage(payload.item.src ?? "");
        setPortraitAlt(payload.item.alt ?? payload.item.title);
      }
      setUploadMessage(`Uploaded ${payload.item.title}. It is now ready inside this editor.`);
      resetUploadFields();
    });
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
      <form action={formAction} className="grid gap-6 rounded-[2rem] border border-[var(--color-line)] bg-white p-6 shadow-[0_14px_40px_rgba(10,61,98,0.08)] lg:p-8">
        <input type="hidden" name="originalSlug" value={post?.slug ?? ""} />

        <section className="rounded-[1.7rem] border border-[var(--color-line)] bg-[var(--color-surface)] p-5 lg:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-brand)]">Clear workflow</p>
              <h2 className="mt-2 font-heading text-2xl font-semibold text-[var(--color-ink)]">Create, save, then publish without guesswork.</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                This editor now works in two simple parts: the live preview on the right shows what you are building now, and the export cards below the editor update after you save.
              </p>
            </div>
            <div className="grid gap-2 text-sm leading-6 text-[var(--color-muted)] lg:max-w-sm">
              <p><span className="font-semibold text-[var(--color-ink)]">1.</span> Fill in the basics.</p>
              <p><span className="font-semibold text-[var(--color-ink)]">2.</span> Choose a cover or portrait image.</p>
              <p><span className="font-semibold text-[var(--color-ink)]">3.</span> Write the message people will see first.</p>
              <p><span className="font-semibold text-[var(--color-ink)]">4.</span> Save, then use the ready-made export cards below.</p>
            </div>
          </div>
        </section>

        <section className="grid gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-brand)]">Step 1</p>
            <h2 className="mt-2 font-heading text-2xl font-semibold text-[var(--color-ink)]">Post basics</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
              Title
              <input name="title" value={title} onChange={(event) => setTitle(event.target.value)} required className="studio-input" />
            </label>
            <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
              Slug
              <input name="slug" defaultValue={post?.slug ?? ""} placeholder="generated-from-title" className="studio-input" />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
              Category
              <select name="category" value={category} onChange={(event) => setCategory(event.target.value as Post["category"])} className="studio-input">
                <option value="news">News</option>
                <option value="blog">Insights</option>
                <option value="desk">Chairman&apos;s Desk</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
              Status
              <select name="editorialStatus" value={editorialStatus} onChange={(event) => setEditorialStatus(event.target.value as Post["editorialStatus"])} className="studio-input">
                <option value="draft">Draft</option>
                <option value="review">Review</option>
                <option value="published">Published</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
              Published label
              <input name="publishedAt" defaultValue={post?.publishedAt ?? ""} placeholder="March 19, 2026" className="studio-input" />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
              Kicker
              <input name="kicker" value={kicker} onChange={(event) => setKicker(event.target.value)} required className="studio-input" />
            </label>
            <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
              Scheduled publish time
              <input name="scheduledFor" type="datetime-local" value={scheduledFor} onChange={(event) => setScheduledFor(event.target.value)} className="studio-input" />
            </label>
          </div>
        </section>

        <section className="grid gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-brand)]">Step 2</p>
            <h2 className="mt-2 font-heading text-2xl font-semibold text-[var(--color-ink)]">Images and card style</h2>
          </div>

          <div className="grid gap-4 rounded-[1.5rem] border border-[var(--color-line)] bg-[var(--color-surface)] p-5 md:grid-cols-[1fr_1.2fr]">
            <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
              Card template
              <select
                name="socialCardTemplate"
                value={socialCardTemplate}
                onChange={(event) => setSocialCardTemplate(event.target.value as SocialCardTemplate)}
                className="studio-input"
              >
                <option value="campaign">Campaign</option>
                <option value="portrait">Portrait</option>
                <option value="statement">Statement</option>
              </select>
            </label>
            <div className="rounded-[1.1rem] bg-white px-4 py-4 text-sm leading-7 text-[var(--color-muted)]">
              <p className="font-semibold text-[var(--color-ink)]">Selected template</p>
              <p className="mt-2">{templateDescriptions[socialCardTemplate]}</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
              Cover image path
              <input name="coverImage" value={coverImage} onChange={(event) => setCoverImage(event.target.value)} placeholder="/media/news-cover.svg" className="studio-input" />
            </label>
            <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
              Cover alt text
              <input name="coverAlt" value={coverAlt} onChange={(event) => setCoverAlt(event.target.value)} placeholder="Describe the cover image" className="studio-input" />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
              Portrait image path
              <input name="portraitImage" value={portraitImage} onChange={(event) => setPortraitImage(event.target.value)} placeholder="/uploads/portraits/elly.jpg" className="studio-input" />
            </label>
            <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
              Portrait alt text
              <input name="portraitAlt" value={portraitAlt} onChange={(event) => setPortraitAlt(event.target.value)} placeholder="Describe the portrait photo" className="studio-input" />
            </label>
          </div>

          <div className="rounded-[1.5rem] border border-dashed border-[var(--color-line)] bg-[var(--color-surface)] p-5">
            <div>
              <p className="text-sm font-semibold text-[var(--color-ink)]">Upload inside this editor</p>
              <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">Pick a photo here and it will go straight into your media library. For news and insight posts it becomes the cover immediately, while Desk posts can lean on portrait-led cards instead.</p>
            </div>
            <div className="mt-4 grid gap-4">
              <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
                Select image
                <input ref={fileInputRef} name="file" type="file" accept="image/png,image/jpeg,image/webp,image/gif" className="studio-input file:mr-4 file:rounded-full file:border-0 file:bg-[var(--color-brand)] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white" />
              </label>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
                  Asset title
                  <input ref={titleInputRef} name="uploadTitle" placeholder="Post cover title" className="studio-input" />
                </label>
                <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
                  Alt text
                  <input ref={altInputRef} name="uploadAlt" placeholder="Describe the image" className="studio-input" />
                </label>
              </div>
              <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
                Description
                <textarea ref={descriptionInputRef} name="uploadDescription" rows={2} placeholder="Optional note for your media library" className="studio-input min-h-20" />
              </label>
              {uploadMessage ? (
                <p className="rounded-[1rem] bg-white px-4 py-3 text-sm text-[var(--color-brand)]">{uploadMessage}</p>
              ) : null}
              <button type="button" onClick={handleInlineUpload} disabled={isUploading} className="w-fit rounded-full border border-[var(--color-brand)] bg-white px-5 py-3 text-sm font-semibold text-[var(--color-brand)] disabled:opacity-60">
                {isUploading ? "Uploading..." : "Upload image"}
              </button>
            </div>
          </div>

          {editorMediaItems.length ? (
            <div className="grid gap-3">
              <p className="text-sm font-medium text-[var(--color-ink)]">Quick asset picker</p>
              <p className="text-sm leading-6 text-[var(--color-muted)]">Tap one of these and it fills the image field for you. No need to paste paths every time.</p>
              <div className="grid gap-3 md:grid-cols-2">
                {editorMediaItems.slice(0, 6).map((item) => (
                  <article key={`${item.src}-${item.title}`} className="rounded-[1rem] border border-[var(--color-line)] bg-[var(--color-surface)] p-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-14 w-20 overflow-hidden rounded-[0.8rem] bg-white">
                        <Image src={item.src ?? "/media/news-cover.svg"} alt={item.alt ?? item.title} fill className="object-contain" sizes="80px" />
                      </div>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-[var(--color-ink)]">{item.title}</span>
                        <span className="block text-xs uppercase tracking-[0.16em] text-[var(--color-muted)]">Apply image quickly</span>
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setCoverImage(item.src ?? "");
                          setCoverAlt(item.alt ?? item.title);
                        }}
                        className="rounded-full border border-[var(--color-line)] bg-white px-3 py-2 text-xs font-semibold text-[var(--color-brand)] transition hover:border-[var(--color-brand)]"
                      >
                        Use as cover
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setPortraitImage(item.src ?? "");
                          setPortraitAlt(item.alt ?? item.title);
                        }}
                        className="rounded-full border border-[var(--color-line)] bg-white px-3 py-2 text-xs font-semibold text-[var(--color-brand)] transition hover:border-[var(--color-brand)]"
                      >
                        Use as portrait
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : null}
        </section>

        <section className="grid gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-brand)]">Step 3</p>
            <h2 className="mt-2 font-heading text-2xl font-semibold text-[var(--color-ink)]">Message and social copy</h2>
          </div>

          <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
            Summary
            <textarea name="summary" value={summary} onChange={(event) => setSummary(event.target.value)} required rows={3} className="studio-input min-h-28" />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
              Social hook
              <textarea name="socialHook" value={socialHook} onChange={(event) => setSocialHook(event.target.value)} required rows={3} className="studio-input min-h-24" />
            </label>
            <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
              Share caption
              <textarea name="shareCaption" value={shareCaption} onChange={(event) => setShareCaption(event.target.value)} required rows={3} className="studio-input min-h-24" />
            </label>
          </div>

          <details className="rounded-[1.5rem] border border-[var(--color-line)] bg-[var(--color-surface)] p-5" open>
            <summary className="cursor-pointer list-none text-sm font-semibold text-[var(--color-ink)]">
              Platform-specific card text
            </summary>
            <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">Leave any field empty if you want that platform to reuse the main social hook.</p>
            <div className="mt-4 grid gap-4">
              <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
                Instagram quote
                <textarea name="platformCopyInstagram" value={platformCopyInstagram} onChange={(event) => setPlatformCopyInstagram(event.target.value)} rows={2} className="studio-input min-h-24" />
              </label>
              <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
                X quote
                <textarea name="platformCopyX" value={platformCopyX} onChange={(event) => setPlatformCopyX(event.target.value)} rows={2} className="studio-input min-h-24" />
              </label>
              <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
                LinkedIn quote
                <textarea name="platformCopyLinkedIn" value={platformCopyLinkedIn} onChange={(event) => setPlatformCopyLinkedIn(event.target.value)} rows={3} className="studio-input min-h-28" />
              </label>
            </div>
          </details>
        </section>

        <section className="grid gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-brand)]">Step 4</p>
            <h2 className="mt-2 font-heading text-2xl font-semibold text-[var(--color-ink)]">Publishing details</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
              Audience
              <input name="audience" defaultValue={post?.audience ?? ""} required className="studio-input" />
            </label>
            <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
              Tags
              <input name="tags" defaultValue={post?.tags.join(", ") ?? ""} placeholder="Leadership, Innovation" className="studio-input" />
            </label>
          </div>

          <details className="rounded-[1.5rem] border border-[var(--color-line)] bg-[var(--color-surface)] p-5">
            <summary className="cursor-pointer list-none text-sm font-semibold text-[var(--color-ink)]">
              Advanced distribution fields
            </summary>
            <div className="mt-4 grid gap-4">
              <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
                Distribution channels
                <input name="distributionChannels" defaultValue={post?.distributionChannels.join(", ") ?? ""} placeholder="Website, WhatsApp, LinkedIn" className="studio-input" />
              </label>
            </div>
          </details>

          <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
            Body
            <textarea name="body" defaultValue={post?.body.join("\n\n") ?? ""} required rows={12} className="studio-input min-h-72" />
          </label>

          <label className="flex items-center gap-3 text-sm font-medium text-[var(--color-ink)]">
            <input type="checkbox" name="featured" defaultChecked={post?.featured ?? false} />
            Feature this post on the homepage
          </label>
        </section>

        {state.message ? (
          <p className="rounded-[1rem] bg-rose-50 px-4 py-3 text-sm text-rose-700">{state.message}</p>
        ) : null}

        <div className="flex flex-col gap-3 rounded-[1.4rem] border border-[var(--color-line)] bg-[var(--color-surface)] p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-6 text-[var(--color-muted)]">After you save, scroll below this editor to open or download the final export cards.</p>
          <button type="submit" disabled={pending} className="rounded-full bg-[var(--color-brand)] px-5 py-3 text-sm font-semibold text-white disabled:opacity-60">
            {pending ? "Saving..." : post ? "Save Changes" : "Create Post"}
          </button>
        </div>
      </form>

      <div className="grid gap-6 xl:sticky xl:top-24 xl:self-start">
        <article className="rounded-[2rem] border border-[var(--color-line)] bg-white p-6 shadow-[0_14px_40px_rgba(10,61,98,0.08)]">
          <div className="flex flex-wrap items-center gap-3">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${getStatusTone(editorialStatus)}`}>
              {editorialStatus}
            </span>
            <span className="rounded-full border border-[var(--color-line)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand)]">
              {getCategoryLabel(category)}
            </span>
            <span className="rounded-full border border-[var(--color-line)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
              {socialCardTemplate}
            </span>
          </div>
          <h3 className="mt-5 font-heading text-2xl font-semibold text-[var(--color-ink)]">Live editing preview</h3>
          <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">These preview blocks update as you type. The download-ready cards underneath the editor update after save.</p>
          <div className="mt-5 grid gap-3 text-sm leading-7 text-[var(--color-muted)]">
            <p><span className="font-semibold text-[var(--color-ink)]">Route:</span> {routeLabel}</p>
            <p><span className="font-semibold text-[var(--color-ink)]">Schedule:</span> {scheduledFor ? formatScheduleLabel(scheduledFor) : "No scheduled publish time yet."}</p>
          </div>
        </article>

        <article className="overflow-hidden rounded-[2rem] border border-[var(--color-line)] bg-white shadow-[0_14px_40px_rgba(10,61,98,0.08)]">
          <div className="relative aspect-[16/10] w-full bg-[var(--color-soft)]">
            <Image src={previewImage} alt={previewAlt} fill className="object-contain" sizes="(max-width: 1280px) 100vw, 420px" />
          </div>
          <div className="border-t border-[var(--color-line)] p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-brand)]">Cover preview</p>
            <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">This is the main article visual for insights and news content.</p>
          </div>
        </article>

        <article className="overflow-hidden rounded-[2rem] border border-[var(--color-line)] bg-white shadow-[0_14px_40px_rgba(10,61,98,0.08)]">
          <div className="grid gap-0 md:grid-cols-[0.88fr_1.12fr]">
            <div className="relative min-h-[280px] bg-[var(--color-soft)]">
              <Image src={portraitPreviewImage} alt={portraitPreviewAlt} fill className="object-cover object-top" sizes="(max-width: 1280px) 100vw, 240px" />
            </div>
            <div className="flex flex-col justify-between bg-[linear-gradient(160deg,_#0a3d62,_#0b4d7b)] p-5 text-white">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/68">Chairman.Official Credentials</p>
                <h3 className="mt-4 font-heading text-3xl font-semibold leading-tight text-white">{title || "Your title will appear here"}</h3>
                <p className="mt-4 text-xs uppercase tracking-[0.2em] text-white/60">{kicker || "Kicker"}</p>
              </div>
              <div className="mt-6 rounded-[1.25rem] bg-white/10 p-4 text-sm leading-7 text-white/84">
                <p>{socialHook || summary || "A short quote or hook will appear here as you type."}</p>
              </div>
            </div>
          </div>
        </article>

        <article className="rounded-[2rem] border border-[var(--color-line)] bg-white p-5 shadow-[0_14px_40px_rgba(10,61,98,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-brand)]">Live card wording</p>
          <div className="mt-4 grid gap-4">
            {livePlatforms.map((platform) => (
              <div key={platform.id} className="overflow-hidden rounded-[1.4rem] border border-[var(--color-line)] bg-[var(--color-surface)]">
                <div className="relative bg-[linear-gradient(145deg,_#0a3d62,_#0d517f)] px-5 py-5 text-white">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.18),_transparent_32%)]" />
                  <div className="relative flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/72">{platform.label}</p>
                      <span className="rounded-full border border-white/16 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80">{platform.ratio}</span>
                    </div>
                    <div className="grid gap-2">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/62">{kicker || getCategoryLabel(category)}</p>
                      <h3 className="font-heading text-xl font-semibold leading-tight text-white">{title || "Your post title will appear here"}</h3>
                      <p className="text-sm leading-7 text-white/84">&ldquo;{liveCopy[platform.id] || "Your platform-specific quote will appear here."}&rdquo;</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </article>

        {deleteAction ? (
          <form action={deleteAction} className="rounded-[2rem] border border-rose-200 bg-white p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-rose-600">Danger zone</p>
            <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">Deleting a post removes it from the studio and the public site immediately.</p>
            <button type="submit" className="mt-6 rounded-full bg-rose-600 px-5 py-3 text-sm font-semibold text-white">Delete Post</button>
          </form>
        ) : null}
      </div>
    </div>
  );
}





