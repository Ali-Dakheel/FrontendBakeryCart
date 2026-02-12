import { Instagram, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT_INFO, BUSINESS_HOURS } from "@/lib/utils/constants";

/**
 * Contact Page - Server Component
 * Static contact information with CSS animations
 */
export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-navy/10">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="text-center space-y-4 max-w-3xl mx-auto animate-fade-in-up">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-navy">
              Get in Touch
            </h1>
            <p className="text-navy/70 text-base md:text-lg leading-relaxed">
              Have questions about our products or wholesale orders? We'd love to hear from you.
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
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-sky/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-6 w-6 text-sky" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy mb-2">Location</h3>
                    <p className="text-navy/70 text-sm leading-relaxed">
                      {CONTACT_INFO.location}
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="bg-white p-6 rounded-lg shadow-sm border border-navy/10 animate-fade-in-up"
                style={{ animationDelay: '100ms' }}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-sky/10 flex items-center justify-center shrink-0">
                    <Clock className="h-6 w-6 text-sky" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy mb-2">Business Hours</h3>
                    <div className="text-navy/70 text-sm space-y-1">
                      <p className="font-medium text-navy">{BUSINESS_HOURS.workingDays}</p>
                      <p>{BUSINESS_HOURS.openTime} - {BUSINESS_HOURS.closeTime}</p>
                      <p className="text-sky font-medium">Closed {BUSINESS_HOURS.closedDay}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="bg-white p-6 rounded-lg shadow-sm border border-navy/10 animate-fade-in-up"
                style={{ animationDelay: '200ms' }}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-sky/10 flex items-center justify-center shrink-0">
                    <Instagram className="h-6 w-6 text-sky" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-navy mb-2">Social Media</h3>
                    <Button
                      asChild
                      variant="link"
                      className="h-auto p-0 text-sky hover:text-sky-dark text-sm"
                    >
                      <a
                        href={`https://instagram.com/${CONTACT_INFO.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {CONTACT_INFO.instagram}
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
                Wholesale Orders
              </h3>
              <p className="text-white/80 mb-6 leading-relaxed">
                Easy Bake specializes in wholesale orders for restaurants, cafes, and hotels.
                Contact us through Instagram to discuss your bulk order requirements and delivery options.
              </p>
              <Button
                asChild
                variant="secondary"
                className="w-full bg-sky hover:bg-sky-dark text-white font-semibold"
              >
                <a
                  href={`https://instagram.com/${CONTACT_INFO.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="mr-2 h-5 w-5" />
                  Message Us on Instagram
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
