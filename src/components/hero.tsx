import Image from "next/image"

import { LeadButton } from "@/components/cta"
import { Eyebrow, container } from "@/components/eyebrow"
import { site } from "@/lib/site"

export function Hero() {
  return (
    <section className={`${container} pt-10 md:pt-16`}>
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <Eyebrow>Car rentals · {site.area}</Eyebrow>
          <h1 className="mt-5 text-[2.6rem] leading-[1.05] font-extrabold tracking-tight text-navy md:text-6xl">
            Your car, ready <br className="hidden sm:block" />
            when you are.
          </h1>
          <p className="mt-5 max-w-md text-lg text-ink-muted">
            Hourly, daily and weekly rentals. Tell us when, and we&apos;ll handle the rest.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <LeadButton source="hero" label="Book a Car" size="cta-lg" arrow />
            <LeadButton source="hero" label="Get a Quote" variant="outline-navy" size="cta-lg" />
          </div>
        </div>

        <div className="relative mr-3 mb-3 md:mr-5 md:mb-5">
          <div
            className="absolute -right-3 -bottom-3 h-2/3 w-2/3 rounded-[2rem] bg-sun md:-right-5 md:-bottom-5"
            aria-hidden
          />
          <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-canvas shadow-[0_30px_60px_-30px_rgba(5,31,59,0.45)]">
            <Image
              src="/images/hero.jpg"
              alt="Premium SUV driving along a coastal highway at sunset"
              fill
              priority
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
