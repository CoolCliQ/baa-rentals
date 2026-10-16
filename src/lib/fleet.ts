import {
  Compass,
  Gem,
  Leaf,
  PiggyBank,
  Star,
  Users,
  type LucideIcon,
} from "lucide-react"

export type Brand = {
  id: string
  name: string
  category: string
  badge: { label: string; icon: LucideIcon }
  hourlyRate: number
  dailyRate: number
  description: string
  image: { src: string; alt: string }
}

export const brands: Brand[] = [
  {
    id: "ford",
    name: "Ford",
    category: "Trucks & SUVs",
    badge: { label: "Texas Favorite", icon: Star },
    hourlyRate: 12,
    dailyRate: 49,
    description:
      "Tough & dependable trucks and crossovers built for smooth cruising along I-45 and Gulf Freeway roads.",
    image: {
      src: "/images/brand-ford.jpg",
      alt: "Ford full-size pickup truck and crossover SUV in a bright showroom",
    },
  },
  {
    id: "chevrolet",
    name: "Chevrolet",
    category: "SUVs & Sedans",
    badge: { label: "Spacious 5-7 Seats", icon: Users },
    hourlyRate: 14,
    dailyRate: 55,
    description:
      "Spacious American SUVs and sedans equipped for family beach excursions to Galveston and Space Center outings.",
    image: {
      src: "/images/brand-chevrolet.jpg",
      alt: "Metallic dark gray Chevrolet SUV parked in bright Texas daylight",
    },
  },
  {
    id: "toyota",
    name: "Toyota",
    category: "Ultra-Reliable",
    badge: { label: "High Fuel Economy", icon: Leaf },
    hourlyRate: 10,
    dailyRate: 42,
    description:
      "Fuel-efficient, ultra-reliable everyday travel for stress-free commutes into downtown Houston and Clear Lake.",
    image: {
      src: "/images/brand-toyota.jpg",
      alt: "White Toyota sedan against a sunlit studio backdrop",
    },
  },
  {
    id: "gmc",
    name: "GMC",
    category: "Executive Utility",
    badge: { label: "Premium Texas Class", icon: Gem },
    hourlyRate: 18,
    dailyRate: 69,
    description:
      "Premium Texas utility & passenger comfort featuring plush seating and refined highway cruise performance.",
    image: {
      src: "/images/brand-gmc.jpg",
      alt: "Black GMC luxury SUV on a palm-lined avenue in coastal Texas",
    },
  },
  {
    id: "jeep",
    name: "Jeep",
    category: "Coast & Bay 4x4",
    badge: { label: "Coastal Ready", icon: Compass },
    hourlyRate: 16,
    dailyRate: 65,
    description:
      "Versatile ride for Clear Lake sunsets, waterfront dining, and open-air Gulf Coast exploring.",
    image: {
      src: "/images/brand-jeep.jpg",
      alt: "Jeep 4x4 near the coastal marshland of Galveston Bay at dusk",
    },
  },
  {
    id: "nissan",
    name: "Nissan",
    category: "Economy Cruisers",
    badge: { label: "Budget Best Rate", icon: PiggyBank },
    hourlyRate: 9,
    dailyRate: 39,
    description:
      "Affordable economy cruisers with easy parking and responsive handling for local tasks and shopping.",
    image: {
      src: "/images/brand-nissan.jpg",
      alt: "Silver Nissan compact sedan parked in a suburban setting",
    },
  },
]
