export const site = {
  name: "DriveIt Rental Cars",
  shortName: "DriveIt",
  domain: "rentdriveit.com",
  url: "https://rentdriveit.com",
  area: "Houston Bay Area",
  address: {
    street: "301 W Bay Area Blvd",
    cityLine: "Webster, TX 77598",
    full: "301 W Bay Area Blvd, Webster, TX 77598",
  },
  mapsUrl: "https://maps.google.com/?q=301+W+Bay+Area+Blvd,+Webster,+TX+77598",
  phone: {
    display: "+1 (346) 447-5400",
    href: "tel:+13464475400",
  },
  hours: {
    monSat: "7:30 AM – 8:00 PM",
    sun: "9:00 AM – 6:00 PM",
  },
  serviceAreas: ["Webster", "Clear Lake", "NASA JSC", "League City", "Kemah"],
} as const

export const navItems = [
  { id: "why", label: "Why DriveIt" },
  { id: "cars", label: "Cars" },
  { id: "location", label: "Location" },
] as const
