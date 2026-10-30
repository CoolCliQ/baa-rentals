// Receives quote requests from the website's lead form and emails them to the
// business through Mailgun. Runs as a Netlify Function at POST /api/lead.
//
// Environment variables (set in Netlify > Site configuration > Environment
// variables; values in netlify.toml are NOT visible to functions):
//   MAILGUN_API_KEY   required  Mailgun API key
//   MAILGUN_DOMAIN    required  verified Mailgun sending domain, e.g. mg.rentdriveit.com
//   MAILGUN_REGION    optional  "us" (default) or "eu", wherever the domain was created
//   LEAD_TO_EMAIL     optional  recipient(s), comma-separated; defaults to the business inbox
//   LEAD_FROM_EMAIL   optional  sender; defaults to "Rent Drive Website <leads@MAILGUN_DOMAIN>"

const DEFAULT_TO = "driveitrentalcars@gmail.com"
const ALLOWED_HOSTS = ["rentdriveit.com", "www.rentdriveit.com", "localhost"]

type Lead = {
  name: string
  phone: string
  pickup_date: string
  pickup_time: string
  duration: string
  car_preference: string
  source: string
}

const FIELDS: { key: keyof Lead; label: string; required: boolean; max: number }[] = [
  { key: "name", label: "Name", required: true, max: 100 },
  { key: "phone", label: "Mobile", required: true, max: 30 },
  { key: "pickup_date", label: "Pickup date", required: true, max: 40 },
  { key: "pickup_time", label: "Pickup time", required: true, max: 20 },
  { key: "duration", label: "Duration", required: true, max: 30 },
  { key: "car_preference", label: "Car preference", required: false, max: 40 },
  { key: "source", label: "Form opened from", required: false, max: 40 },
]

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  })

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!)

/** Returns the cleaned lead, or an error message. */
function parseLead(input: unknown): Lead | string {
  if (!input || typeof input !== "object") return "Invalid request."
  const raw = input as Record<string, unknown>
  const lead = {} as Lead
  for (const field of FIELDS) {
    const value = typeof raw[field.key] === "string" ? (raw[field.key] as string).trim() : ""
    if (field.required && !value) return `Missing ${field.label.toLowerCase()}.`
    if (value.length > field.max) return `${field.label} is too long.`
    lead[field.key] = value
  }
  const digits = lead.phone.replace(/\D/g, "")
  if (digits.length < 10 || digits.length > 15) return "Invalid mobile number."
  return lead
}

function buildEmail(lead: Lead) {
  const rows = FIELDS.map((f) => [f.label, lead[f.key] || "—"] as const)
  const subject = `New rental enquiry: ${lead.name}, ${lead.duration} from ${lead.pickup_date}`
  const text = [
    "New rental enquiry from rentdriveit.com",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Call the customer to confirm the car and price.",
  ].join("\n")
  const tel = `tel:${lead.phone.replace(/[^\d+]/g, "")}`
  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;color:#0b1b30">
<h2 style="margin:0 0 12px;color:#051f3b">New rental enquiry</h2>
<table cellpadding="8" style="border-collapse:collapse">
${rows
  .map(
    ([label, value]) =>
      `<tr><td style="color:#5b6676;border-bottom:1px solid #e3e8ef">${label}</td><td style="font-weight:bold;border-bottom:1px solid #e3e8ef">${
        label === "Mobile"
          ? `<a href="${escapeHtml(tel)}">${escapeHtml(value)}</a>`
          : escapeHtml(value)
      }</td></tr>`
  )
  .join("\n")}
</table>
<p style="color:#5b6676">Call the customer to confirm the car and price.</p>
</div>`
  return { subject, text, html }
}

const handler = async (req: Request) => {
  if (req.method !== "POST") return json(405, { ok: false, error: "Method not allowed." })

  // Only accept submissions made from the website itself.
  const origin = req.headers.get("origin")
  if (origin) {
    let host = ""
    try {
      host = new URL(origin).hostname
    } catch {}
    if (!ALLOWED_HOSTS.includes(host) && !host.endsWith(".netlify.app")) {
      return json(403, { ok: false, error: "Forbidden." })
    }
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return json(400, { ok: false, error: "Invalid request." })
  }

  // Honeypot: real visitors never fill this hidden field. Pretend success for bots.
  if (body && typeof body === "object" && (body as Record<string, unknown>)["bot-field"]) {
    return json(200, { ok: true })
  }

  const lead = parseLead(body)
  if (typeof lead === "string") return json(400, { ok: false, error: lead })

  const apiKey = process.env.MAILGUN_API_KEY
  const domain = process.env.MAILGUN_DOMAIN
  if (!apiKey || !domain) {
    console.error("Lead not sent: MAILGUN_API_KEY or MAILGUN_DOMAIN is not set.")
    return json(500, { ok: false, error: "Email is not configured." })
  }
  const base = process.env.MAILGUN_REGION?.toLowerCase() === "eu" ? "https://api.eu.mailgun.net" : "https://api.mailgun.net"
  const to = (process.env.LEAD_TO_EMAIL || DEFAULT_TO).split(",").map((s) => s.trim()).filter(Boolean)
  const from = process.env.LEAD_FROM_EMAIL || `Rent Drive Website <leads@${domain}>`

  const { subject, text, html } = buildEmail(lead)
  const form = new FormData()
  form.append("from", from)
  for (const address of to) form.append("to", address)
  form.append("subject", subject)
  form.append("text", text)
  form.append("html", html)
  form.append("o:tag", "website-lead")

  const response = await fetch(`${base}/v3/${encodeURIComponent(domain)}/messages`, {
    method: "POST",
    headers: { Authorization: `Basic ${btoa(`api:${apiKey}`)}` },
    body: form,
  })
  if (!response.ok) {
    console.error(`Mailgun rejected the lead email: ${response.status} ${await response.text()}`)
    return json(502, { ok: false, error: "Could not send email." })
  }
  return json(200, { ok: true })
}

export default handler

export const config = { path: "/api/lead" }
