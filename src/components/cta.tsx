"use client"

import type { ComponentProps, ReactNode } from "react"
import type { VariantProps } from "class-variance-authority"
import { ArrowRight } from "lucide-react"
import { cn } from "cn"

import { useLeadForm } from "@/components/lead/lead-provider"
import { buttonVariants } from "@/components/ui/button"
import { track } from "@/lib/analytics"
import { site } from "@/lib/site"

type ButtonStyle = VariantProps<typeof buttonVariants>

// Stable, readable element IDs (e.g. "cta-hero-book-a-car") so GTM's built-in
// Click ID / Click Element variables identify which button was used.
const slug = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")

/** Any "Book a Car / Get a Quote / Check Availability" button: opens the lead form. */
export function LeadButton({
  source,
  label,
  preference,
  variant = "accent",
  size = "cta",
  arrow,
  className,
  id,
}: {
  id?: string
  source: string
  label: string
  preference?: string
  arrow?: boolean
  className?: string
} & ButtonStyle) {
  const { openLeadForm } = useLeadForm()
  return (
    <button
      type="button"
      id={id ?? ["cta", source, preference, label].filter(Boolean).map((v) => slug(v!)).join("-")}
      onClick={() => openLeadForm({ source, label, preference })}
      className={cn(buttonVariants({ variant, size }), className)}
    >
      {label}
      {arrow && <ArrowRight aria-hidden />}
    </button>
  )
}

/** A tap-to-call link that records the click. */
export function CallLink({
  source,
  className,
  children,
  ...props
}: { source: string; children: ReactNode } & Omit<ComponentProps<"a">, "href">) {
  return (
    <a
      id={`call-${slug(source)}`}
      href={site.phone.href}
      onClick={() => track("phone_click", { cta_location: source })}
      className={className}
      {...props}
    >
      {children}
    </a>
  )
}
