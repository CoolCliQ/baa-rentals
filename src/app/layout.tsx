import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Bay Area Car Rentals | Hourly, Daily & Weekly Rentals in Webster, TX",
  description:
    "Flexible hourly, daily, and weekly car rentals in Webster, TX. Pick up on Bay Area Blvd near NASA Johnson Space Center and drive across Clear Lake, Houston, and Galveston Bay.",
};

export const viewport: Viewport = {
  themeColor: "#f8f9ff",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
