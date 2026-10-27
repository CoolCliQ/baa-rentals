import type { Metadata } from "next";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThankYou } from "@/components/thank-you";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Thank you | ${site.name}`,
  // Conversion page: keep it out of search results.
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        <ThankYou />
      </main>
      <SiteFooter />
    </>
  );
}
