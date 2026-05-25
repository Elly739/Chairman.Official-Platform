import type { Post } from "@/lib/content";
import type { EventCardConcept } from "@/lib/event-card-concepts";
import { EventCardPreview } from "@/app/components/event-card-preview";
import { StudioPublishingChecklist } from "@/app/components/studio-publishing-checklist";

export function StudioEventCardPanel({
  post,
  event,
}: {
  post: Post;
  event: EventCardConcept;
}) {
  return (
    <section className="rounded-[2rem] border border-[var(--color-line)] bg-white p-6 shadow-[0_14px_40px_rgba(10,61,98,0.08)] lg:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-brand)]">Event Card Export</p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-[var(--color-ink)]">Open or download the ceremonial event card.</h2>
        </div>
        <div className="max-w-xl text-sm leading-7 text-[var(--color-muted)]">
          <p>This export uses the dedicated event-card system rather than the regular social poster templates.</p>
          <p className="mt-2">That keeps birthdays, Christmas cards, and public holiday greetings more visual, ceremonial, and ready for same-day sharing.</p>
          <p className="mt-2 text-[var(--color-ink)]">
            Current occasion: <span className="font-semibold">{event.occasion}</span>
          </p>
        </div>
      </div>
      <StudioPublishingChecklist postSlug={post.slug} />
      <div className="mt-8">
        <EventCardPreview event={event} />
      </div>
    </section>
  );
}
