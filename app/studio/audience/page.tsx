import { StudioShell } from "../../components/studio-shell";
import { removeInquiry, removeSubscriber, setInquiryHandled } from "../actions";
import { readAudienceStore } from "@/lib/audience-store";
import { requireStudioAuth } from "@/lib/studio-auth";

export default async function StudioAudiencePage() {
  await requireStudioAuth("/studio/audience");
  const audience = readAudienceStore();
  const openInquiries = audience.inquiries.filter((inquiry) => !inquiry.handled);
  const handledInquiries = audience.inquiries.filter((inquiry) => inquiry.handled);
  const latestInquiry = openInquiries[0] ?? handledInquiries[0];
  const latestSubscriber = audience.subscribers[0];

  return (
    <StudioShell
      title="Audience inbox"
      intro="Use this page like a lightweight response desk: see who reached out, who subscribed, and mark items handled once you have dealt with them."
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-[1.75rem] bg-[var(--color-brand)] p-6 text-white">
          <p className="text-xs uppercase tracking-[0.2em] text-white/68">Open messages</p>
          <p className="mt-5 font-heading text-5xl font-bold">{openInquiries.length}</p>
        </article>
        <article className="rounded-[1.75rem] border border-[var(--color-line)] bg-white p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">Handled</p>
          <p className="mt-5 font-heading text-5xl font-bold text-[var(--color-ink)]">{handledInquiries.length}</p>
        </article>
        <article className="rounded-[1.75rem] border border-[var(--color-line)] bg-white p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">Subscribers</p>
          <p className="mt-5 font-heading text-5xl font-bold text-[var(--color-ink)]">{audience.subscribers.length}</p>
        </article>
        <article className="rounded-[1.75rem] border border-[var(--color-line)] bg-white p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">Latest signal</p>
          <p className="mt-5 text-sm leading-7 text-[var(--color-muted)]">
            {latestInquiry
              ? `${latestInquiry.name} is the latest message.`
              : latestSubscriber
                ? `${latestSubscriber.email} is the latest subscriber.`
                : "No audience activity yet."}
          </p>
        </article>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <article className="rounded-[2rem] bg-[linear-gradient(145deg,_#0a3d62,_#0d517f)] p-8 text-white shadow-[0_20px_60px_rgba(10,61,98,0.18)]">
          <p className="text-xs uppercase tracking-[0.2em] text-white/68">What to do first</p>
          <h2 className="mt-6 font-heading text-3xl font-semibold">
            {openInquiries[0] ? `Reply to ${openInquiries[0].name} first.` : latestSubscriber ? "Review your newest subscriber." : "The inbox is quiet right now."}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-white/78">
            {openInquiries[0]
              ? openInquiries[0].message
              : latestSubscriber
                ? `${latestSubscriber.email} joined from ${latestSubscriber.source}.`
                : "Once people use the contact form or subscribe from the site, the most recent activity will surface here automatically."}
          </p>
          {openInquiries[0] ? (
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`mailto:${openInquiries[0].email}?subject=${encodeURIComponent(`Re: ${openInquiries[0].subject}`)}`} className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--color-brand)]">
                Reply by email
              </a>
            </div>
          ) : null}
        </article>

        <article className="rounded-[2rem] border border-[var(--color-line)] bg-white p-8 shadow-[0_14px_40px_rgba(10,61,98,0.08)]">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-brand)]">Simple meaning</p>
          <div className="mt-6 grid gap-4 text-sm leading-7 text-[var(--color-muted)]">
            <p><span className="font-semibold text-[var(--color-ink)]">Open messages:</span> people who still need a response.</p>
            <p><span className="font-semibold text-[var(--color-ink)]">Handled:</span> messages you have already dealt with but want to keep for now.</p>
            <p><span className="font-semibold text-[var(--color-ink)]">Subscribers:</span> people who joined the audience list from the site.</p>
          </div>
          <div className="mt-8 rounded-[1.4rem] bg-[var(--color-surface)] p-5 text-sm leading-7 text-[var(--color-muted)]">
            This is still a simple inbox, not a full CRM. The main goal is to let you clear what you have handled and keep the page focused on what matters now.
          </div>
        </article>
      </div>

      <section className="mt-8 rounded-[2rem] border border-[var(--color-line)] bg-white p-8 shadow-[0_14px_40px_rgba(10,61,98,0.08)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-brand)]">Open messages</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold text-[var(--color-ink)]">People who still need a response</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[var(--color-muted)]">
            Start with these first, then mark them handled when you are done.
          </p>
        </div>

        <div className="mt-8 grid gap-4">
          {openInquiries.length ? (
            openInquiries.map((inquiry) => {
              const handleAction = setInquiryHandled.bind(null, inquiry.id, true);
              const deleteAction = removeInquiry.bind(null, inquiry.id);

              return (
                <article key={inquiry.id} className="rounded-[1.5rem] bg-[var(--color-surface)] p-6">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-brand)]">{inquiry.subject}</p>
                      <h3 className="mt-2 font-heading text-2xl font-semibold text-[var(--color-ink)]">{inquiry.name}</h3>
                      <a href={`mailto:${inquiry.email}?subject=${encodeURIComponent(`Re: ${inquiry.subject}`)}`} className="mt-2 inline-block text-sm font-semibold text-[var(--color-brand)]">
                        {inquiry.email}
                      </a>
                    </div>
                    <div className="flex flex-col gap-3 lg:items-end">
                      <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-muted)]">{inquiry.createdAt}</p>
                      <div className="flex flex-wrap gap-2">
                        <a href={`mailto:${inquiry.email}?subject=${encodeURIComponent(`Re: ${inquiry.subject}`)}`} className="rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-sm font-semibold text-[var(--color-brand)]">
                          Reply
                        </a>
                        <form action={handleAction}>
                          <button type="submit" className="rounded-full bg-[var(--color-brand)] px-4 py-2 text-sm font-semibold text-white">
                            Mark handled
                          </button>
                        </form>
                        <form action={deleteAction}>
                          <button type="submit" className="rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-rose-600">
                            Remove
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{inquiry.message}</p>
                </article>
              );
            })
          ) : (
            <p className="rounded-[1.5rem] bg-[var(--color-surface)] px-5 py-4 text-sm text-[var(--color-muted)]">
              No open messages right now.
            </p>
          )}
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] border border-[var(--color-line)] bg-white p-8 shadow-[0_14px_40px_rgba(10,61,98,0.08)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-brand)]">Handled messages</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold text-[var(--color-ink)]">Messages you have already dealt with</h2>
          </div>
        </div>

        <div className="mt-8 grid gap-4">
          {handledInquiries.length ? (
            handledInquiries.map((inquiry) => {
              const reopenAction = setInquiryHandled.bind(null, inquiry.id, false);
              const deleteAction = removeInquiry.bind(null, inquiry.id);

              return (
                <article key={inquiry.id} className="rounded-[1.5rem] bg-[var(--color-surface)] p-6">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-brand)]">{inquiry.subject}</p>
                      <h3 className="mt-2 font-heading text-2xl font-semibold text-[var(--color-ink)]">{inquiry.name}</h3>
                      <a href={`mailto:${inquiry.email}`} className="mt-2 inline-block text-sm font-semibold text-[var(--color-brand)]">
                        {inquiry.email}
                      </a>
                    </div>
                    <div className="flex flex-col gap-3 lg:items-end">
                      <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-muted)]">{inquiry.createdAt}</p>
                      <div className="flex flex-wrap gap-2">
                        <form action={reopenAction}>
                          <button type="submit" className="rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-sm font-semibold text-[var(--color-brand)]">
                            Reopen
                          </button>
                        </form>
                        <form action={deleteAction}>
                          <button type="submit" className="rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-rose-600">
                            Remove
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{inquiry.message}</p>
                </article>
              );
            })
          ) : (
            <p className="rounded-[1.5rem] bg-[var(--color-surface)] px-5 py-4 text-sm text-[var(--color-muted)]">
              No handled messages yet.
            </p>
          )}
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] border border-[var(--color-line)] bg-white p-8 shadow-[0_14px_40px_rgba(10,61,98,0.08)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-brand)]">Subscribers</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold text-[var(--color-ink)]">People following the platform</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[var(--color-muted)]">
            Remove entries here only when you truly want them off the list.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {audience.subscribers.length ? (
            audience.subscribers.map((subscriber) => {
              const deleteAction = removeSubscriber.bind(null, subscriber.id);

              return (
                <article key={subscriber.id} className="rounded-[1.5rem] bg-[var(--color-surface)] p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-heading text-xl font-semibold text-[var(--color-ink)]">{subscriber.email}</p>
                      <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">Source: {subscriber.source}</p>
                      <p className="mt-2 text-xs uppercase tracking-[0.16em] text-[var(--color-muted)]">{subscriber.createdAt}</p>
                    </div>
                    <form action={deleteAction}>
                      <button type="submit" className="rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-rose-600">
                        Remove
                      </button>
                    </form>
                  </div>
                </article>
              );
            })
          ) : (
            <p className="rounded-[1.5rem] bg-[var(--color-surface)] px-5 py-4 text-sm text-[var(--color-muted)] md:col-span-2">
              No subscribers yet.
            </p>
          )}
        </div>
      </section>
    </StudioShell>
  );
}
