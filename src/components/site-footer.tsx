import { Clock, MapPin } from "lucide-react"

import { site } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="mx-1 mt-10 rounded-t-card bg-surface-container-low px-4 py-6 lg:mx-0 lg:mt-16 lg:px-0 lg:py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="size-[22px] shrink-0 text-primary" aria-hidden />
            <div>
              <h2 className="text-headline-sm text-on-surface">{site.hub}</h2>
              <p className="text-body-sm text-on-surface-variant">
                {site.address.full}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="size-5 shrink-0 text-secondary" aria-hidden />
            <p className="text-body-sm text-on-surface-variant">
              Mon – Sat: {site.hours.monSat} | Sun: {site.hours.sun}
            </p>
          </div>
          <ul className="flex flex-wrap gap-1 pt-1 lg:pt-0">
            {site.serviceAreas.map((area) => (
              <li
                key={area}
                className="rounded-full bg-surface-container px-2.5 py-1 text-label-caps text-on-surface"
              >
                {area}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-between pt-1 lg:border-t lg:border-surface-container-highest lg:pt-4">
          <span className="text-[11px] text-on-surface-variant">
            © {site.name}. Webster, TX.
          </span>
          <span className="text-[10px] font-bold tracking-wide text-primary">
            HOUSTON SOUTH BAY
          </span>
        </div>
      </div>
    </footer>
  )
}
