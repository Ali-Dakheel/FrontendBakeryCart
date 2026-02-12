import { Instagram, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT_INFO } from "@/lib/utils/constants";
import { getTranslations } from "next-intl/server";

/**
 * Contact Page - Server Component
 * Static contact information with CSS animations
 */
export default async function ContactPage() {
  const t = await getTranslations();
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-navy/10">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="text-center space-y-4 max-w-3xl mx-auto animate-fade-in-up">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-navy">
              {t('contact.title')}
            </h1>
            <p className="text-navy/70 text-base md:text-lg leading-relaxed">
              {t('contact.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Contact Cards */}
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-navy/10 animate-fade-in-up">
                <div className="flex items-start space-x-4 rtl:space-x-reverse">
                  <div className="w-12 h-12 rounded-full bg-sky/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-6 w-6 text-sky" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy mb-2">{t('contact.locationLabel')}</h3>
                    <p className="text-navy/70 text-sm leading-relaxed">
                      {t('location')}
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="bg-white p-6 rounded-lg shadow-sm border border-navy/10 animate-fade-in-up"
                style={{ animationDelay: '100ms' }}
              >
                <div className="flex items-start space-x-4 rtl:space-x-reverse">
                  <div className="w-12 h-12 rounded-full bg-sky/10 flex items-center justify-center shrink-0">
                    <Clock className="h-6 w-6 text-sky" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy mb-2">{t('contact.hoursLabel')}</h3>
                    <div className="text-navy/70 text-sm space-y-1">
                      <p className="font-medium text-navy">{t('businessHours.workingDays')}</p>
                      <p>{t('businessHours.openTime')} - {t('businessHours.closeTime')}</p>
                      <p className="text-sky font-medium">{t('contact.closed')} {t('businessHours.closedDay')}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="bg-white p-6 rounded-lg shadow-sm border border-navy/10 animate-fade-in-up"
                style={{ animationDelay: '200ms' }}
              >
                <div className="flex items-start space-x-4 rtl:space-x-reverse">
                  <div className="w-12 h-12 rounded-full bg-sky/10 flex items-center justify-center shrink-0">
                    <Instagram className="h-6 w-6 text-sky" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-navy mb-2">{t('contact.socialLabel')}</h3>
                    <Button
                      asChild
                      variant="link"
                      className="h-auto p-0 text-sky hover:text-sky-dark text-sm"
                    >
                      <a
                        href="https://instagram.com/easybake.bh"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span dir="ltr">easybake.bh</span>
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div
              className="bg-navy text-white p-8 rounded-lg animate-fade-in-up"
              style={{ animationDelay: '300ms' }}
            >
              <h3 className="font-display text-2xl font-bold mb-4">
                {t('contact.wholesaleTitle')}
              </h3>
              <p className="text-white/80 mb-6 leading-relaxed">
                {t('contact.wholesaleDescription')}
              </p>
              <Button
                asChild
                variant="secondary"
                className="w-full bg-sky hover:bg-sky-dark text-white font-semibold"
              >
                <a
                  href="https://instagram.com/easybake.bh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  <Instagram className="mr-2 h-5 w-5 rtl:ml-2 rtl:mr-0" />
                  {t('contact.messageOnInstagram')}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
