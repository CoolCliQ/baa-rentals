export const site = {
  name: "Bay Area Car Rentals",
  area: "Webster / Clear Lake, TX",
  hub: "Webster Hub",
  address: {
    street: "301 W Bay Area Blvd",
    cityLine: "Webster, Texas 77598",
    full: "301 W Bay Area Blvd, Webster, TX 77598",
  },
  mapsUrl: "https://maps.google.com/?q=301+W+Bay+Area+Blvd,+Webster,+TX+77598",
  phone: {
    display: "+1 (281) 733-0057",
    href: "tel:+12817330057",
  },
  hours: {
    monSat: "7:30 AM – 8:00 PM",
    sun: "9:00 AM – 6:00 PM",
  },
  serviceAreas: [
    "Clear Lake",
    "NASA JSC Corridor",
    "Baybrook Hub",
    "League City Express",
  ],
} as const

export const navItems = [
  { id: "fleet", label: "Vehicles" },
  { id: "booking", label: "Rates" },
  { id: "how-it-works", label: "Reserve" },
  { id: "hub", label: "Hub" },
] as const

export type SectionId = (typeof navItems)[number]["id"]
