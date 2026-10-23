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

/** Any "Book a Car / Get a Quote / Check Availability" button: opens the lead form. */
export function LeadButton({
  source,
  label,
  preference,
  variant = "accent",
  size = "cta",
  arrow,
  className,
}: {
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
      href={site.phone.href}
      onClick={() => track("phone_click", { cta_location: source })}
      className={className}
      {...props}
    >
      {children}
    </a>
  )
}
