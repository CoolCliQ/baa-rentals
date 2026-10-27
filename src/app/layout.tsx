import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import { AnalyticsScripts, GtmNoScript, gtmSnippet } from "@/components/analytics-scripts";
import { LeadProvider } from "@/components/lead/lead-provider";
import { site } from "@/lib/site";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const description =
  "Hourly, daily and weekly car rentals in Webster and the Houston Bay Area. Tell us when you need a car and we'll match you with the right one.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} | Car Rental in Webster & Houston Bay Area`,
  description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: site.name,
    description,
    images: ["/images/hero.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${plusJakartaSans.variable} h-full antialiased`}
    >
      {gtmSnippet && (
        <head>
          {/* Google Tag Manager, as high in <head> as possible (per GTM's install guide). */}
          <script id="gtm" dangerouslySetInnerHTML={{ __html: gtmSnippet }} />
        </head>
      )}
      <body className="flex min-h-full flex-col">
        <GtmNoScript />
        <LeadProvider>{children}</LeadProvider>
        <AnalyticsScripts />
      </body>
    </html>
  );
}
