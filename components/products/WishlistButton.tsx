"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlist, useToggleWishlist } from "@/lib/hooks/useWishlist";
import { useUser } from "@/lib/hooks/useAuth";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  productId: number;
  variant?: "icon" | "full";
  className?: string;
}

export function WishlistButton({ productId, variant = "icon", className }: WishlistButtonProps) {
  const t = useTranslations();
  const { data: user } = useUser();
  const isLoggedIn = !!user;

  const { data: wishlistData } = useWishlist();
  const toggle = useToggleWishlist();

  if (!isLoggedIn) return null;

  const isInWishlist = wishlistData?.some((item) => item.product.id === productId) ?? false;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle.mutate(productId);
  };

  if (variant === "full") {
    return (
      <Button
        variant="outline"
        onClick={handleClick}
        disabled={toggle.isPending}
        className={cn("gap-2", isInWishlist && "border-rose-300 text-rose-500 hover:text-rose-600", className)}
      >
        <Heart className={cn("h-4 w-4", isInWishlist && "fill-rose-500")} />
        {isInWishlist ? t("wishlist.remove") : t("wishlist.add")}
      </Button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={toggle.isPending}
      aria-label={isInWishlist ? t("wishlist.remove") : t("wishlist.add")}
      className={cn(
        "p-1.5 rounded-full bg-white/80 backdrop-blur-sm shadow-sm transition-all hover:scale-110",
        isInWishlist ? "text-rose-500" : "text-navy/40 hover:text-rose-400",
        className
      )}
    >
      <Heart className={cn("h-4 w-4", isInWishlist && "fill-rose-500")} />
    </button>
  );
}
