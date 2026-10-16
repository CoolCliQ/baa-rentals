import Image from "next/image"

export function Hero() {
  return (
    <div className="group relative flex h-full min-h-[300px] w-full flex-col justify-end overflow-hidden rounded-card bg-inverse-surface p-4 shadow-xl lg:min-h-[480px] lg:p-10">
      <Image
        src="/images/hero.jpg"
        alt="Dark grey SUV cruising along a Gulf Coast highway at sunset"
        fill
        priority
        sizes="(min-width: 1024px) 720px, 100vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-inverse-surface via-inverse-surface/60 to-transparent" />

      <div className="relative z-10 mb-2 flex items-center gap-1">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary-container/90 px-3 py-1 text-label-caps text-on-surface shadow-sm backdrop-blur-sm">
          <span className="size-2 animate-pulse rounded-full bg-primary" />
          BAY AREA BLVD • WEBSTER HUB
        </span>
      </div>

      <div className="relative z-10">
        <h1 className="text-display-hero-mobile text-inverse-on-surface lg:text-display-hero">
          Find The Ideal Ride <br />
          <span className="text-secondary-fixed-dim">For Every Journey</span>
        </h1>
        <p className="mt-1 max-w-xs text-body-md text-surface-container-high lg:mt-3 lg:max-w-md lg:text-body-lg">
          Seamless time-based rentals in Webster, TX. Unlock flexible hourly,
          daily, and weekly freedom across Clear Lake &amp; Houston.
        </p>
      </div>
    </div>
  )
}
