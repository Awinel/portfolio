const metal =
  'bg-[linear-gradient(145deg,#c4a574_0%,#8a6a42_42%,#5c4528_78%,#a88855_100%)] border border-[#3d2e1a]'

export function Lever({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <div className="relative h-44 w-20">
        {/* Vertical housing / track */}
        <div
          className={`absolute left-1/2 top-3 h-36 w-8 -translate-x-1/2 rounded-sm shadow-[inset_0_2px_4px_rgba(255,220,160,0.2),inset_0_-3px_6px_rgba(0,0,0,0.45)] ${metal}`}
        />
        <div className="absolute left-1/2 top-5 h-[8.25rem] w-3.5 -translate-x-1/2 rounded-sm bg-gray-950 shadow-[inset_0_0_6px_rgba(0,0,0,0.8)]" />

        {/* Housing rivets */}
        <div
          className={`absolute left-[22%] top-5 h-2.5 w-2.5 rounded-full shadow-[inset_0_1px_1px_rgba(255,220,160,0.35)] ${metal}`}
        />
        <div
          className={`absolute right-[22%] top-5 h-2.5 w-2.5 rounded-full shadow-[inset_0_1px_1px_rgba(255,220,160,0.35)] ${metal}`}
        />
        <div
          className={`absolute left-[22%] bottom-12 h-2.5 w-2.5 rounded-full shadow-[inset_0_1px_1px_rgba(255,220,160,0.35)] ${metal}`}
        />
        <div
          className={`absolute right-[22%] bottom-12 h-2.5 w-2.5 rounded-full shadow-[inset_0_1px_1px_rgba(255,220,160,0.35)] ${metal}`}
        />

        {/* Base bracket */}
        <div
          className={`absolute bottom-0 left-1/2 h-9 w-16 -translate-x-1/2 rounded-sm shadow-[inset_0_2px_3px_rgba(255,220,160,0.25),0_2px_4px_rgba(0,0,0,0.5)] ${metal}`}
        />
        <div
          className={`absolute bottom-2.5 left-[16%] h-2.5 w-2.5 rounded-full shadow-[inset_0_1px_1px_rgba(255,220,160,0.4)] ${metal}`}
        />
        <div
          className={`absolute bottom-2.5 right-[16%] h-2.5 w-2.5 rounded-full shadow-[inset_0_1px_1px_rgba(255,220,160,0.4)] ${metal}`}
        />

        {/* Sliding throw — moves up and down in the slot */}
        <div className="absolute left-1/2 top-6 -translate-x-1/2 animate-lever">
          {/* Crossbar through the slot */}
          <div
            className={`absolute left-1/2 top-3 h-3 w-11 -translate-x-1/2 rounded-sm shadow-[inset_0_1px_2px_rgba(255,220,160,0.3),0_1px_3px_rgba(0,0,0,0.45)] ${metal}`}
          />

          {/* Lever arm extending to the handle */}
          <div
            className={`absolute left-[calc(50%+1.1rem)] top-2.5 h-2.5 w-10 rounded-sm shadow-[inset_0_1px_1px_rgba(255,220,160,0.25)] ${metal}`}
          />

          {/* Handle knob */}
          <div
            className={`absolute left-[calc(50%+2.6rem)] top-0.5 h-7 w-7 rounded-full shadow-[inset_0_2px_3px_rgba(255,220,160,0.4),0_2px_4px_rgba(0,0,0,0.45)] ${metal}`}
          />
          <div
            className={`absolute left-[calc(50%+2.95rem)] top-1.5 h-3.5 w-3.5 rounded-full shadow-[inset_0_1px_2px_rgba(255,220,160,0.5)] ${metal}`}
          />
        </div>
      </div>
    </div>
  )
}
