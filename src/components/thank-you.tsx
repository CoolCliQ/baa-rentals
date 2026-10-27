"use client"

import { useEffect, useSyncExternalStore } from "react"
import Link from "next/link"
import { CircleCheck, Phone } from "lucide-react"
import { cn } from "cn"

import { CallLink } from "@/components/cta"
import { container } from "@/components/eyebrow"
import { buttonVariants } from "@/components/ui/button"
import { track } from "@/lib/analytics"
import {
  readLeadConfirmation,
  takePendingLeadEvent,
  type LeadConfirmation,
} from "@/lib/lead-confirmation"

const noSubscribe = () => () => {}

function parse(raw: string | null): LeadConfirmation | null {
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function ThankYou() {
  // Read on the client only; the static HTML renders the generic message.
  const lead = parse(useSyncExternalStore(noSubscribe, readLeadConfirmation, () => null))

  useEffect(() => {
    const params = takePendingLeadEvent()
    if (params) track("generate_lead", params)
  }, [])

  const details = lead
    ? [
        { label: "Pickup", value: `${lead.pickupDate} · ${lead.pickupTime}` },
        { label: "Duration", value: lead.duration },
        { label: "Car", value: lead.carPreference },
      ]
    : []

  return (
    <section className={`${container} flex flex-1 flex-col items-center py-20 text-center md:py-28`}>
      <div className="flex size-20 items-center justify-center rounded-full bg-sun-50">
        <CircleCheck className="size-10 text-navy" aria-hidden />
      </div>
      <h1 className="mt-7 text-4xl font-extrabold tracking-tight text-navy md:text-5xl">
        {lead?.firstName ? `Thanks, ${lead.firstName}!` : "Thank you!"}
      </h1>
      <p className="mt-4 max-w-md text-lg text-ink-muted">
        We&apos;ve received your request. Our team will call you
        {lead?.phone ? (
          <>
            {" "}at <span className="font-semibold text-navy">{lead.phone}</span>
          </>
        ) : null}{" "}
        shortly to confirm your car and price.
      </p>

      {details.length > 0 && (
        <dl className="mt-10 grid w-full max-w-md gap-px overflow-hidden rounded-2xl border border-line bg-line text-left">
          {details.map((item) => (
            <div key={item.label} className="flex justify-between gap-4 bg-white px-5 py-4">
              <dt className="text-[15px] text-ink-muted">{item.label}</dt>
              <dd className="text-[15px] font-semibold text-navy">{item.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-10 flex w-full max-w-md flex-col gap-3 sm:flex-row">
        <Link href="/" className={cn(buttonVariants({ variant: "navy", size: "cta" }), "sm:flex-1")}>
          Back to home
        </Link>
        <CallLink
          source="thank_you"
          className={cn(buttonVariants({ variant: "outline-navy", size: "cta" }), "sm:flex-1")}
        >
          <Phone aria-hidden />
          Call us
        </CallLink>
      </div>
    </section>
  )
}
