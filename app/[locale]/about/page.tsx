import { ChefHat, Heart, Award, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";

/**
 * About Page - Server Component
 * Static content with CSS animations
 */
export default async function AboutPage() {
  const t = await getTranslations();
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-navy/10">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="text-center space-y-4 max-w-3xl mx-auto animate-fade-in-up">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-navy">
              {t('about.title')}
            </h1>
            <p className="text-navy/70 text-base md:text-lg leading-relaxed">
              {t('about.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-6 text-center animate-fade-in-up">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
              {t('about.storyTitle')}
            </h2>
            <div className="text-navy/70 text-base md:text-lg space-y-4 leading-relaxed">
              <p>
                {t('about.storyParagraph1')}
              </p>
              <p>
                {t('about.storyParagraph2')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy text-center mb-12 animate-fade-in-up">
            {t('about.valuesTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: ChefHat,
                titleKey: 'about.values.artisanQuality.title',
                descriptionKey: 'about.values.artisanQuality.description'
              },
              {
                icon: Heart,
                titleKey: 'about.values.passion.title',
                descriptionKey: 'about.values.passion.description'
              },
              {
                icon: Award,
                titleKey: 'about.values.ingredients.title',
                descriptionKey: 'about.values.ingredients.description'
              },
              {
                icon: Users,
                titleKey: 'about.values.community.title',
                descriptionKey: 'about.values.community.description'
              }
            ].map((value, index) => (
              <div
                key={index}
                className="text-center space-y-4 p-6 rounded-lg hover:bg-cream transition-colors animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mx-auto w-16 h-16 rounded-full bg-sky/10 flex items-center justify-center">
                  <value.icon className="h-8 w-8 text-sky" />
                </div>
                <h3 className="font-display text-xl font-semibold text-navy">
                  {t(value.titleKey)}
                </h3>
                <p className="text-sm text-navy/70 leading-relaxed">
                  {t(value.descriptionKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hours & Location */}
      <section className="py-16 md:py-24 bg-navy text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in-up">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center">
              {t('about.visitUs')}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2 text-left rtl:text-right">
                <h3 className="font-semibold text-sky text-lg">{t('about.locationLabel')}</h3>
                <p className="text-white/80 leading-relaxed" dir="auto">{t('location')}</p>
              </div>
              <div className="space-y-2 text-left rtl:text-right">
                <h3 className="font-semibold text-sky text-lg">{t('about.hoursLabel')}</h3>
                <p className="text-white/80 leading-relaxed" dir="auto">
                  {t('businessHours.workingDays')}
                  <br />
                  {t('businessHours.openTime')} - {t('businessHours.closeTime')}
                  <br />
                  <span className="text-sky">{t('about.closed')} {t('businessHours.closedDay')}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
