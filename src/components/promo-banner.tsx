import Image from "next/image"
import { ArrowRight, MapPinned } from "lucide-react"

import { cn } from "cn"

import { buttonVariants } from "@/components/ui/button"

export function PromoBanner() {
  return (
    <div className="relative w-full overflow-hidden rounded-card bg-inverse-surface p-4 text-inverse-on-surface shadow-lg lg:p-10">
      <Image
        src="/images/promo.jpg"
        alt=""
        fill
        sizes="(min-width: 1280px) 1216px, 100vw"
        className="object-cover opacity-30 mix-blend-overlay"
      />
      <div className="relative z-10 flex flex-col gap-1 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="flex flex-col gap-1 lg:gap-2">
          <div className="inline-flex items-center gap-1 text-label-caps tracking-wide text-secondary-fixed">
            <MapPinned className="size-3.5" aria-hidden />
            NASA JSC • KEMAH • HOUSTON
          </div>
          <h3 className="text-headline-sm leading-snug tracking-tight text-on-primary lg:text-headline-lg">
            Visiting NASA Johnson Space Center or Kemah Boardwalk?
          </h3>
          <p className="text-body-sm text-surface-container-highest lg:text-body-lg">
            Enjoy 15% off any 4+ hour or multi-day rental. Pick up in under 3
            minutes right on Bay Area Blvd.
          </p>
        </div>
        <div className="shrink-0 pt-1 lg:pt-0">
          <a
            href="#booking"
            className={cn(buttonVariants({
              variant: "amber",
              size: "pill",
              className: "text-[14px]/5 tracking-[0.01em] lg:px-6 lg:py-3",
            }))}
          >
            <span>Claim 15% Local Discount</span>
            <ArrowRight aria-hidden />
          </a>
        </div>
      </div>
    </div>
  )
}
