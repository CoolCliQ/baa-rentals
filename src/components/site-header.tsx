import Image from "next/image"
import Link from "next/link"
import { Phone } from "lucide-react"

import { CallLink, LeadButton } from "@/components/cta"
import { container } from "@/components/eyebrow"
import { navItems, site } from "@/lib/site"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-white/90 pt-[env(safe-area-inset-top,0px)] backdrop-blur-xl">
      <div className={`${container} flex h-16 items-center justify-between gap-4 md:h-20`}>
        <Link href="/" className="shrink-0">
          <Image
            src="/brand/logo.png"
            alt={site.name}
            width={720}
            height={187}
            priority
            className="h-9 w-auto md:h-11"
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`/#${item.id}`}
              className="text-[15px] font-medium text-ink-muted transition-colors hover:text-navy"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-5">
          <CallLink
            source="header"
            className="hidden items-center gap-2 text-[15px] font-semibold text-navy transition-colors hover:text-navy-600 md:inline-flex"
          >
            <Phone className="size-4" aria-hidden />
            {site.phone.display}
          </CallLink>
          <CallLink
            source="header"
            aria-label={`Call ${site.phone.display}`}
            className="flex size-11 items-center justify-center rounded-full border border-line text-navy transition-colors hover:bg-canvas md:hidden"
          >
            <Phone className="size-5" aria-hidden />
          </CallLink>
          <LeadButton source="header" label="Book a Car" className="hidden h-11 md:inline-flex" />
        </div>
      </div>
    </header>
  )
}
