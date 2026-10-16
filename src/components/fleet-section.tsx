"use client"

import { useState } from "react"
import Image from "next/image"
import { CircleCheck, Heart } from "lucide-react"
import { cn } from "cn"

import { buttonVariants } from "@/components/ui/button"
import { brands } from "@/lib/fleet"
import { site } from "@/lib/site"

const filters = [{ id: "all", name: "All Brands" }, ...brands]

export function FleetSection() {
  const [filter, setFilter] = useState("all")
  const [favorites, setFavorites] = useState<string[]>([])

  const visible = filter === "all" ? brands : brands.filter((b) => b.id === filter)

  return (
    <>
      <div className="mb-1 flex items-center justify-between lg:mb-3">
        <div>
          <span className="text-label-caps text-primary uppercase">
            Guaranteed Availability
          </span>
          <h2 className="text-headline-sm font-bold text-on-surface lg:text-headline-lg">
            Fleet by Trusted Brand
          </h2>
        </div>
        <span className="rounded-full bg-surface-container px-2.5 py-1 text-label-caps text-on-surface-variant">
          {site.hub}
        </span>
      </div>

      <div
        role="group"
        aria-label="Filter by brand"
        className="no-scrollbar mb-2 flex items-center gap-1.5 overflow-x-auto pt-1 pb-1 lg:mb-4"
      >
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={filter === item.id}
            onClick={() => setFilter(item.id)}
            className={cn(
              "shrink-0 rounded-full px-3.5 py-1.5 text-label-md transition-colors",
              filter === item.id
                ? "bg-primary text-on-primary shadow-sm"
                : "bg-surface-container text-on-surface hover:bg-surface-container-high"
            )}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {visible.map((brand) => {
          const BadgeIcon = brand.badge.icon
          const favorite = favorites.includes(brand.id)
          return (
            <article
              key={brand.id}
              className="flex flex-col overflow-hidden rounded-card bg-surface-container-lowest shadow-sm"
            >
              <div className="relative h-44 w-full overflow-hidden bg-surface-container-low">
                <Image
                  src={brand.image.src}
                  alt={brand.image.alt}
                  fill
                  sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-surface-container-lowest/90 px-2.5 py-1 shadow-sm backdrop-blur-sm">
                  <BadgeIcon className="size-3.5 text-primary" aria-hidden />
                  <span className="text-label-caps font-bold text-on-surface uppercase">
                    {brand.badge.label}
                  </span>
                </div>
                <button
                  type="button"
                  aria-pressed={favorite}
                  aria-label={`Save ${brand.name} as a favorite`}
                  onClick={() =>
                    setFavorites((prev) =>
                      favorite
                        ? prev.filter((id) => id !== brand.id)
                        : [...prev, brand.id]
                    )
                  }
                  className={cn(
                    "absolute top-2 right-2 flex size-8 items-center justify-center rounded-full bg-surface-container-lowest/80 backdrop-blur-sm transition-colors hover:text-primary",
                    favorite ? "text-primary" : "text-on-surface"
                  )}
                >
                  <Heart
                    className={cn("size-[18px]", favorite && "fill-current")}
                    aria-hidden
                  />
                </button>
              </div>

              <div className="flex flex-1 flex-col gap-1 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <h3 className="text-headline-sm font-bold text-on-surface">
                      {brand.name}
                    </h3>
                    <span className="rounded-full bg-surface-container px-2 py-0.5 text-label-caps text-on-surface-variant">
                      {brand.category}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-headline-sm font-extrabold text-primary">
                      ${brand.hourlyRate}
                    </span>
                    <span className="text-[12px] text-on-surface-variant">/hr</span>
                    <span className="block text-[11px] text-on-surface-variant">
                      • from ${brand.dailyRate}/day
                    </span>
                  </div>
                </div>
                <p className="text-body-md text-on-surface-variant">
                  {brand.description}
                </p>
                <div className="mt-auto flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1 text-on-surface-variant">
                    <CircleCheck className="size-4 text-secondary" aria-hidden />
                    <span className="text-[12px]">Fleet Available in Webster, TX</span>
                  </div>
                  <a
                    href="#hub"
                    className={cn(buttonVariants({ variant: "dark", size: "pill-sm" }))}
                  >
                    Select Brand
                  </a>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </>
  )
}
