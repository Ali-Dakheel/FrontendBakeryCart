import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy — Easy Bake",
};

export default function PrivacyPage() {
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

        <h1 className="font-display text-4xl font-bold text-navy mb-2">Privacy Policy</h1>
        <p className="text-navy/50 text-sm mb-10">Last updated: February 2026</p>

        <div className="prose prose-navy max-w-none space-y-8 text-navy/80 leading-relaxed">
          <section>
            <h2 className="font-display text-xl font-bold text-navy mb-3">1. Information We Collect</h2>
            <p>
              When you create an account or place an order with Easy Bake, we collect:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-navy/70">
              <li>Your name and email address</li>
              <li>Phone number (optional)</li>
              <li>Delivery address</li>
              <li>Order history</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-navy mb-3">2. How We Use Your Information</h2>
            <p>We use your information solely to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-navy/70">
              <li>Process and deliver your orders</li>
              <li>Send order confirmations and updates</li>
              <li>Provide customer support</li>
              <li>Improve our products and services</li>
            </ul>
            <p className="mt-3">
              We do not sell, trade, or share your personal information with third parties for
              marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-navy mb-3">3. Cookies & Sessions</h2>
            <p>
              Our website uses cookies to maintain your shopping cart and login session. These are
              essential for the website to function and cannot be disabled. We do not use tracking
              or advertising cookies.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-navy mb-3">4. Data Security</h2>
            <p>
              Your data is stored securely on our servers. Passwords are encrypted and never stored
              in plain text. We use HTTPS encryption for all data transmission between your browser
              and our servers.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-navy mb-3">5. Data Retention</h2>
            <p>
              We retain your account information and order history for as long as your account is
              active. You may request deletion of your account and associated data at any time by
              contacting us through Instagram.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-navy mb-3">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-navy/70">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your account and data</li>
              <li>Opt out of any non-essential communications</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-navy mb-3">7. Contact Us</h2>
            <p>
              For any privacy-related questions or requests, please contact us through our
              Instagram page or visit us at SAAR-Maqabah, Block 509, Bahrain.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
