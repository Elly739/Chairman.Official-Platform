"use client";

import Image from "next/image";
import { useActionState, useMemo, useState } from "react";
import { savePosterQuick } from "@/app/studio/actions";
import { posterDesignPresets, type PosterKind } from "@/content/poster-designs";
import type { PostCategory } from "@/content/posts";
import { buildEventCardConcept, eventOccasionOptions } from "@/lib/event-card-concepts";
import { renderEventCardSvg } from "@/lib/event-card-svg";

const initialState = {
  message: "",
};

const posterKinds: Array<{
  id: PosterKind;
  label: string;
  blurb: string;
}> = [
  {
    id: "event",
    label: "Event",
    blurb: "For Eid, Christmas, birthdays, launches, and calendar moments.",
  },
  {
    id: "quote",
    label: "Quote Card",
    blurb: "For a short insight, hook, or strong public-facing line.",
  },
];

function getDestinationLabel(value: PostCategory) {
  if (value === "desk") return "Chairman's Desk";
  if (value === "blog") return "Insights";
  return "News";
}

function getPosterKindLabel(value: PosterKind) {
  return posterKinds.find((kind) => kind.id === value)?.label ?? "Poster";
}

function buildPreviewHeadline(note: string, destination: PostCategory, kind: PosterKind) {
  const cleaned = note.replace(/\s+/g, " ").trim();
  if (!cleaned) {
    if (kind === "event") return "A polished event poster preview";
    return destination === "desk" ? "Chairman's Desk quote poster" : "Insight-led quote poster";
  }

  const sentence = cleaned.split(/[.!?]/)[0]?.trim() || cleaned;
  if (sentence.length <= 68) {
    return sentence;
  }

  return `${sentence.slice(0, 65).trimEnd()}...`;
}

export function StudioPosterCreateFlow() {
  const [state, formAction, pending] = useActionState(savePosterQuick, initialState);
  const [note, setNote] = useState("");
  const [posterKind, setPosterKind] = useState<PosterKind>("quote");
  const [destination, setDestination] = useState<PostCategory>("news");
  const [eventOccasion, setEventOccasion] = useState("birthday");
  const [recipientName, setRecipientName] = useState("");

  const filteredDesigns = useMemo(
    () => posterDesignPresets.filter((preset) => preset.kind === posterKind),
    [posterKind]
  );

  const [selectedDesignId, setSelectedDesignId] = useState(
    () => posterDesignPresets.find((preset) => preset.kind === "quote")?.id ?? posterDesignPresets[0]?.id ?? ""
  );

  const selectedDesign = useMemo(
    () => filteredDesigns.find((preset) => preset.id === selectedDesignId) ?? filteredDesigns[0],
    [filteredDesigns, selectedDesignId]
  );

  const selectedOccasion = useMemo(
    () => eventOccasionOptions.find((occasion) => occasion.id === eventOccasion) ?? eventOccasionOptions[0],
    [eventOccasion]
  );

  const eventConcept = useMemo(
    () => buildEventCardConcept(eventOccasion, note, recipientName),
    [eventOccasion, note, recipientName]
  );

  const eventPreviewUrl = useMemo(() => {
    if (!eventConcept) {
      return "";
    }

    const svg = renderEventCardSvg(eventConcept);
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }, [eventConcept]);

  const previewHeadline = buildPreviewHeadline(note, destination, posterKind);

  function handlePosterKindChange(nextKind: PosterKind) {
    setPosterKind(nextKind);
    const firstDesign = posterDesignPresets.find((preset) => preset.kind === nextKind);
    if (firstDesign) {
      setSelectedDesignId(firstDesign.id);
    }
  }

  return (
    <div className="grid gap-8 2xl:grid-cols-[1.08fr_0.92fr]">
      <form
        action={formAction}
        className="grid gap-7 rounded-[2rem] border border-[var(--color-line)] bg-white p-7 shadow-[0_14px_40px_rgba(10,61,98,0.08)] xl:p-9"
      >
        <input type="hidden" name="designId" value={selectedDesign?.id ?? ""} />
        <input type="hidden" name="kind" value={posterKind} />
        <input type="hidden" name="eventOccasion" value={eventOccasion} />

        <section className="rounded-[1.7rem] border border-[var(--color-line)] bg-[var(--color-surface)] p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-brand)]">Poster workflow</p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-[var(--color-ink)]">Choose the poster type first, then the platform guides the rest.</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--color-muted)]">
            This flow is now organized the way it should feel in practice: first decide what you want to publish, then pick the ready-made design, add your note, preview it, and publish.
          </p>
          <div className="mt-6 grid gap-3 text-sm leading-6 text-[var(--color-muted)] md:grid-cols-4">
            <div className="rounded-[1rem] bg-white px-4 py-3">
              <p className="font-semibold text-[var(--color-ink)]">1. Type</p>
              <p>Event card or quote card.</p>
            </div>
            <div className="rounded-[1rem] bg-white px-4 py-3">
              <p className="font-semibold text-[var(--color-ink)]">2. Design</p>
              <p>Select the design with its built-in visual.</p>
            </div>
            <div className="rounded-[1rem] bg-white px-4 py-3">
              <p className="font-semibold text-[var(--color-ink)]">3. Note</p>
              <p>Write the exact message for the poster.</p>
            </div>
            <div className="rounded-[1rem] bg-white px-4 py-3">
              <p className="font-semibold text-[var(--color-ink)]">4. Publish</p>
              <p>Preview it and send it to the right section.</p>
            </div>
          </div>
        </section>

        <section className="grid gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-brand)]">Step 1</p>
            <h2 className="mt-2 font-heading text-2xl font-semibold text-[var(--color-ink)]">What are you publishing?</h2>
          </div>
          <div className="grid gap-4 xl:grid-cols-3">
            {posterKinds.map((kind) => {
              const isSelected = kind.id === posterKind;

              return (
                <button
                  key={kind.id}
                  type="button"
                  onClick={() => handlePosterKindChange(kind.id)}
                  className={`rounded-[1.5rem] border p-5 text-left transition ${
                    isSelected
                      ? "border-[var(--color-brand)] bg-[var(--color-surface)] shadow-[0_10px_30px_rgba(10,61,98,0.10)]"
                      : "border-[var(--color-line)] bg-white hover:border-[var(--color-brand)]/50"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-heading text-xl font-semibold text-[var(--color-ink)]">{kind.label}</p>
                    {isSelected ? (
                      <span className="rounded-full bg-[var(--color-brand)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                        Selected
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{kind.blurb}</p>
                </button>
              );
            })}
          </div>
        </section>

        {posterKind === "event" ? (
          <section className="grid gap-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-brand)]">Step 2</p>
              <h2 className="mt-2 font-heading text-2xl font-semibold text-[var(--color-ink)]">Choose the event occasion</h2>
            </div>
            <div className="grid gap-4 xl:grid-cols-2">
              {eventOccasionOptions.map((occasion) => {
                const isSelected = occasion.id === eventOccasion;

                return (
                  <button
                    key={occasion.id}
                    type="button"
                    onClick={() => setEventOccasion(occasion.id)}
                    className={`rounded-[1.5rem] border p-5 text-left transition ${
                      isSelected
                        ? "border-[var(--color-brand)] bg-[var(--color-surface)] shadow-[0_10px_30px_rgba(10,61,98,0.10)]"
                        : "border-[var(--color-line)] bg-white hover:border-[var(--color-brand)]/50"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-heading text-xl font-semibold text-[var(--color-ink)]">{occasion.occasion}</p>
                      {isSelected ? (
                        <span className="rounded-full bg-[var(--color-brand)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                          Selected
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{occasion.defaultMessage}</p>
                  </button>
                );
              })}
            </div>
            {selectedOccasion?.requiresRecipient ? (
              <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
                Name of the person you are wishing
                <input
                  name="recipientName"
                  value={recipientName}
                  onChange={(event) => setRecipientName(event.target.value)}
                  required={selectedOccasion.requiresRecipient}
                  placeholder="Enter the person's name"
                  className="studio-input"
                />
              </label>
            ) : (
              <input type="hidden" name="recipientName" value="" />
            )}
          </section>
        ) : null}

        {posterKind !== "event" ? (
          <section className="grid gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-brand)]">Step 2</p>
            <h2 className="mt-2 font-heading text-2xl font-semibold text-[var(--color-ink)]">Choose a design</h2>
          </div>
          <div className="grid gap-5 xl:grid-cols-2">
            {filteredDesigns.map((preset) => {
              const isSelected = preset.id === selectedDesign?.id;

              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setSelectedDesignId(preset.id)}
                  className={`grid gap-4 rounded-[1.6rem] border p-4 text-left transition ${
                    isSelected
                      ? "border-[var(--color-brand)] bg-[var(--color-surface)] shadow-[0_10px_30px_rgba(10,61,98,0.10)]"
                      : "border-[var(--color-line)] bg-white hover:border-[var(--color-brand)]/50"
                  }`}
                >
                  <div className="relative aspect-[5/4] overflow-hidden rounded-[1.2rem] bg-[var(--color-soft)]">
                    <Image src={preset.previewImage} alt={preset.previewAlt} fill className="object-cover object-top" sizes="(max-width: 1536px) 100vw, 420px" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,23,40,0.04),rgba(7,23,40,0.62))]" />
                    <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                      <p className="text-[11px] uppercase tracking-[0.22em] text-white/70">{getDestinationLabel(preset.recommendedFor)}</p>
                      <p className="mt-2 font-heading text-xl font-semibold">{preset.label}</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-base font-semibold text-[var(--color-ink)]">{preset.label}</p>
                      {isSelected ? (
                        <span className="rounded-full bg-[var(--color-brand)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                          Selected
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">{preset.blurb}</p>
                  </div>
                </button>
              );
            })}
          </div>
          </section>
        ) : null}

        <section className="grid gap-5 xl:grid-cols-[1.08fr_0.92fr]">
          <div className="grid gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-brand)]">{posterKind === "event" ? "Step 3" : "Step 3"}</p>
              <h2 className="mt-2 font-heading text-2xl font-semibold text-[var(--color-ink)]">
                {posterKind === "event" ? "Write the greeting message" : "Write the poster note"}
              </h2>
            </div>
            <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
              {posterKind === "event" ? "Message that appears on the event card" : "Note that appears on the poster"}
              <textarea
                name="note"
                value={note}
                onChange={(event) => setNote(event.target.value)}
                rows={8}
                required
                placeholder={
                  posterKind === "event"
                    ? "Write the ceremonial greeting or message that should appear on the card."
                    : "Write the exact message you want people to see on the poster."
                }
                className="studio-input min-h-52"
              />
            </label>
            <p className="text-sm leading-6 text-[var(--color-muted)]">
              {posterKind === "event"
                ? "This message becomes the main greeting on the exported card. Event cards use the ceremonial design system and do not carry your personal photo."
                : "This note becomes the main public-facing message on the poster and also helps create the published entry behind it."}
            </p>
          </div>

          <div className="grid gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-brand)]">{posterKind === "event" ? "Step 4" : "Step 4"}</p>
              <h2 className="mt-2 font-heading text-2xl font-semibold text-[var(--color-ink)]">Preview and publish</h2>
            </div>
            <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
              Publish this poster under
              <select
                name="destination"
                value={destination}
                onChange={(event) => setDestination(event.target.value as PostCategory)}
                className="studio-input"
              >
                <option value="news">News</option>
                <option value="blog">Insights</option>
                <option value="desk">Chairman&apos;s Desk</option>
              </select>
            </label>

            <div className="rounded-[1.4rem] border border-[var(--color-line)] bg-[var(--color-surface)] p-4 text-sm leading-7 text-[var(--color-muted)]">
              <p>
                This <span className="font-semibold text-[var(--color-ink)]">{getPosterKindLabel(posterKind).toLowerCase()}</span> will publish to{" "}
                <span className="font-semibold text-[var(--color-ink)]">{getDestinationLabel(destination)}</span> and then open inside poster studio, where you can download the final platform cards.
              </p>
            </div>

            {state.message ? (
              <p className="rounded-[1rem] bg-rose-50 px-4 py-3 text-sm text-rose-700">{state.message}</p>
            ) : null}

            <div className="flex flex-col gap-3 rounded-[1.4rem] border border-[var(--color-line)] bg-white p-4">
              <p className="text-sm leading-6 text-[var(--color-muted)]">
                The platform will generate the saved entry, route, and exportable poster cards for you.
              </p>
              <button
                type="submit"
                disabled={pending || !selectedDesign}
                className="w-full rounded-full bg-[var(--color-brand)] px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
              >
                {pending ? "Publishing..." : `Publish ${getPosterKindLabel(posterKind)}`}
              </button>
            </div>
          </div>
        </section>
      </form>

      <div className="grid gap-6 2xl:sticky 2xl:top-24 2xl:self-start">
        <article className="rounded-[2rem] border border-[var(--color-line)] bg-white p-6 shadow-[0_14px_40px_rgba(10,61,98,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-brand)]">Live preview</p>
          <h3 className="mt-3 font-heading text-2xl font-semibold text-[var(--color-ink)]">This is how the poster direction feels before you publish.</h3>
          <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
            You do not need to manually place the image. The selected design already carries that visual treatment and the note is layered into the poster style automatically.
          </p>
        </article>

        {selectedDesign ? (
          posterKind === "event" && eventPreviewUrl ? (
            <article className="overflow-hidden rounded-[2rem] border border-[var(--color-line)] bg-white shadow-[0_14px_40px_rgba(10,61,98,0.08)]">
              <div className="relative aspect-square bg-[var(--color-soft)]">
                <Image src={eventPreviewUrl} alt={`${selectedOccasion?.occasion ?? "Event"} card preview`} fill unoptimized className="object-cover" sizes="(max-width: 1536px) 100vw, 640px" />
              </div>
              <div className="border-t border-[var(--color-line)] p-5 text-sm leading-7 text-[var(--color-muted)]">
                <p>
                  Event cards use the ceremonial Chairman.Official event-card style, not the portrait poster style. This keeps birthdays, Christmas, and Kenyan public holiday cards cleaner and more appropriate.
                </p>
              </div>
            </article>
          ) : (
            <article className="overflow-hidden rounded-[2rem] border border-[var(--color-line)] bg-white shadow-[0_14px_40px_rgba(10,61,98,0.08)]">
              <div className="relative aspect-[4/5] bg-[var(--color-soft)]">
                <Image src={selectedDesign.previewImage} alt={selectedDesign.previewAlt} fill className="object-cover object-top" sizes="(max-width: 1536px) 100vw, 640px" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,33,56,0.18),rgba(8,33,56,0.82))]" />
                <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-white/72">Chairman.Official</p>
                      <p className="mt-2 text-[11px] uppercase tracking-[0.24em] text-white/60">
                        {getPosterKindLabel(posterKind)} • {getDestinationLabel(destination)}
                      </p>
                    </div>
                    <span className="rounded-full border border-white/18 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/78">
                      {selectedDesign.template}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="max-h-[58%] max-w-[92%] overflow-hidden rounded-[1.2rem] bg-[rgba(10,61,98,0.72)] p-5 backdrop-blur-sm">
                      <p className="text-[11px] uppercase tracking-[0.22em] text-white/64">Poster note preview</p>
                      <h3 className="mt-3 font-heading text-2xl font-semibold leading-tight text-white">
                        {note ? note.split(/[.!?]/)[0]?.trim() || note.slice(0, 68) : previewHeadline}
                      </h3>
                      <p className="mt-4 break-words text-base leading-7 text-white/88">
                        {note || "Your note will appear here once you start typing. Keep it clear, public-facing, and strong enough to stand on its own."}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.2em] text-white/70">
                      <span>Thought Leadership. Innovation. Impact.</span>
                      <span>chairman.official</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          )
        ) : null}
      </div>
    </div>
  );
}
