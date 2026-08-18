import type { ReactNode } from 'react'

const brass =
  'bg-[linear-gradient(145deg,#c4a574_0%,#8a6a42_42%,#E6B67B_78%,#a88855_100%)] border border-[#3d2e1a]'

function CornerDot({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      className={`absolute h-2 w-2 rounded-full shadow-[inset_0_1px_1px_rgba(255,220,160,0.45),0_1px_1px_rgba(0,0,0,0.35)] ${brass} ${className}`}
    />
  )
}

export function PaperCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative border-2 border-[#d4b896] bg-[#FAF0D5] text-gray-500 ${className ?? 'p-5'}`}
    >
      <CornerDot className="left-2 top-2" />
      <CornerDot className="right-2 top-2" />
      <CornerDot className="bottom-2 left-2" />
      <CornerDot className="bottom-2 right-2" />
      {children}
    </div>
  )
}
