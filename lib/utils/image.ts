import type { ProductImage } from "@/lib/types";

export function getImageUrl(img: ProductImage): string {
  return img.url ?? img.image_path ?? "";
}

export function getImageAlt(img: ProductImage, fallback: string): string {
  return img.alt ?? img.alt_text ?? fallback;
}

// Base64-encoded SVG blur placeholder for missing images
const BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgZmlsbD0iI0YzRjRGNiIvPjwvc3ZnPg==";


export function getValidImageUrl(
  images: ProductImage[] | undefined,
  preferPrimary = true
): { url: string | null; isPlaceholder: boolean; blurDataURL?: string } {
  const imageObj = preferPrimary
    ? images?.find((img) => img.is_primary) || images?.[0]
    : images?.[0];

  const rawUrl = imageObj ? getImageUrl(imageObj) || null : null;
  const validUrl =
    rawUrl && typeof rawUrl === "string" && rawUrl.trim() !== "" ? rawUrl : null;

  return {
    url: validUrl,
    isPlaceholder: validUrl?.includes("placehold.co") ?? false,
    blurDataURL: !validUrl ? BLUR_DATA_URL : undefined,
  };
}
