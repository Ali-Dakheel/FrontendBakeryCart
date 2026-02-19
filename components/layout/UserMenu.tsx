"use client";

import { User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser, useLogout } from "@/lib/hooks/useAuth";
import { useTranslations } from "next-intl";

export function UserMenu() {
  const t = useTranslations();
  const { data: user } = useUser();
  const logout = useLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-navy hover:text-sky hover:bg-sky/10"
        >
          <User className="h-5 w-5" />
          <span className="sr-only">{t("common.userMenu")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-white">
        {user ? (
          <>
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-navy/60">{user.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/account/profile">{t("nav.profile")}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/orders">{t("nav.orders")}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/account/addresses">{t("nav.addresses")}</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => logout.mutate()}
              disabled={logout.isPending}
              className="text-red-600 focus:text-red-600"
            >
              <LogOut className="mr-2 h-4 w-4" />
              {logout.isPending ? `${t("nav.logout")}...` : t("nav.logout")}
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem asChild>
              <Link href="/login">{t("nav.login")}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/register">{t("nav.register")}</Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
