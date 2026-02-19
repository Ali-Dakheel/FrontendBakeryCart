import type { ProductImage } from "@/lib/types";

/** Resolves the correct URL from a ProductImage regardless of whether it's `url` or `image_path`. */
export function getImageUrl(img: ProductImage): string {
  return img.url ?? img.image_path ?? "";
}

/** Resolves the correct alt text from a ProductImage regardless of whether it's `alt` or `alt_text`. */
export function getImageAlt(img: ProductImage, fallback: string): string {
  return img.alt ?? img.alt_text ?? fallback;
}

// Base64-encoded SVG blur placeholder for missing images
const BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgZmlsbD0iI0YzRjRGNiIvPjwvc3ZnPg==";

/**
 * Gets a valid image URL from a product's images array
 * @param images - Array of product images
 * @param preferPrimary - Whether to prefer the primary image (default: true)
 * @returns Object containing the URL, placeholder status, and blur data URL
 */
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
