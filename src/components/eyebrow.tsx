import type { ReactNode } from "react"
import { cn } from "cn"

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2.5 text-[13px] font-semibold tracking-[0.14em] text-navy-600 uppercase",
        className
      )}
    >
      <span className="h-0.5 w-6 rounded-full bg-sun" aria-hidden />
      {children}
    </p>
  )
}

export const container = "mx-auto w-full max-w-6xl px-5 md:px-8"
