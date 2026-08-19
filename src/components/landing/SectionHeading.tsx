export function SectionHeading({ children, id }: { children: string; id: string }) {
  return (
    <div className="flex items-center gap-3">
      <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-500" />
      <h2
        className="font-mono text-xs uppercase tracking-[0.25em] text-muted animate-fade-in animate-duration-700 animate-fill-mode-both motion-reduce:animate-none"
        id={id}
      >
        {children}
      </h2>
    </div>
  )
}
