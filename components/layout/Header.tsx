"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUIStore } from "@/lib/stores/ui-store";
import { useCart } from "@/lib/hooks/useCart";
import { useUser } from "@/lib/hooks/useAuth";
import { useWishlist } from "@/lib/hooks/useWishlist";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { NavLinks } from "@/components/layout/NavLinks";
import { UserMenu } from "@/components/layout/UserMenu";
import { MobileNav } from "@/components/layout/MobileNav";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

export function Header() {
  const t = useTranslations();
  const { openCart } = useUIStore();
  const { data: cart, isPending: cartPending } = useCart();
  const { data: user } = useUser();
  const { data: wishlistData } = useWishlist();

  const cartItemsCount = cartPending
    ? 0
    : (cart?.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0);
  const wishlistCount = wishlistData?.length ?? 0;

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-sky/10 bg-white backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-4">
          {/* Logo - Left */}
          <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse group">
            <div className="relative w-10 h-10 md:w-14 md:h-14 shrink-0 transition-transform group-hover:scale-105">
              <Image
                src="/logo.png"
                alt={t("footer.logoAlt")}
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <h1 className="font-display text-lg md:text-2xl font-bold leading-tight whitespace-nowrap">
                <span className="text-navy">{t("brand.name").split(" ")[0]}</span>{" "}
                <span className="text-sky">{t("brand.name").split(" ")[1]}</span>
              </h1>
              <span className="text-[10px] text-navy/60 font-medium hidden sm:block">
                {t("brand.tagline")}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Center */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLinks user={user} orientation="horizontal" />
          </nav>

          {/* Actions - Right */}
          <div className="flex items-center justify-end gap-0.5 md:gap-1">
            <LanguageSwitcher />

            {/* Wishlist Button — only when logged in, hidden on mobile (accessible via menu) */}
            {user && (
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="relative hidden md:inline-flex text-navy hover:text-rose-500 hover:bg-rose-50"
              >
                <Link
                  href="/wishlist"
                  aria-label={`${t("wishlist.title")}${wishlistCount > 0 ? ` (${wishlistCount})` : ""}`}
                >
                  <Heart
                    className={cn(
                      "h-5 w-5 transition-colors",
                      wishlistCount > 0 ? "fill-rose-500 text-rose-500" : ""
                    )}
                  />
                  {wishlistCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 rtl:-left-1 rtl:right-auto h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] bg-rose-500 text-white font-bold border-2 border-white">
                      <span aria-hidden="true">{wishlistCount > 9 ? "9+" : wishlistCount}</span>
                    </Badge>
                  )}
                </Link>
              </Button>
            )}

            {/* Cart Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={openCart}
              className="relative text-navy hover:text-sky hover:bg-sky/10"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 rtl:-left-1 rtl:right-auto h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-sky text-white font-bold border-2 border-white"
                >
                  <span aria-hidden="true">{cartItemsCount}</span>
                </Badge>
              )}
              <span className="sr-only">
                {t("common.shoppingCart")}
                {cartItemsCount > 0 && ` (${cartItemsCount})`}
              </span>
            </Button>

            <UserMenu />
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
