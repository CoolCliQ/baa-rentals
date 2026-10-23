import Image from "next/image"
import { Clock, MapPin, Navigation } from "lucide-react"
import { cn } from "cn"

import { LeadButton } from "@/components/cta"
import { Eyebrow, container } from "@/components/eyebrow"
import { buttonVariants } from "@/components/ui/button"
import { site } from "@/lib/site"

export function Location() {
  return (
    <section id="location" className={`${container} scroll-mt-16 py-20 md:py-28`}>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <Eyebrow>Pickup location</Eyebrow>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy md:text-4xl">
            Minutes from NASA JSC.
          </h2>
          <ul className="mt-8 flex flex-col gap-4 text-[15px] text-ink-muted">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-navy" aria-hidden />
              <span>
                <span className="font-semibold text-navy">{site.address.street}</span>
                <br />
                {site.address.cityLine}
              </span>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 size-5 shrink-0 text-navy" aria-hidden />
              <span>
                Mon–Sat {site.hours.monSat}
                <br />
                Sun {site.hours.sun}
              </span>
            </li>
          </ul>
          <p className="mt-6 text-[15px] text-ink-muted">
            Serving {site.serviceAreas.slice(0, -1).join(", ")} and {site.serviceAreas.at(-1)}.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <LeadButton source="location" label="Book a Car" arrow />
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline-navy", size: "cta" }))}
            >
              <Navigation aria-hidden />
              Get Directions
            </a>
          </div>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-line bg-canvas">
          <Image
            src="/images/map.png"
            alt={`Map of the area around ${site.address.full}`}
            fill
            sizes="(min-width: 1024px) 520px, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}
