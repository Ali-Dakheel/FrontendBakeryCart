import { ChefHat, Heart, Award, Users } from "lucide-react";
import { CONTACT_INFO, BUSINESS_HOURS } from "@/lib/utils/constants";

/**
 * About Page - Server Component
 * Static content with CSS animations
 */
export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-navy/10">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="text-center space-y-4 max-w-3xl mx-auto animate-fade-in-up">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-navy">
              About Easy Bake
            </h1>
            <p className="text-navy/70 text-base md:text-lg leading-relaxed">
              Bringing authentic French artisan baking to Bahrain
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-6 text-center animate-fade-in-up">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
              Our Story
            </h2>
            <div className="text-navy/70 text-base md:text-lg space-y-4 leading-relaxed">
              <p>
                Easy Bake ({CONTACT_INFO.brand}) is a wholesale French bakery dedicated to
                bringing authentic artisan bread and pastries to Bahrain. Every product is
                crafted with traditional techniques and the finest ingredients.
              </p>
              <p>
                From flaky croissants to crusty baguettes and tangy sourdough, we honor
                centuries-old French baking traditions while serving our local community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy text-center mb-12 animate-fade-in-up">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: ChefHat,
                title: "Artisan Quality",
                description: "Handcrafted with care using traditional French techniques"
              },
              {
                icon: Heart,
                title: "Passion for Baking",
                description: "Every loaf is baked with love and dedication"
              },
              {
                icon: Award,
                title: "Finest Ingredients",
                description: "Only premium, quality ingredients make it into our ovens"
              },
              {
                icon: Users,
                title: "Community First",
                description: "Serving Bahrain with pride and commitment"
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
                  {value.title}
                </h3>
                <p className="text-sm text-navy/70 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hours & Location */}
      <section className="py-16 md:py-24 bg-navy text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in-up">
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Visit Us
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="space-y-2">
                <h3 className="font-semibold text-sky text-lg">Location</h3>
                <p className="text-white/80">{CONTACT_INFO.location}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-sky text-lg">Hours</h3>
                <p className="text-white/80">
                  {BUSINESS_HOURS.workingDays}
                  <br />
                  {BUSINESS_HOURS.openTime} - {BUSINESS_HOURS.closeTime}
                  <br />
                  <span className="text-sky">Closed {BUSINESS_HOURS.closedDay}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
