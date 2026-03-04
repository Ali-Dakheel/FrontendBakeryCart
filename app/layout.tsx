export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Locale-specific layout (app/[locale]/layout.tsx) provides the actual
  // <html> and <body> tags. This root layout just passes children through.
  // Next.js + next-intl requires this file to exist for root-level pages
  // like not-found.tsx to render correctly.
  return children;
}
