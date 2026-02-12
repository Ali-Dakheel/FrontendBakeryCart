import type { Metadata } from "next";
import { Crimson_Pro, EB_Garamond, Caveat } from "next/font/google";
import "../globals.css";
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/lib/providers/QueryProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";

const crimsonPro = Crimson_Pro({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const ebGaramond = EB_Garamond({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const caveat = Caveat({
  variable: "--font-handwritten",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: "Easy Bake - Artisan French Bakery in Bahrain",
    template: "%s | Easy Bake"
  },
  description: "Wholesale French bakery offering fresh croissants, baguettes, sourdough, and artisan bread. Order online for delivery in Bahrain.",
  keywords: ["bakery", "french bakery", "bahrain", "croissants", "baguettes", "sourdough", "artisan bread", "wholesale bakery", "SAAR"],
  authors: [{ name: "Easy Bake" }],
  creator: "Easy Bake",
  publisher: "Easy Bake",
  openGraph: {
    type: "website",
    locale: "en_BH",
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: "Easy Bake - Artisan French Bakery in Bahrain",
    description: "Wholesale French bakery offering fresh croissants, baguettes, sourdough, and artisan bread. Order online for delivery in Bahrain.",
    siteName: "Easy Bake",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Easy Bake Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Easy Bake - Artisan French Bakery in Bahrain",
    description: "Wholesale French bakery offering fresh croissants, baguettes, sourdough, and artisan bread.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification tokens here when available
    // google: 'google-site-verification-token',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${crimsonPro.variable} ${ebGaramond.variable} ${caveat.variable} font-sans antialiased grain-texture`}
      >
        <QueryProvider>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <CartDrawer />
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
