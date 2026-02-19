"use client";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import type { User } from "@/lib/types";

interface NavLinksProps {
  user?: User | null;
  orientation?: "horizontal" | "vertical";
  onLinkClick?: () => void;
}

const BASE_LINK_CLASS = "text-base text-navy hover:text-sky transition-colors";

export function NavLinks({ user, orientation = "horizontal", onLinkClick }: NavLinksProps) {
  const t = useTranslations();
  const isVertical = orientation === "vertical";

  const linkClass = cn(
    BASE_LINK_CLASS,
    isVertical ? "font-medium" : "font-semibold"
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
        <Link key={href} href={href} className={linkClass} onClick={onLinkClick}>
          {label}
        </Link>
      ))}
      {user && (
        <Link href="/orders" className={linkClass} onClick={onLinkClick}>
          {t("nav.orders")}
        </Link>
      )}
      {isVertical && user && (
        <>
          <Link href="/account/profile" className={linkClass} onClick={onLinkClick}>
            {t("nav.profile")}
          </Link>
          <Link href="/account/addresses" className={linkClass} onClick={onLinkClick}>
            {t("nav.addresses")}
          </Link>
        </>
      )}
      {isVertical && !user && (
        <>
          <Link href="/login" className={linkClass} onClick={onLinkClick}>
            {t("nav.login")}
          </Link>
          <Link href="/register" className={linkClass} onClick={onLinkClick}>
            {t("nav.register")}
          </Link>
        </>
      )}
    </>
  );
}
