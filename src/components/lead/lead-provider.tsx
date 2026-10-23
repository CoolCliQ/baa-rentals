"use client"

import { createContext, useCallback, useContext, useState, type ReactNode } from "react"

import { LeadDialog } from "@/components/lead/lead-dialog"
import { track } from "@/lib/analytics"
import { NO_PREFERENCE } from "@/lib/rental"

// What the visitor has told us so far. Shared by the quick selector and the form.
export type LeadDraft = {
  date?: Date
  time: string
  duration?: string
  name: string
  phone: string
}

type OpenOptions = {
  /** Where the CTA lives, e.g. "hero" or "category" — sent with the lead and to analytics. */
  source: string
  /** The CTA's visible label, for click tracking. */
  label: string
  preference?: string
}

type LeadContextValue = {
  draft: LeadDraft
  updateDraft: (patch: Partial<LeadDraft>) => void
  openLeadForm: (options: OpenOptions) => void
}

const LeadContext = createContext<LeadContextValue | null>(null)

export function useLeadForm() {
  const value = useContext(LeadContext)
  if (!value) throw new Error("useLeadForm must be used inside <LeadProvider>")
  return value
}

export function LeadProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<LeadDraft>({ time: "10:00 AM", name: "", phone: "" })
  const [dialog, setDialog] = useState({
    open: false,
    openId: 0,
    source: "",
    preference: NO_PREFERENCE,
  })

  const updateDraft = useCallback(
    (patch: Partial<LeadDraft>) => setDraft((prev) => ({ ...prev, ...patch })),
    []
  )

  const openLeadForm = useCallback(({ source, label, preference }: OpenOptions) => {
    track("cta_click", { cta_label: label, cta_location: source })
    track("form_open", { cta_location: source })
    setDialog((prev) => ({
      open: true,
      openId: prev.openId + 1,
      source,
      preference: preference ?? NO_PREFERENCE,
    }))
  }, [])

  return (
    <LeadContext value={{ draft, updateDraft, openLeadForm }}>
      {children}
      <LeadDialog
        open={dialog.open}
        onOpenChange={(open) => setDialog((prev) => ({ ...prev, open }))}
        formKey={dialog.openId}
        source={dialog.source}
        initialPreference={dialog.preference}
        draft={draft}
        updateDraft={updateDraft}
      />
    </LeadContext>
  )
}
