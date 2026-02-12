"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { locales, localeNames, type Locale } from "@/i18n.config";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: Locale) => {
    // Remove the current locale from pathname
    const pathnameWithoutLocale = pathname.replace(`/${locale}`, '');

    // Navigate to the same page with new locale
    router.push(`/${newLocale}${pathnameWithoutLocale || '/'}`);
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-navy hover:text-sky hover:bg-sky/10"
          aria-label="Change language"
        >
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 bg-white">
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => switchLocale(loc)}
            className={`cursor-pointer ${
              locale === loc ? "bg-sky/10 text-sky font-semibold" : ""
            }`}
          >
            <span className={locale === loc ? "flex items-center justify-between w-full" : ""}>
              {localeNames[loc]}
              {locale === loc && (
                <span className="text-sky">✓</span>
              )}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
