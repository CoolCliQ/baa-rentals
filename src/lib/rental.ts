export const durationGroups = [
  { label: "Hours", options: ["2 hours", "4 hours", "8 hours", "12 hours"] },
  { label: "Days", options: ["1 day", "2 days", "3 days", "5 days"] },
  { label: "Weeks", options: ["1 week", "2 weeks", "1 month"] },
] as const

// Pick-up slots every 30 minutes, 7:30 AM through 7:30 PM.
export const timeSlots = Array.from({ length: 25 }, (_, i) => {
  const minutes = 7 * 60 + 30 + i * 30
  const hour = Math.floor(minutes / 60)
  return `${hour % 12 || 12}:${minutes % 60 === 0 ? "00" : "30"} ${hour < 12 ? "AM" : "PM"}`
})

export const categories = [
  {
    id: "sedan",
    name: "Sedan",
    blurb: "Easy, efficient everyday drives",
    image: { src: "/images/sedan.jpg", alt: "White sedan in a bright studio" },
  },
  {
    id: "suv",
    name: "SUV",
    blurb: "Room and confidence for any road",
    image: { src: "/images/suv.jpg", alt: "Rugged SUV by the bay at sunset" },
  },
  {
    id: "premium",
    name: "Premium",
    blurb: "Executive comfort for special trips",
    image: { src: "/images/premium.jpg", alt: "Black premium SUV on a palm-lined avenue" },
  },
  {
    id: "seven-seater",
    name: "5–7 Seater",
    blurb: "Space for the whole family",
    image: { src: "/images/seven-seater.jpg", alt: "Dark grey seven-seat SUV in daylight" },
  },
] as const

export const NO_PREFERENCE = "No preference"
export const carPreferences = [NO_PREFERENCE, ...categories.map((c) => c.name)]
