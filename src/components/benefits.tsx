import { CalendarCheck, CarFront, Clock, ReceiptText } from "lucide-react"

import { LeadButton } from "@/components/cta"
import { Eyebrow, container } from "@/components/eyebrow"

const benefits = [
  { icon: CarFront, title: "Wide range of cars", body: "Sedans to 7-seaters, matched to your trip." },
  { icon: Clock, title: "Hourly, daily or weekly", body: "Rent for exactly as long as you need." },
  { icon: ReceiptText, title: "Upfront pricing", body: "We confirm your price before you drive." },
  { icon: CalendarCheck, title: "Free cancellation", body: "Cancel up to 1 hour before pickup." },
]

export function Benefits() {
  return (
    <section id="why" className={`${container} scroll-mt-24 py-20 md:py-28`}>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Eyebrow>Why Rent Drive</Eyebrow>
          <h2 className="mt-4 max-w-md text-3xl font-bold tracking-tight text-navy md:text-4xl">
            Renting a car, made simple.
          </h2>
        </div>
        <LeadButton source="benefits" label="Book Now" arrow className="self-start md:self-auto" />
      </div>

      <ul className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map(({ icon: Icon, title, body }) => (
          <li key={title}>
            <div className="flex size-12 items-center justify-center rounded-2xl bg-sun-50">
              <Icon className="size-6 text-navy" aria-hidden />
            </div>
            <h3 className="mt-5 text-lg font-bold text-navy">{title}</h3>
            <p className="mt-1.5 text-[15px] text-ink-muted">{body}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
