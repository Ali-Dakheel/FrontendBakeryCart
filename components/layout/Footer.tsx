"use client";

import Image from "next/image";
import { Instagram, MapPin, Clock } from "lucide-react";
import { CONTACT_INFO } from "@/lib/utils/constants";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations();
  return (
    <footer className="border-t-2 border-sky/10 bg-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo.png"
                  alt={t('footer.logoAlt')}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="font-display text-2xl font-bold">
                <span className="text-navy">{t('brand.name').split(' ')[0]}</span>{" "}
                <span className="text-sky">{t('brand.name').split(' ')[1]}</span>
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-navy/70 max-w-xs">
              {t('footer.description')}
            </p>
            <a
              href="https://instagram.com/easybake.bh"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 rtl:space-x-reverse text-sm text-navy hover:text-sky transition-colors group"
            >
              <Instagram className="h-5 w-5 text-sky group-hover:scale-110 transition-transform" />
              <span dir="ltr">easybake.bh</span>
            </a>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Clock className="h-5 w-5 text-sky" />
              <h4 className="font-display text-lg font-semibold text-navy">{t('footer.businessHours')}</h4>
            </div>
            <div className="space-y-2 text-sm text-navy/70">
              <p className="font-medium text-navy">{t('businessHours.workingDays')}</p>
              <p className="text-navy/80">
                {t('businessHours.openTime')} - {t('businessHours.closeTime')}
              </p>
              <p className="text-navy/60 mt-2">
                {t('footer.closed')} {t('businessHours.closedDay')}
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <MapPin className="h-5 w-5 text-sky" />
              <h4 className="font-display text-lg font-semibold text-navy">{t('footer.location')}</h4>
            </div>
            <p className="text-sm text-navy/70 leading-relaxed">{t('location')}</p>
            <div className="space-y-3 pt-2">
              <nav aria-label={t('footer.quickLinks')}>
                <h5 className="font-display font-semibold text-navy text-sm mb-2">{t('footer.quickLinks')}</h5>
                <ul className="flex flex-col space-y-2 text-sm">
                  {[
                    { href: "/", label: t('nav.home') },
                    { href: "/products", label: t('nav.products') },
                    { href: "/about", label: t('nav.about') },
                    { href: "/contact", label: t('nav.contact') },
                    { href: "/orders", label: t('nav.orders') },
                  ].map(({ href, label }) => (
                    <li key={href}>
                      <Link href={href as any} className="text-navy/70 hover:text-sky hover:translate-x-1 transition-all inline-flex">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-sky/10">
          <p className="text-center text-sm text-navy/60">
            © {new Date().getFullYear()} {t('brand.name')} (France Factory). {t('footer.allRightsReserved')}.
          </p>
        </div>
      </div>
    </footer>
  );
}
