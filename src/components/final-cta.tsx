import { Phone } from "lucide-react"
import { cn } from "cn"

import { CallLink, LeadButton } from "@/components/cta"
import { container } from "@/components/eyebrow"
import { buttonVariants } from "@/components/ui/button"

export function FinalCta() {
  return (
    <section className={container}>
      <div className="relative overflow-hidden rounded-[2rem] bg-navy px-6 py-14 text-center md:px-12 md:py-20">
        <div
          className="absolute -top-24 -right-24 size-64 rounded-full bg-sun/15 blur-2xl"
          aria-hidden
        />
        <h2 className="relative mx-auto max-w-xl text-3xl font-bold tracking-tight text-white md:text-5xl">
          Tell us when. We&apos;ll find your car.
        </h2>
        <p className="relative mx-auto mt-4 max-w-md text-[17px] text-white/70">
          Share your dates and we&apos;ll call to confirm the car and price.
        </p>
        <div className="relative mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <LeadButton source="final" label="Book a Car" size="cta-lg" arrow />
          <CallLink
            source="final"
            className={cn(buttonVariants({ variant: "outline-light", size: "cta-lg" }))}
          >
            <Phone aria-hidden />
            Call Us
          </CallLink>
        </div>
      </div>
    </section>
  )
}
