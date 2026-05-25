"use client";

import Image from "next/image";
import { useActionState, useState } from "react";
import { saveProject } from "@/app/studio/actions";
import type { MediaItem, Project } from "@/lib/content";

const initialState = {
  message: "",
};

export function StudioProjectEditorForm({ project, mediaItems = [] }: { project: Project; mediaItems?: MediaItem[] }) {
  const [state, formAction, pending] = useActionState(saveProject, initialState);
  const [coverImage, setCoverImage] = useState(project.coverImage ?? "");
  const [coverAlt, setCoverAlt] = useState(project.coverAlt ?? "");
  const previewImage = coverImage || "/media/project-cover.svg";
  const previewAlt = coverAlt || project.name;

  return (
    <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
      <form action={formAction} className="grid gap-6 rounded-[2rem] border border-[var(--color-line)] bg-white p-8 shadow-[0_14px_40px_rgba(10,61,98,0.08)]">
        <input type="hidden" name="originalSlug" value={project.slug} />
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
            Project name
            <input name="name" defaultValue={project.name} required className="studio-input" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
            Slug
            <input name="slug" defaultValue={project.slug} required className="studio-input" />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
            Owner
            <input name="owner" defaultValue={project.owner} required className="studio-input" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
            Operational status
            <input name="status" defaultValue={project.status} required className="studio-input" />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
            Editorial status
            <select name="editorialStatus" defaultValue={project.editorialStatus} className="studio-input">
              <option value="backlog">Backlog</option>
              <option value="active">Active</option>
              <option value="ready">Ready</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
            Next update
            <input name="nextUpdate" defaultValue={project.nextUpdate} required className="studio-input" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
            Timeline
            <input name="timeline" defaultValue={project.timeline} required className="studio-input" />
          </label>
        </div>

        <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
          Repository URL
          <input name="repoUrl" defaultValue={project.repoUrl ?? ""} placeholder="https://github.com/Elly739/..." className="studio-input" />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
            Cover image path
            <input name="coverImage" value={coverImage} onChange={(event) => setCoverImage(event.target.value)} placeholder="/media/project-cover.svg" className="studio-input" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
            Cover image alt text
            <input name="coverAlt" value={coverAlt} onChange={(event) => setCoverAlt(event.target.value)} placeholder="Describe the project cover" className="studio-input" />
          </label>
        </div>

        {mediaItems.length ? (
          <div className="grid gap-3">
            <p className="text-sm font-medium text-[var(--color-ink)]">Quick asset picker</p>
            <div className="grid gap-3 md:grid-cols-2">
              {mediaItems.slice(0, 6).map((item) => (
                <button
                  key={`${item.src}-${item.title}`}
                  type="button"
                  onClick={() => {
                    setCoverImage(item.src ?? "");
                    setCoverAlt(item.alt ?? item.title);
                  }}
                  className="flex items-center gap-3 rounded-[1rem] border border-[var(--color-line)] bg-[var(--color-surface)] p-3 text-left transition hover:border-[var(--color-brand)]"
                >
                  <div className="relative h-14 w-20 overflow-hidden rounded-[0.8rem] bg-white">
                    <Image src={item.src ?? "/media/project-cover.svg"} alt={item.alt ?? item.title} fill className="object-cover" sizes="80px" />
                  </div>
                  <span>
                    <span className="block text-sm font-semibold text-[var(--color-ink)]">{item.title}</span>
                    <span className="block text-xs uppercase tracking-[0.16em] text-[var(--color-muted)]">Use asset</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
          Summary
          <textarea name="summary" defaultValue={project.summary} required rows={3} className="studio-input min-h-28" />
        </label>

        <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
          Impact framing
          <textarea name="impact" defaultValue={project.impact} required rows={4} className="studio-input min-h-32" />
        </label>

        <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
          Highlights
          <textarea
            name="highlights"
            defaultValue={project.highlights.join("\n")}
            required
            rows={8}
            className="studio-input min-h-48"
          />
        </label>

        {state.message ? (
          <p className="rounded-[1rem] bg-rose-50 px-4 py-3 text-sm text-rose-700">{state.message}</p>
        ) : null}

        <button type="submit" disabled={pending} className="rounded-full bg-[var(--color-brand)] px-5 py-3 text-sm font-semibold text-white disabled:opacity-60">
          {pending ? "Saving..." : "Save Project Changes"}
        </button>
      </form>

      <div className="grid gap-6">
        <article className="overflow-hidden rounded-[2rem] border border-[var(--color-line)] bg-white">
          <div className="relative aspect-[16/10] w-full bg-[var(--color-soft)]">
            <Image src={previewImage} alt={previewAlt} fill className="object-cover" sizes="(max-width: 1280px) 100vw, 420px" />
          </div>
          <div className="p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-brand)]">Cover preview</p>
            <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
              Choose from uploaded assets below the cover fields or paste a local path if you need something custom.
            </p>
          </div>
        </article>
        <article className="rounded-[2rem] bg-[var(--color-brand)] p-8 text-white">
          <p className="text-xs uppercase tracking-[0.2em] text-white/70">Editor guidance</p>
          <div className="mt-5 grid gap-3 text-sm leading-7 text-white/82">
            <p>Use one highlight per line so the public project page stays easy to scan.</p>
            <p>Keep the impact framing narrative and measurable where possible.</p>
            <p>Use the editorial status to signal whether the project page is ready for public promotion.</p>
          </div>
        </article>
        <article className="rounded-[2rem] border border-[var(--color-line)] bg-white p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-brand)]">Visibility reminder</p>
          <div className="mt-5 grid gap-3 text-sm leading-7 text-[var(--color-muted)]">
            <p>Saving here updates the live project detail page.</p>
            <p>The homepage project cards now reflect the project cover, summary, and status together.</p>
            <p>Add the repository URL so visitors can move from the story page into the actual build.</p>
          </div>
        </article>
      </div>
    </div>
  );
}
