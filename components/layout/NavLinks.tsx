"use client";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { Heart } from "lucide-react";
import type { User } from "@/lib/types";

interface NavLinksProps {
  user?: User | null;
  orientation?: "horizontal" | "vertical";
  onLinkClick?: () => void;
}

const BASE_LINK_CLASS = "text-base text-navy hover:text-sky transition-colors";

export function NavLinks({ user, orientation = "horizontal", onLinkClick }: NavLinksProps) {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const isVertical = orientation === "vertical";

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    }
    return pathname.startsWith(`/${locale}${href}`);
  };

  const linkClass = (href: string) => cn(
    BASE_LINK_CLASS,
    isVertical ? "font-medium" : "font-semibold",
    isActive(href) && "text-sky underline underline-offset-4"
  );

  const sharedLinks = [
    { href: "/categories" as const, label: t("nav.categories") },
    { href: "/products" as const, label: t("nav.products") },
    { href: "/about" as const, label: t("nav.about") },
    { href: "/contact" as const, label: t("nav.contact") },
  ];

  return (
    <>
      {sharedLinks.map(({ href, label }) => (
        <Link key={href} href={href} className={linkClass(href)} onClick={onLinkClick}>
          {label}
        </Link>
      ))}
      {user && (
        <Link href="/orders" className={linkClass("/orders")} onClick={onLinkClick}>
          {t("nav.orders")}
        </Link>
      )}
      {isVertical && user && (
        <>
          <Link href="/wishlist" className={cn(linkClass("/wishlist"), "flex items-center gap-2")} onClick={onLinkClick}>
            <Heart className="h-4 w-4" />
            {t("wishlist.title")}
          </Link>
          <Link href="/account/profile" className={linkClass("/account/profile")} onClick={onLinkClick}>
            {t("nav.profile")}
          </Link>
          <Link href="/account/addresses" className={linkClass("/account/addresses")} onClick={onLinkClick}>
            {t("nav.addresses")}
          </Link>
        </>
      )}
      {isVertical && !user && (
        <>
          <Link href="/login" className={linkClass("/login")} onClick={onLinkClick}>
            {t("nav.login")}
          </Link>
          <Link href="/register" className={linkClass("/register")} onClick={onLinkClick}>
            {t("nav.register")}
          </Link>
        </>
      )}
    </>
  );
}
