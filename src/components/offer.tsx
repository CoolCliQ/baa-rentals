import { BadgePercent } from "lucide-react"

import { LeadButton } from "@/components/cta"
import { container } from "@/components/eyebrow"

export function Offer() {
  return (
    <section className={`${container} pt-20 md:pt-28`}>
      <div className="flex flex-col gap-6 rounded-3xl bg-sun-50 p-7 md:flex-row md:items-center md:justify-between md:p-10">
        <div className="flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-sun">
            <BadgePercent className="size-6 text-navy" aria-hidden />
          </div>
          <div>
            <h2 className="text-xl font-bold text-navy md:text-2xl">
              Save 15% on 4+ hour and multi-day rentals
            </h2>
            <p className="mt-1 text-[15px] text-ink-muted">For NASA JSC and Kemah visitors.</p>
          </div>
        </div>
        <LeadButton source="offer" label="Claim Offer" variant="navy" arrow className="self-start md:self-auto" />
      </div>
    </section>
  )
}
