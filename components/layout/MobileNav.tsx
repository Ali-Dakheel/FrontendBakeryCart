"use client";

import { useState } from "react";
import {
  Menu,
  Home,
  LayoutGrid,
  ShoppingBag,
  Info,
  Phone,
  Package,
  LogIn,
  UserPlus,
  Heart,
  UserCog,
  MapPin,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useUser, useLogout } from "@/lib/hooks/useAuth";
import { useTranslations, useLocale } from "next-intl";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  onClick: () => void;
  isActive?: boolean;
}

function NavItem({ href, icon: Icon, label, onClick, isActive }: NavItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-lg px-4 py-3 text-[15px] font-medium transition-colors",
        isActive
          ? "bg-sky/10 text-sky"
          : "text-navy/75 hover:bg-navy/5 hover:text-navy"
      )}
    >
      <Icon className={cn("h-5 w-5 shrink-0", isActive ? "text-sky" : "text-navy/35")} />
      {label}
    </Link>
  );
}

export function MobileNav() {
  const t = useTranslations();
  const locale = useLocale();
  const { data: user } = useUser();
  const logout = useLogout();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const close = () => setOpen(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname.startsWith(`/${locale}${href}`);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-navy hover:text-sky hover:bg-sky/10"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">{t("nav.menu")}</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side={locale === "ar" ? "left" : "right"}
        className="w-[280px] sm:w-[300px] bg-white p-0 flex flex-col gap-0"
      >
        {/* Header */}
        <SheetHeader className="px-6 py-4 border-b border-border/50 shrink-0">
          <SheetTitle className="text-base font-semibold text-navy text-start">
            {t("nav.menu")}
          </SheetTitle>
        </SheetHeader>

        {/* Main nav */}
        <nav className="flex-1 overflow-y-auto p-2 space-y-0.5">
          <NavItem href="/" icon={Home} label={t("nav.home")} onClick={close} isActive={isActive("/")} />
          <NavItem href="/categories" icon={LayoutGrid} label={t("nav.categories")} onClick={close} isActive={isActive("/categories")} />
          <NavItem href="/products" icon={ShoppingBag} label={t("nav.products")} onClick={close} isActive={isActive("/products")} />
          <NavItem href="/about" icon={Info} label={t("nav.about")} onClick={close} isActive={isActive("/about")} />
          <NavItem href="/contact" icon={Phone} label={t("nav.contact")} onClick={close} isActive={isActive("/contact")} />

          <Separator className="my-3 mx-4 w-auto" />

          {/* Account section */}
          <p className="px-4 pt-2 pb-1.5 text-[11px] font-semibold uppercase tracking-widest text-navy/35">
            {t("nav.account")}
          </p>

          {user ? (
            <>
              <NavItem href="/orders" icon={Package} label={t("nav.orders")} onClick={close} isActive={isActive("/orders")} />
              <NavItem href="/wishlist" icon={Heart} label={t("wishlist.title")} onClick={close} isActive={isActive("/wishlist")} />
              <NavItem href="/account/profile" icon={UserCog} label={t("nav.profile")} onClick={close} isActive={isActive("/account/profile")} />
              <NavItem href="/account/addresses" icon={MapPin} label={t("nav.addresses")} onClick={close} isActive={isActive("/account/addresses")} />
              <button
                onClick={() => { logout.mutate(); close(); }}
                disabled={logout.isPending}
                className="w-full flex items-center gap-3 rounded-lg px-4 py-3 text-[15px] font-medium text-red-500 hover:bg-red-50 transition-colors"
              >
                <LogOut className="h-5 w-5 shrink-0" />
                <span className="text-start">
                  {logout.isPending ? `${t("nav.logout")}...` : t("nav.logout")}
                </span>
              </button>
            </>
          ) : (
            <>
              <NavItem href="/login" icon={LogIn} label={t("nav.login")} onClick={close} isActive={isActive("/login")} />
              <NavItem href="/register" icon={UserPlus} label={t("nav.register")} onClick={close} isActive={isActive("/register")} />
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
