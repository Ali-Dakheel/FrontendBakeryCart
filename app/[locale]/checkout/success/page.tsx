"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderNumber = searchParams.get("order");

  useEffect(() => {
    // Celebrate with confetti!
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

  if (!orderNumber) {
    router.push("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-cream-dark to-flour flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl border-2 border-sky shadow-xl p-8 md:p-12 text-center space-y-8">
          {/* Success Icon */}
          <div className="mx-auto w-24 h-24 rounded-full bg-green-100 flex items-center justify-center animate-bounce">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-navy">
              Order Placed Successfully!
            </h1>
            <p className="text-lg text-navy/70">
              Thank you for your order! We've received it and will start preparing your
              fresh baked goods right away.
            </p>
          </div>

          {/* Order Number */}
          <div className="bg-cream rounded-lg p-6 border border-sky/30">
            <p className="text-sm text-navy/60 mb-2">Your Order Number</p>
            <p className="font-mono text-3xl font-bold text-navy">{orderNumber}</p>
          </div>

          {/* Next Steps */}
          <div className="bg-sky/10 rounded-lg p-6 space-y-4 text-left">
            <div className="flex items-start gap-3">
              <Package className="h-6 w-6 text-sky shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-navy mb-2">What happens next?</h3>
                <ul className="space-y-2 text-sm text-navy/70">
                  <li>✓ You'll receive an order confirmation email shortly</li>
                  <li>✓ We'll start preparing your order fresh</li>
                  <li>✓ Our delivery team will contact you before delivery</li>
                  <li>✓ Track your order status in your account</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              asChild
              size="lg"
              className="bg-navy hover:bg-navy-light"
            >
              <Link href={`/orders`}>
                View Order Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
            >
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>

          {/* Support */}
          <p className="text-xs text-navy/50 pt-4">
            Need help? Contact us on Instagram{" "}
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
    <Suspense fallback={<div className="min-h-screen bg-cream flex items-center justify-center">Loading...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
