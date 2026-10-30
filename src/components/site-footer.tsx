import Image from "next/image"
import { Phone } from "lucide-react"
import { cn } from "cn"

import { CallLink, LeadButton } from "@/components/cta"
import { container } from "@/components/eyebrow"
import { buttonVariants } from "@/components/ui/button"
import { site } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line md:mt-28">
      <div className={`${container} flex flex-col gap-10 py-14 md:flex-row md:items-start md:justify-between`}>
        <div className="max-w-xs">
          <Image src="/brand/logo.png" alt={site.name} width={800} height={314} className="h-14 w-auto" />
          <p className="mt-5 text-[15px] text-ink-muted">
            {site.address.full}
            <br />
            Mon–Sat {site.hours.monSat} · Sun {site.hours.sun}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <LeadButton source="footer" label="Book Now" />
          <CallLink
            source="footer"
            className={cn(buttonVariants({ variant: "outline-navy", size: "cta" }))}
          >
            <Phone aria-hidden />
            {site.phone.display}
          </CallLink>
        </div>
      </div>
      <div className="border-t border-line">
        <div className={`${container} flex flex-col gap-1 py-6 text-[13px] text-ink-muted sm:flex-row sm:justify-between`}>
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span>{site.domain}</span>
        </div>
      </div>
    </footer>
  )
}
