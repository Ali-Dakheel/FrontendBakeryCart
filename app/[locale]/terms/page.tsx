import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms of Service — Easy Bake",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-navy/60 hover:text-navy transition-colors mb-8"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to Home
        </Link>

        <h1 className="font-display text-4xl font-bold text-navy mb-2">Terms of Service</h1>
        <p className="text-navy/50 text-sm mb-10">Last updated: February 2026</p>

        <div className="prose prose-navy max-w-none space-y-8 text-navy/80 leading-relaxed">
          <section>
            <h2 className="font-display text-xl font-bold text-navy mb-3">1. About Easy Bake</h2>
            <p>
              Easy Bake (France Factory) is a wholesale artisan French bakery operating in Bahrain.
              By placing an order through our website, you agree to the following terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-navy mb-3">2. Orders & Payment</h2>
            <p>
              All orders are subject to product availability. We reserve the right to cancel or
              modify orders if items are unavailable. Payment is collected at the time of order
              placement. Prices are displayed in Bahraini Dinar (BHD) and are inclusive of any
              applicable taxes.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-navy mb-3">3. Delivery</h2>
            <p>
              Delivery is available within Bahrain during our operating hours (Saturday–Thursday,
              6:00 AM – 2:00 PM). Delivery times are estimates and may vary based on demand and
              location. We are not responsible for delays caused by factors outside our control.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-navy mb-3">4. Cancellations & Refunds</h2>
            <p>
              Orders may be cancelled before they are prepared. Once an order has been baked and
              dispatched, cancellations are not accepted. If you receive a damaged or incorrect
              order, please contact us immediately through Instagram and we will make it right.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-navy mb-3">5. Product Information</h2>
            <p>
              We strive to keep product descriptions and images accurate. However, slight variations
              in appearance may occur due to the handcrafted nature of our products. All products
              contain common allergens including gluten, dairy, and eggs. Please contact us before
              ordering if you have specific dietary requirements.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-navy mb-3">6. Account Responsibility</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials.
              Any orders placed through your account are your responsibility. Please notify us
              immediately if you suspect unauthorized access to your account.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-navy mb-3">7. Contact Us</h2>
            <p>
              For any questions about these terms, please reach out to us through our Instagram
              page or visit us at SAAR-Maqabah, Block 509, Bahrain.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
