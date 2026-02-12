import Link from "next/link";
import Image from "next/image";
import { Instagram, MapPin, Clock } from "lucide-react";
import { BUSINESS_HOURS, CONTACT_INFO } from "@/lib/utils/constants";

export function Footer() {
  return (
    <footer className="border-t-2 border-sky/10 bg-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo.png"
                  alt="Easy Bake Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="font-display text-2xl font-bold">
                <span className="text-navy">Easy</span>{" "}
                <span className="text-sky">Bake</span>
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-navy/70 max-w-xs">
              Artisan French bakery bringing you the finest croissants, baguettes, and sourdough in Bahrain.
            </p>
            <a
              href="https://instagram.com/easybake.bh"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-sm text-navy hover:text-sky transition-colors group"
            >
              <Instagram className="h-5 w-5 text-sky group-hover:scale-110 transition-transform" />
              <span>{CONTACT_INFO.instagram}</span>
            </a>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-sky" />
              <h4 className="font-display text-lg font-semibold text-navy">Business Hours</h4>
            </div>
            <div className="space-y-2 text-sm text-navy/70">
              <p className="font-medium text-navy">{BUSINESS_HOURS.workingDays}</p>
              <p className="text-navy/80">
                {BUSINESS_HOURS.openTime} - {BUSINESS_HOURS.closeTime}
              </p>
              <p className="text-navy/60 mt-2">
                Closed {BUSINESS_HOURS.closedDay}
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-sky" />
              <h4 className="font-display text-lg font-semibold text-navy">Location</h4>
            </div>
            <p className="text-sm text-navy/70 leading-relaxed">{CONTACT_INFO.location}</p>
            <div className="space-y-3 pt-2">
              <h5 className="font-display font-semibold text-navy text-sm">Quick Links</h5>
              <div className="flex flex-col space-y-2 text-sm">
                <Link href="/" className="text-navy/70 hover:text-sky hover:translate-x-1 transition-all inline-flex">
                  Home
                </Link>
                <Link href="/products" className="text-navy/70 hover:text-sky hover:translate-x-1 transition-all inline-flex">
                  Products
                </Link>
                <Link href="/about" className="text-navy/70 hover:text-sky hover:translate-x-1 transition-all inline-flex">
                  About
                </Link>
                <Link href="/contact" className="text-navy/70 hover:text-sky hover:translate-x-1 transition-all inline-flex">
                  Contact
                </Link>
                <Link href="/orders" className="text-navy/70 hover:text-sky hover:translate-x-1 transition-all inline-flex">
                  Orders
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-sky/10">
          <p className="text-center text-sm text-navy/60">
            © {new Date().getFullYear()} Easy Bake ({CONTACT_INFO.brand}). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
