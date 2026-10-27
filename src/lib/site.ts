export const site = {
  name: "Rent Drive Car Rentals",
  shortName: "Rent Drive",
  domain: "rentdriveit.com",
  url: "https://www.rentdriveit.com",
  area: "Houston Bay Area",
  address: {
    street: "301 W Bay Area Blvd",
    cityLine: "Webster, TX 77598",
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
  serviceAreas: ["Webster", "Clear Lake", "NASA JSC", "League City", "Kemah"],
} as const

export const navItems = [
  { id: "why", label: "Why Rent Drive" },
  { id: "cars", label: "Cars" },
  { id: "location", label: "Location" },
] as const
