import Image from "next/image"
import { MapPin, Phone, User } from "lucide-react"

import { cn } from "cn"

import { buttonVariants } from "@/components/ui/button"
import { MobileMenu } from "@/components/mobile-menu"
import { navItems, site } from "@/lib/site"

export function SiteHeader() {
  return (
    <header className="fixed top-0 z-50 w-full bg-surface/90 pt-[env(safe-area-inset-top,0px)] shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-1 px-4 lg:px-8">
        <a href="#top" className="flex min-w-0 items-center gap-2">
          <Image
            src="/images/logo.png"
            alt={`${site.name} logo`}
            width={512}
            height={110}
            priority
            // The source PNG has empty space on its right; show only the mark and wordmark.
            className="h-8 w-[90px] shrink-0 object-cover object-left"
          />
          <div className="flex min-w-0 flex-col">
            <div className="flex items-center gap-1">
              <span className="truncate text-label-lg tracking-tight text-on-surface">
                Bay Area
              </span>
              <span className="hidden rounded-full bg-primary-fixed px-1.5 py-0.5 text-label-caps text-primary min-[420px]:inline">
                RENTALS
              </span>
            </div>
            <div className="flex items-center gap-0.5 text-on-surface-variant">
              <MapPin className="size-3 shrink-0 text-primary" aria-hidden />
              <span className="max-w-[125px] truncate text-[11px] leading-tight lg:max-w-none">
                {site.area}
              </span>
            </div>
          </div>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="rounded-full px-4 py-2 text-label-lg text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1 lg:gap-3">
          <a
            href={site.phone.href}
            title={`Call ${site.phone.display}`}
            aria-label={`Call ${site.phone.display}`}
            className="flex size-11 items-center justify-center rounded-full bg-surface-container text-primary transition-colors hover:bg-surface-container-high lg:hidden"
          >
            <Phone className="size-5" aria-hidden />
          </a>
          <MobileMenu />
          <div
            aria-hidden
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary lg:hidden"
          >
            <User className="size-[18px] text-on-primary" />
          </div>

          <a
            href={site.phone.href}
            className="hidden items-center gap-2 text-label-lg text-on-surface transition-colors hover:text-primary lg:flex"
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-surface-container text-primary">
              <Phone className="size-4" aria-hidden />
            </span>
            {site.phone.display}
          </a>
          <a
            href="#booking"
            className={cn(buttonVariants({
              variant: "brand",
              size: "pill",
              className: "hidden px-6 text-[14px]/5 tracking-[0.01em] lg:inline-flex",
            }))}
          >
            Book Now
          </a>
        </div>
      </div>
    </header>
  )
}
