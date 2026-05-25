export default function Loading() {
  return (
    <main className="min-h-screen bg-[var(--color-surface)] px-6 py-10 text-[var(--color-ink)] lg:px-10">
      <div className="mx-auto w-full max-w-7xl animate-pulse rounded-[2rem] border border-[var(--color-line)] bg-white p-8 shadow-[0_14px_40px_rgba(10,61,98,0.08)]">
        <div className="h-3 w-36 rounded bg-[var(--color-soft)]" />
        <div className="mt-5 h-10 w-2/3 rounded bg-[var(--color-soft)]" />
        <div className="mt-4 h-4 w-1/2 rounded bg-[var(--color-soft)]" />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div className="h-56 rounded-[1.4rem] bg-[var(--color-surface)]" />
          <div className="h-56 rounded-[1.4rem] bg-[var(--color-surface)]" />
          <div className="h-56 rounded-[1.4rem] bg-[var(--color-surface)]" />
        </div>
      </div>
    </main>
  );
}
