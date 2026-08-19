import Image from 'next/image'

/** Intrinsic asset dimensions (public/logo.png). Aspect ratio 3:2. */
const LOGO_WIDTH = 300
const LOGO_HEIGHT = 200

const variants = {
  header: {
    className: 'h-8 w-auto sm:h-9 md:h-10',
    /** Max rendered width: 40px height × 1.5 ≈ 60px */
    sizes: '60px',
  },
  hero: {
    className: 'h-20 w-auto sm:h-28 md:h-36 lg:h-44 xl:h-48 2xl:h-50',
    /**
     * Width at each breakpoint (height × 1.5), capped at source width (300px).
     * 2xl uses h-50 (200px) → 300px wide, 1:1 with the asset.
     */
    sizes:
      '(max-width: 640px) 120px, (max-width: 768px) 168px, (max-width: 1024px) 216px, (max-width: 1280px) 264px, 300px',
  },
} as const

type AwinelLogoProps = {
  className?: string
  priority?: boolean
  size?: keyof typeof variants
}

export function AwinelLogo({ className, priority = false, size = 'hero' }: AwinelLogoProps) {
  const variant = variants[size]

  return (
    <Image
      alt="Awinel"
      className={`${variant.className} shrink-0 ${className ?? ''}`}
      height={LOGO_HEIGHT}
      priority={priority}
      quality={90}
      sizes={variant.sizes}
      src="/logo.png"
      width={LOGO_WIDTH}
    />
  )
}
