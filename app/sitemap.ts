import type { MetadataRoute } from "next";
import { locales } from "@/i18n.config";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3001";

// Static routes available in all locales
const staticRoutes = [
  "",           // home
  "/products",
  "/categories",
  "/about",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? "daily" : "weekly",
      priority: route === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}${route}`])
        ),
      },
    }))
  );

  // Dynamic product/category entries can be added here when needed:
  // const products = await fetch(`${apiUrl}/products`).then(r => r.json());
  // const productEntries = products.map(p => ({ url: `${baseUrl}/en/products/${p.id}`, ... }));

  return staticEntries;
}
