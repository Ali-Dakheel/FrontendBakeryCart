"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { localeNames, type Locale } from "@/i18n.config";

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    // Switch to the opposite locale
    const newLocale: Locale = locale === 'en' ? 'ar' : 'en';

    // Remove the current locale from pathname
    const pathnameWithoutLocale = pathname.replace(`/${locale}`, '');

    // Navigate to the same page with new locale
    router.push(`/${newLocale}${pathnameWithoutLocale || '/'}`);
    router.refresh();
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLocale}
      className="text-navy hover:text-sky hover:bg-sky/10 font-semibold"
      aria-label="Change language"
    >
      {locale === 'en' ? 'العربية' : 'English'}
    </Button>
  );
}
