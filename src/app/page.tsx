import { BookingConsole } from "@/components/booking-console";
import { FleetSection } from "@/components/fleet-section";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { LocationCard } from "@/components/location-card";
import { MobileTabBar } from "@/components/mobile-tab-bar";
import { PromoBanner } from "@/components/promo-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ValueProps } from "@/components/value-props";

const container = "mx-auto w-full max-w-7xl px-4 lg:px-8";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main
        id="top"
        className="relative flex w-full flex-1 flex-col bg-surface pt-20 pb-24 lg:pb-0"
      >
        <div className="mx-auto w-full max-w-7xl lg:grid lg:grid-cols-12 lg:gap-6 lg:px-8 lg:pt-8">
          <section className="px-4 pt-4 pb-6 lg:col-span-7 lg:p-0">
            <Hero />
          </section>
          <section
            id="booking"
            className="relative z-20 -mt-4 scroll-mt-24 px-4 lg:col-span-5 lg:mt-0 lg:px-0"
          >
            <BookingConsole />
          </section>
        </div>

        <section className={`${container} mt-6 lg:mt-10`}>
          <ValueProps />
        </section>

        <section className={`${container} mt-6 lg:mt-10`}>
          <PromoBanner />
        </section>

        <section id="fleet" className={`${container} mt-10 scroll-mt-24 lg:mt-16`}>
          <FleetSection />
        </section>

        <section
          id="how-it-works"
          className={`${container} mt-10 scroll-mt-24 lg:mt-16`}
        >
          <HowItWorks />
        </section>

        <section id="hub" className={`${container} mt-6 scroll-mt-24 lg:mt-10`}>
          <LocationCard />
        </section>

        <SiteFooter />
      </main>
      <MobileTabBar />
    </>
  );
}
