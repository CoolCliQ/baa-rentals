"use client"

import { ArrowRight } from "lucide-react"
import { cn } from "cn"

import { container } from "@/components/eyebrow"
import { DateField, DurationField, TimeField } from "@/components/lead/fields"
import { useLeadForm } from "@/components/lead/lead-provider"
import { buttonVariants } from "@/components/ui/button"

export function RentalSelector() {
  const { draft, updateDraft, openLeadForm } = useLeadForm()

  return (
    <section aria-labelledby="selector-title" className={`${container} mt-14 md:mt-20`}>
      <div className="rounded-[1.75rem] border border-line bg-white p-5 shadow-[0_24px_60px_-32px_rgba(5,31,59,0.35)] md:p-7">
        <h2 id="selector-title" className="text-lg font-bold text-navy md:text-xl">
          When do you need the car?
        </h2>
        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-[1.1fr_0.9fr_1.1fr_auto] md:items-end md:gap-4">
          <DateField id="selector-date" value={draft.date} onChange={(date) => updateDraft({ date })} />
          <TimeField id="selector-time" value={draft.time} onChange={(time) => updateDraft({ time })} />
          <div className="col-span-2 md:col-span-1">
            <DurationField
              id="selector-duration"
              value={draft.duration}
              onChange={(duration) => updateDraft({ duration })}
            />
          </div>
          <button
            type="button"
            onClick={() => openLeadForm({ source: "selector", label: "Get My Quote" })}
            className={cn(
              buttonVariants({ variant: "accent", size: "cta" }),
              "col-span-2 w-full md:col-span-1 md:w-auto"
            )}
          >
            Get My Quote
            <ArrowRight aria-hidden />
          </button>
        </div>
      </div>
    </section>
  )
}
