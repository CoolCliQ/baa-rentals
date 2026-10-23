import Image from "next/image"

import { LeadButton } from "@/components/cta"
import { Eyebrow, container } from "@/components/eyebrow"
import { categories } from "@/lib/rental"

export function Categories() {
  return (
    <section id="cars" className="scroll-mt-16 bg-canvas py-20 md:py-28">
      <div className={container}>
        <Eyebrow>Our cars</Eyebrow>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy md:text-4xl">
          A car for every trip.
        </h2>
        <p className="mt-3 max-w-lg text-[17px] text-ink-muted">
          Pick a style. We&apos;ll match the right car and confirm availability.
        </p>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <li
              key={category.id}
              className="flex flex-col overflow-hidden rounded-3xl border border-line bg-white"
            >
              <div className="relative aspect-[4/3] bg-canvas">
                <Image
                  src={category.image.src}
                  alt={category.image.alt}
                  fill
                  sizes="(min-width: 1024px) 270px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-bold text-navy">{category.name}</h3>
                <p className="mt-1 text-[15px] text-ink-muted">{category.blurb}</p>
                <LeadButton
                  source="category"
                  label="Check Availability"
                  preference={category.name}
                  variant="outline-navy"
                  className="mt-5 w-full"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
