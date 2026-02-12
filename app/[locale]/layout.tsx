import type { Metadata } from "next";
import { Crimson_Pro, EB_Garamond, Caveat, Tajawal } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import "../globals.css";
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/lib/providers/QueryProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { locales, localeDirections, type Locale } from "@/i18n.config";

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

const tajawal = Tajawal({
  variable: "--font-arabic",
  subsets: ["arabic", "latin"],
  display: "swap",
  weight: ["400", "500", "700", "800"],
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

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Get messages for the locale
  const messages = await getMessages();

  // Get text direction for the locale
  const direction = localeDirections[locale as Locale];

  // Choose font based on locale
  const fontClass = locale === 'ar' ? 'font-arabic' : 'font-sans';

  return (
    <html lang={locale} dir={direction}>
      <body
        className={`${crimsonPro.variable} ${ebGaramond.variable} ${caveat.variable} ${tajawal.variable} ${fontClass} antialiased grain-texture`}
      >
        <NextIntlClientProvider messages={messages}>
          <QueryProvider>
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <CartDrawer />
            <Toaster />
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
