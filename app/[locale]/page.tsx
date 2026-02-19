import { Button } from "@/components/ui/button";
import { ArrowRight, ChefHat, Clock, MapPin } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/providers/QueryProvider";
import { getFeaturedProductsServer } from "@/lib/api/server";
import { queryKeys } from "@/lib/utils/queryKeys";
import { FeaturedSection } from "@/components/home/FeaturedSection";

/**
 * Homepage - Server Component
 * Pre-fetches featured products so FeaturedSection renders without a skeleton on first load.
 */
export default async function Home() {
  const t = await getTranslations();

  // Pre-populate the featured products cache for the client
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: queryKeys.products.featured(6),
    queryFn: () => getFeaturedProductsServer(6),
  });

  return (
    <main id="main-content" className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-white py-20 md:py-32 border-b border-navy/10">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center space-y-8">
            <div className="space-y-4">
              <h1 className="font-display text-5xl md:text-7xl font-bold text-navy leading-tight animate-fade-in-up">
                {t("home.hero.title")}
                <br />
                <span className="text-sky font-handwritten text-6xl md:text-8xl">
                  {t("home.hero.titleAccent")}
                </span>
              </h1>
              <p className="text-base md:text-lg text-navy/70 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animate-delay-100">
                {t("home.hero.subtitle")}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animate-delay-200">
              <Button asChild size="lg" className="group">
                <Link href="/products" className="flex items-center">
                  {t("home.hero.cta")}
                  <ArrowRight className="ml-2 rtl:mr-2 rtl:ml-0 h-5 w-5 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
              {(
                [
                  { icon: ChefHat, text: t("home.quickInfo.artisanQuality"), delay: "animate-delay-300" },
                  { icon: Clock, text: `${t("businessHours.openTime")} - ${t("businessHours.closeTime")}`, delay: "animate-delay-400" },
                  { icon: MapPin, text: t("home.quickInfo.location"), delay: "animate-delay-500" },
                ] as const
              ).map((item, i) => (
                <div
                  key={i}
                  className={`flex flex-col items-center space-y-2 text-navy/70 group animate-fade-in-up ${item.delay}`}
                >
                  <item.icon className="h-6 w-6 text-sky" />
                  <p className="text-sm font-medium">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products — warm cache means no skeleton on first render */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <FeaturedSection />
      </HydrationBoundary>

      {/* About Section */}
      <section className="py-16 md:py-24 bg-navy text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center space-y-6 animate-fade-in-up">
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              {t("brand.name")}
            </h2>
            <p className="text-lg text-white/80">
              {t("home.aboutSection.description")}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
