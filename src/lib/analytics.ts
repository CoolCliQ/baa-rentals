// Conversion tracking. Every event goes to the GTM dataLayer (GA4 is configured
// in GTM). The Google Ads lead conversion fires via gtag on generate_lead, and
// the Meta Pixel gets Lead/Contact when it is loaded.

type Params = Record<string, string | number | undefined>

type TrackingWindow = Window & {
  dataLayer?: Record<string, unknown>[]
  gtag?: (...args: unknown[]) => void
  fbq?: (...args: unknown[]) => void
}

export type TrackEvent =
  | "cta_click" // Book a Car, Get a Quote, Check Availability, Claim Offer...
  | "phone_click"
  | "form_open"
  | "form_start"
  | "generate_lead" // primary conversion: lead form submitted successfully

const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID
const adsLeadLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL
// Value Google Ads records per lead (from the conversion action's tag).
const LEAD_CONVERSION = { value: 1.0, currency: "USD" }

export function track(event: TrackEvent, params: Params = {}) {
  if (typeof window === "undefined") return
  const w = window as TrackingWindow

  w.dataLayer = w.dataLayer ?? []
  w.dataLayer.push({ event, ...params })

  if (event === "generate_lead") {
    if (adsId && adsLeadLabel) {
      w.gtag?.("event", "conversion", { send_to: `${adsId}/${adsLeadLabel}`, ...LEAD_CONVERSION })
    }
    w.fbq?.("track", "Lead", params)
  } else if (event === "phone_click") {
    w.fbq?.("track", "Contact")
  }
}
