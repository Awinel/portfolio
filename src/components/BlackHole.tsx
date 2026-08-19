export function BlackHoleBackground({
  className,
  fixed = true,
}: {
  className?: string
  fixed?: boolean
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none -z-10 animate-iteration-count-infinite animate-pulsing animate-duration-5000 motion-reduce:animate-none ${
        fixed ? 'fixed inset-0' : 'absolute inset-0'
      } ${className ?? ''}`}
      style={{
        backgroundImage: `radial-gradient(circle at bottom, #000000 40%, #262626 55%, #000 85%)`,
      }}
    />
  )
}

export default function BlackHole({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative flex h-screen flex-col items-center overflow-hidden">
      <BlackHoleBackground fixed={false} />
      {children}
    </section>
  )
}
