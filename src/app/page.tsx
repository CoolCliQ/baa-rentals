import { Benefits } from "@/components/benefits";
import { Categories } from "@/components/categories";
import { FinalCta } from "@/components/final-cta";
import { Hero } from "@/components/hero";
import { Location } from "@/components/location";
import { MobileCtaBar } from "@/components/mobile-cta-bar";
import { Offer } from "@/components/offer";
import { RentalSelector } from "@/components/rental-selector";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="top" className="flex-1">
        <Hero />
        <RentalSelector />
        <Benefits />
        <Categories />
        <Offer />
        <Location />
        <FinalCta />
      </main>
      <SiteFooter />
      <MobileCtaBar />
    </>
  );
}
