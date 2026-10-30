// Hands a just-submitted lead from the form to the /thank-you page. Kept in
// sessionStorage (never the URL) so no contact details end up in analytics.

export const THANK_YOU_PATH = "/thank-you"

const LEAD_KEY = "driveit:lead"
const PENDING_EVENT_KEY = "driveit:lead-event"

export type LeadConfirmation = {
  firstName: string
  phone: string
  pickupDate: string
  pickupTime: string
  duration: string
  carPreference: string
  source: string
}

export function saveLeadConfirmation(lead: LeadConfirmation) {
  try {
    sessionStorage.setItem(LEAD_KEY, JSON.stringify(lead))
    // The conversion event fires once on /thank-you, not again on refresh.
    sessionStorage.setItem(
      PENDING_EVENT_KEY,
      JSON.stringify({
        cta_location: lead.source,
        duration: lead.duration,
        car_preference: lead.carPreference,
      })
    )
  } catch {
    // Storage unavailable: the thank-you page falls back to a generic message.
  }
}

export function readLeadConfirmation(): string | null {
  try {
    return sessionStorage.getItem(LEAD_KEY)
  } catch {
    return null
  }
}

/** Returns the pending conversion event's params once, then clears them. */
export function takePendingLeadEvent(): Record<string, string> | null {
  try {
    const raw = sessionStorage.getItem(PENDING_EVENT_KEY)
    if (!raw) return null
    sessionStorage.removeItem(PENDING_EVENT_KEY)
    return JSON.parse(raw)
  } catch {
    return null
  }
}
