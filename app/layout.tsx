import type { Metadata, Viewport } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnalyticsTracker from "@/components/AnalyticsTracker";

const serifFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

const sansFont = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "ToolStrategyHub | Strategic Decision Tools for Builders & Founders",
  description: "Data-driven tools to validate, calculate, and execute smarter business decisions. The premier ToolStrategyHub decision platform.",
  metadataBase: new URL("https://toolstrategyhub.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/brand/favicon-circle.png",
    shortcut: "/brand/favicon-circle.png",
    apple: "/brand/favicon-circle.png",
  },
  openGraph: {
    title: "ToolStrategyHub | Strategic Decision Tools",
    description: "Data-driven tools to validate, calculate, and execute smarter business decisions.",
    siteName: "ToolStrategyHub",
    images: [
      {
        url: "/brand/og-image.png",
        width: 1200,
        height: 630,
        alt: "ToolStrategyHub Logo",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolStrategyHub",
    description: "Strategic decision tools for builders and founders.",
    images: ["/brand/og-image.png"],
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${serifFont.variable} ${sansFont.variable}`}>
        <div className="site-wrapper">
          <AnalyticsTracker />
          <div className="bg-gradient"></div>
          <div className="bg-noise"></div>
          <Header />
          <main style={{ minHeight: '80vh' }}>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

