import type { Metadata } from "next";
import { getCategoryServer } from "@/lib/api/server";
import { CategoryDetailClient } from "@/components/categories/CategoryDetailClient";

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const category = await getCategoryServer(slug, locale);

  if (!category) {
    return { title: "Category Not Found" };
  }

  const title = category.name ?? "Category";
  const description = category.description || undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default function CategoryPage() {
  return <CategoryDetailClient />;
}
