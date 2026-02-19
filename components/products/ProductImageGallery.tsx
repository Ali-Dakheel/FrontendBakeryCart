"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getImageUrl, getImageAlt } from "@/lib/utils/image";
import type { ProductImage } from "@/lib/types";

interface ProductImageGalleryProps {
  images: ProductImage[];
  productName: string;
}

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter out images with invalid URLs - be very strict
  const validImages = images?.filter((img) => {
    if (!img) return false;
    const url = getImageUrl(img);
    return url.trim().length > 0;
  }) || [];

  if (validImages.length === 0) {
    return (
      <div className="aspect-square rounded-lg bg-cream-dark flex items-center justify-center">
        <ShoppingBag className="h-24 w-24 text-navy/20" />
      </div>
    );
  }

  const currentImage = validImages[currentIndex];
  const imageUrl = getImageUrl(currentImage);

  // Check if this is a placehold.co URL (needs unoptimized flag)
  const isPlaceholder = imageUrl.includes('placehold.co');
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < validImages.length - 1;

  const goToPrevious = () => {
    if (hasPrevious) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (hasNext) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square rounded-lg overflow-hidden bg-cream-dark group">
        <Image
          src={imageUrl}
          alt={getImageAlt(currentImage, productName)}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          className="object-cover"
          priority={currentIndex === 0}
          unoptimized={isPlaceholder}
        />

        {/* Navigation Arrows */}
        {validImages.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              onClick={goToPrevious}
              disabled={!hasPrevious}
              className={cn(
                "absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity",
                !hasPrevious && "hidden"
              )}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={goToNext}
              disabled={!hasNext}
              className={cn(
                "absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity",
                !hasNext && "hidden"
              )}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}

        {/* Image Counter */}
        {validImages.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {validImages.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {validImages.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {validImages.map((image, index) => {
            const thumbUrl = getImageUrl(image);
            const isThumbPlaceholder = thumbUrl.includes('placehold.co');

            return (
              <button
                key={image.id}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "relative aspect-square rounded-md overflow-hidden border-2 transition-all",
                  currentIndex === index
                    ? "border-navy ring-2 ring-navy ring-offset-2"
                    : "border-transparent hover:border-navy/50"
                )}
              >
                <Image
                  src={thumbUrl}
                  alt={getImageAlt(image, `${productName} ${index + 1}`)}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 60px, 80px"
                  className="object-cover"
                  unoptimized={isThumbPlaceholder}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
