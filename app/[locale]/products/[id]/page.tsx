import type { Metadata } from "next";
import { getProductServer } from "@/lib/api/server";
import { ProductDetailClient } from "@/components/products/ProductDetailClient";

type Props = {
  params: Promise<{ id: string; locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, locale } = await params;
  const product = await getProductServer(parseInt(id), locale);

  if (!product) {
    return { title: "Product Not Found" };
  }

  const title = product.name ?? "Product";
  const description = product.short_description || product.description || undefined;
  const imageUrl = product.images?.[0]?.url;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: imageUrl ? [{ url: imageUrl }] : [],
    },
  };
}

export default function ProductDetailPage() {
  return <ProductDetailClient />;
}
