"use client"

import { useRef, useState, type FormEvent } from "react"
import { Select as SelectPrimitive } from "@base-ui/react/select"
import { format } from "date-fns"
import { CarFront, ChevronDown, CircleCheck, Loader2, Phone } from "lucide-react"
import { cn } from "cn"

import {
  DateField,
  DurationField,
  Field,
  TimeField,
  fieldControlClass,
} from "@/components/lead/fields"
import type { LeadDraft } from "@/components/lead/lead-provider"
import { buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem } from "@/components/ui/select"
import { track } from "@/lib/analytics"
import { carPreferences } from "@/lib/rental"
import { site } from "@/lib/site"

// Netlify detects the "lead" form from public/__forms.html at deploy time and
// accepts URL-encoded POSTs to it. Submissions land in Netlify > Forms and are
// emailed to the addresses set under Forms > Form notifications.
const LEAD_ENDPOINT = "/__forms.html"
const FORM_NAME = "lead"

type Errors = Partial<Record<"name" | "phone" | "date" | "duration", string>>
type Status = "idle" | "sending" | "success" | "error"

function validate(draft: LeadDraft): Errors {
  const errors: Errors = {}
  if (draft.name.trim().length < 2) errors.name = "Please enter your name."
  const digits = draft.phone.replace(/\D/g, "")
  if (digits.length < 10 || digits.length > 15) errors.phone = "Please enter a valid mobile number."
  if (!draft.date) errors.date = "Please choose a pickup date."
  if (!draft.duration) errors.duration = "Please choose how long you need the car."
  return errors
}

type LeadDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  formKey: number
  source: string
  initialPreference: string
  draft: LeadDraft
  updateDraft: (patch: Partial<LeadDraft>) => void
}

export function LeadDialog({ open, onOpenChange, formKey, ...formProps }: LeadDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100dvh-1.5rem)] gap-0 overflow-y-auto rounded-3xl p-6 sm:max-w-md sm:p-8 max-sm:top-auto max-sm:bottom-0 max-sm:max-w-full max-sm:translate-y-0 max-sm:rounded-b-none">
        {/* Remount per open so each visit starts fresh (contact details persist in the draft). */}
        <LeadForm key={formKey} onDone={() => onOpenChange(false)} {...formProps} />
      </DialogContent>
    </Dialog>
  )
}

function LeadForm({
  source,
  initialPreference,
  draft,
  updateDraft,
  onDone,
}: Omit<LeadDialogProps, "open" | "onOpenChange" | "formKey"> & { onDone: () => void }) {
  const [preference, setPreference] = useState(initialPreference)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>("idle")
  const [botField, setBotField] = useState("")
  const started = useRef(false)

  const change = (patch: Partial<LeadDraft>) => {
    if (!started.current) {
      started.current = true
      track("form_start", { cta_location: source })
    }
    updateDraft(patch)
    setErrors((prev) => {
      const next = { ...prev }
      for (const key of Object.keys(patch)) delete next[key as keyof Errors]
      return next
    })
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const found = validate(draft)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    setStatus("sending")
    const body = new URLSearchParams({
      "form-name": FORM_NAME,
      "bot-field": botField,
      name: draft.name.trim(),
      phone: draft.phone.trim(),
      pickup_date: draft.date ? format(draft.date, "EEE, MMM d, yyyy") : "",
      pickup_time: draft.time,
      duration: draft.duration ?? "",
      car_preference: preference,
      source,
    })
    try {
      const response = await fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      })
      if (!response.ok) throw new Error(`Lead submission failed: ${response.status}`)
      setStatus("success")
      track("generate_lead", {
        cta_location: source,
        duration: draft.duration,
        car_preference: preference,
      })
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    const firstName = draft.name.trim().split(/\s+/)[0]
    return (
      <div className="flex flex-col items-center py-4 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-sun-50">
          <CircleCheck className="size-8 text-navy" aria-hidden />
        </div>
        <DialogTitle className="mt-5 text-2xl font-bold tracking-tight text-navy">
          Thanks, {firstName}!
        </DialogTitle>
        <DialogDescription className="mt-2 max-w-xs text-[15px] text-ink-muted">
          We&apos;ve got your request. Our team will call you at{" "}
          <span className="font-semibold text-navy">{draft.phone.trim()}</span> shortly to confirm
          your car and price.
        </DialogDescription>
        <button
          type="button"
          onClick={onDone}
          className={cn(buttonVariants({ variant: "navy", size: "cta" }), "mt-7 w-full")}
        >
          Done
        </button>
      </div>
    )
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col">
      <DialogHeader className="gap-1.5 pr-6">
        <DialogTitle className="text-2xl font-bold tracking-tight text-navy">
          Get your quote
        </DialogTitle>
        <DialogDescription className="text-[15px] text-ink-muted">
          Tell us when and how long. We&apos;ll call to confirm the car and price.
        </DialogDescription>
      </DialogHeader>

      {/* Honeypot for bots; Netlify drops submissions that fill it in. */}
      <p className="hidden">
        <label>
          Leave this empty
          <input
            name="bot-field"
            tabIndex={-1}
            autoComplete="off"
            value={botField}
            onChange={(e) => setBotField(e.target.value)}
          />
        </label>
      </p>

      <div className="mt-6 flex flex-col gap-4">
        <Field id="lead-name" label="Your name" error={errors.name}>
          <input
            id="lead-name"
            name="name"
            autoComplete="name"
            value={draft.name}
            onChange={(e) => change({ name: e.target.value })}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "lead-name-error" : undefined}
            className={cn(fieldControlClass, "placeholder:text-ink-muted")}
            placeholder="Full name"
          />
        </Field>
        <Field id="lead-phone" label="Mobile number" error={errors.phone}>
          <input
            id="lead-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={draft.phone}
            onChange={(e) => change({ phone: e.target.value })}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? "lead-phone-error" : undefined}
            className={cn(fieldControlClass, "placeholder:text-ink-muted")}
            placeholder="(281) 555-0123"
          />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <DateField
            id="lead-date"
            value={draft.date}
            onChange={(date) => change({ date })}
            error={errors.date}
          />
          <TimeField id="lead-time" value={draft.time} onChange={(time) => change({ time })} />
        </div>
        <DurationField
          id="lead-duration"
          value={draft.duration}
          onChange={(duration) => change({ duration })}
          error={errors.duration}
        />
        <Field id="lead-preference" label="Car preference" optional>
          <Select value={preference} onValueChange={(next) => next && setPreference(next)}>
            <SelectPrimitive.Trigger id="lead-preference" className={fieldControlClass}>
              <CarFront className="size-[18px] shrink-0 text-navy-600" aria-hidden />
              <SelectPrimitive.Value className="min-w-0 flex-1 truncate" />
              <ChevronDown className="hidden size-4 shrink-0 text-ink-muted sm:block" aria-hidden />
            </SelectPrimitive.Trigger>
            <SelectContent alignItemWithTrigger={false} align="start">
              {carPreferences.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>

      {status === "error" && (
        <p role="alert" className="mt-5 rounded-xl bg-destructive/8 px-4 py-3 text-[14px] text-destructive">
          We couldn&apos;t send your request. Please try again or call us at{" "}
          <a href={site.phone.href} className="font-semibold underline">
            {site.phone.display}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className={cn(buttonVariants({ variant: "accent", size: "cta-lg" }), "mt-6 w-full")}
      >
        {status === "sending" ? (
          <>
            <Loader2 className="animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          "Get My Quote"
        )}
      </button>
      <a
        href={site.phone.href}
        onClick={() => track("phone_click", { cta_location: "lead_form" })}
        className="mt-4 inline-flex items-center justify-center gap-2 text-[14px] font-medium text-ink-muted hover:text-navy"
      >
        <Phone className="size-4" aria-hidden />
        Prefer to talk? Call {site.phone.display}
      </a>
    </form>
  )
}
