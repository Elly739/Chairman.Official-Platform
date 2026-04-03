import { EventCardPreview } from "../../components/event-card-preview";
import { StudioMediaManager } from "../../components/studio-media-manager";
import { StudioShell } from "../../components/studio-shell";
import { requireStudioAuth } from "@/lib/studio-auth";
import { getAllMediaItems, getAllProjects, getAllStudioPosts } from "@/lib/content";
import { eventCardConcepts } from "@/lib/event-card-concepts";

export default async function StudioMediaPage() {
  await requireStudioAuth("/studio/media");
  const mediaItems = getAllMediaItems();
  const projects = getAllProjects();
  const upcomingStories = getAllStudioPosts().filter((post) => post.editorialStatus !== "published" || post.scheduledFor);

  return (
    <StudioShell
      title="Media board"
      intro="Use this space to upload assets, keep reusable visuals organized, and package special-event cards without exposing unfinished work on the public site."
    >
      <StudioMediaManager initialMediaItems={mediaItems} draftPosts={upcomingStories} projects={projects} />

      <section className="mt-8 rounded-[2rem] border border-[var(--color-line)] bg-white p-8 shadow-[0_14px_40px_rgba(10,61,98,0.08)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-brand)]">Event greetings</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold text-[var(--color-ink)]">Occasion cards stay here until you are happy with them.</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[var(--color-muted)]">
            This is your private workshop for Eid, Christmas, birthday, and campaign-style greeting cards. Review, open, and download them here before anything appears publicly.
          </p>
        </div>

        <div className="mt-8 rounded-[1.5rem] bg-[linear-gradient(135deg,_rgba(10,61,98,0.06),_rgba(200,155,60,0.08))] p-5 text-sm leading-7 text-[var(--color-muted)]">
          Keep using this section for visual experiments and same-day greeting exports. The public media page now stays clean and only shows published-facing media content.
        </div>

        <div className="mt-8 grid gap-8 xl:grid-cols-3">
          {eventCardConcepts.map((event) => (
            <EventCardPreview key={event.slug} event={event} />
          ))}
        </div>
      </section>
    </StudioShell>
  );
}
