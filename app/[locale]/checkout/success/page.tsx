"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Link, useRouter } from "@/i18n/navigation";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import confetti from "canvas-confetti";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations("checkout");
  const tCart = useTranslations("cart");
  const orderNumber = searchParams.get("order");

  useEffect(() => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#FFD966", "#1E3A5F"],
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#FFD966", "#1E3A5F"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  useEffect(() => {
    if (!orderNumber) {
      router.replace("/");
    }
  }, [orderNumber, router]);

  if (!orderNumber) {
    return null;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-cream via-cream-dark to-flour flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl border-2 border-sky shadow-xl p-8 md:p-12 text-center space-y-8">
          <div className="mx-auto w-24 h-24 rounded-full bg-green-100 flex items-center justify-center animate-bounce">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>

          <div className="space-y-3">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-navy">
              {t("successTitle")}
            </h1>
            <p className="text-lg text-navy/70">
              {t("successSubtitle")}
            </p>
          </div>

          <div className="bg-cream rounded-lg p-6 border border-sky/30">
            <p className="text-sm text-navy/60 mb-2">{t("successOrderNumber")}</p>
            <p className="font-mono text-3xl font-bold text-navy">{orderNumber}</p>
          </div>

          <div className="bg-sky/10 rounded-lg p-6 space-y-4 text-left">
            <div className="flex items-start gap-3">
              <Package className="h-6 w-6 text-sky shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-navy mb-2">{t("successWhatsNext")}</h3>
                <ul className="space-y-2 text-sm text-navy/70">
                  <li>✓ {t("successStep1")}</li>
                  <li>✓ {t("successStep2")}</li>
                  <li>✓ {t("successStep3")}</li>
                  <li>✓ {t("successStep4")}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild size="lg" className="bg-navy hover:bg-navy-light">
              <Link href="/orders">
                {t("successViewOrder")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/products">{tCart("continueShopping")}</Link>
            </Button>
          </div>

          <p className="text-xs text-navy/50 pt-4">
            {t("successNeedHelp")}{" "}
            <a
              href="https://instagram.com/easybake.bh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky hover:underline"
            >
              @easybake.bh
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream flex items-center justify-center" />}>
      <OrderSuccessContent />
    </Suspense>
  );
}
