import Image from "next/image"
import { Clock, MapPin, Navigation, Phone, Store } from "lucide-react"

import { cn } from "cn"

import { buttonVariants } from "@/components/ui/button"
import { site } from "@/lib/site"

export function LocationCard() {
  return (
    <div className="grid gap-2 rounded-card bg-surface-container-lowest p-4 shadow-md lg:grid-cols-2 lg:gap-10 lg:p-10">
      <div className="flex items-center gap-1 lg:col-start-1 lg:gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-fixed text-primary">
          <Store className="size-6" aria-hidden />
        </div>
        <div>
          <span className="text-label-caps text-primary uppercase">
            Webster Pickup Station
          </span>
          <h2 className="text-headline-sm text-on-surface lg:text-headline-md">
            {site.address.street}
          </h2>
          <p className="text-body-sm text-on-surface-variant">
            {site.address.cityLine} • Gulf Freeway Corridor
          </p>
        </div>
      </div>

      <div className="relative h-36 w-full overflow-hidden rounded-tile shadow-inner lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:h-full lg:min-h-64">
        <Image
          src="/images/map.png"
          alt={`Map of the area around ${site.address.full}`}
          fill
          sizes="(min-width: 1024px) 560px, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-inverse-surface/10" />
        <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-surface-container-lowest/95 px-2.5 py-1 shadow-sm backdrop-blur-sm">
          <MapPin className="size-3.5 text-primary" aria-hidden />
          <span className="text-label-caps text-on-surface">NASA JSC 5 MIN AWAY</span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 pt-1 text-on-surface-variant lg:col-start-1">
        <div className="flex items-center gap-2">
          <Clock className="size-[18px] shrink-0 text-secondary" aria-hidden />
          <span className="text-body-sm lg:text-body-md">
            <strong className="font-bold text-on-surface">Mon–Sat:</strong>{" "}
            {site.hours.monSat} •{" "}
            <strong className="font-bold text-on-surface">Sun:</strong>{" "}
            {site.hours.sun}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="size-[18px] shrink-0 text-primary" aria-hidden />
          <span className="text-body-sm lg:text-body-md">
            <strong className="font-bold text-on-surface">Direct Line:</strong>{" "}
            {site.phone.display}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-1 pt-1 lg:col-start-1 lg:gap-3 lg:self-end">
        <a
          href={site.phone.href}
          className={cn(buttonVariants({ variant: "tonal", size: "pill", className: "w-full" }))}
        >
          <Phone aria-hidden />
          <span>Call to Book</span>
        </a>
        <a
          href={site.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({
            size: "pill",
            className: "w-full shadow-sm hover:bg-primary hover:opacity-90",
          }))}
        >
          <Navigation aria-hidden />
          <span>Get Directions</span>
        </a>
      </div>
    </div>
  )
}
