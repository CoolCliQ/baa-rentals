"use client"

import { useEffect, useState } from "react"
import { Calculator, CalendarDays, Car, Store, type LucideIcon } from "lucide-react"
import { cn } from "cn"

import { navItems, type SectionId } from "@/lib/site"

const icons: Record<SectionId, LucideIcon> = {
  fleet: Car,
  booking: Calculator,
  "how-it-works": CalendarDays,
  hub: Store,
}

export function MobileTabBar() {
  const [active, setActive] = useState<SectionId>("fleet")

  useEffect(() => {
    // Highlight whichever section currently crosses the middle of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId)
        }
      },
      { rootMargin: "-50% 0px -50% 0px" }
    )
    for (const item of navItems) {
      const section = document.getElementById(item.id)
      if (section) observer.observe(section)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      aria-label="Sections"
      className="fixed bottom-0 z-50 w-full bg-surface/90 pb-[env(safe-area-inset-bottom,0px)] shadow-[0_-2px_12px_rgba(0,0,0,0.06)] backdrop-blur-xl lg:hidden"
    >
      <div className="grid h-20 grid-cols-4 items-center px-1">
        {navItems.map((item) => {
          const Icon = icons[item.id]
          const current = active === item.id
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={current ? "true" : undefined}
              className={cn(
                "flex h-14 w-full flex-col items-center justify-center gap-0.5 transition-colors",
                current
                  ? "font-bold text-primary"
                  : "text-on-surface-variant hover:text-on-surface"
              )}
            >
              <Icon className="size-6" aria-hidden />
              <span className={cn("text-label-md", current && "font-bold")}>
                {item.label}
              </span>
            </a>
          )
        })}
      </div>
    </nav>
  )
}
