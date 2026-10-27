import { Phone } from "lucide-react"
import { cn } from "cn"

import { CallLink, LeadButton } from "@/components/cta"
import { buttonVariants } from "@/components/ui/button"
import { site } from "@/lib/site"

/** Sticky booking bar on phones and small tablets. */
export function MobileCtaBar() {
  return (
    <>
      {/* Spacer so the page's last content isn't hidden behind the fixed bar. */}
      <div className="h-24 md:hidden" aria-hidden />
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden">
        <div className="flex gap-3">
          <CallLink
            source="mobile_bar"
            aria-label={`Call ${site.phone.display}`}
            className={cn(buttonVariants({ variant: "outline-navy", size: "cta-icon" }))}
          >
            <Phone aria-hidden />
          </CallLink>
          <LeadButton source="mobile_bar" label="Book a Car" arrow className="flex-1" />
        </div>
      </div>
    </>
  )
}
