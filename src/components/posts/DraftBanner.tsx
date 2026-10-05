export function DraftBanner() {
  return (
    <div
      className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-sm border border-amber-400/30 bg-amber-400/5 px-4 py-2.5"
      role="status"
    >
      <span className="font-mono text-xs uppercase tracking-[0.25em] text-amber-200">
        Draft preview
      </span>
      <a
        className="font-body text-sm text-zinc-300 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-400"
        href="/next/exit-preview"
      >
        Exit preview
      </a>
    </div>
  )
}
