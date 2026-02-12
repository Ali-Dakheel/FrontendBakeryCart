import Link from "next/link";
import { Home, ShoppingBag, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Custom 404 Not Found Page
 * Full-screen overlay without header/footer
 */
export default function NotFound() {
  return (
    <div className="fixed inset-0 bg-cream flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-2xl mx-auto">
        <div className="flex flex-col items-center justify-center text-center space-y-8">
          {/* Icon */}
          <div className="w-32 h-32 rounded-full bg-cream-dark flex items-center justify-center">
            <AlertCircle className="h-16 w-16 text-navy/30" />
          </div>

          {/* Message */}
          <div className="space-y-4">
            <h1 className="font-display text-5xl md:text-6xl font-bold text-navy">
              Page Not Found
            </h1>
            <p className="text-lg text-navy/60 max-w-md mx-auto leading-relaxed">
              The page you're looking for doesn't exist or has been moved.
              Let's get you back on track!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md justify-center">
            <Button
              asChild
              size="lg"
              className="bg-navy hover:bg-navy-light flex-1 sm:flex-none sm:min-w-[180px]"
            >
              <Link href="/" className="flex items-center justify-center">
                <Home className="h-5 w-5 mr-2" />
                Go Home
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="flex-1 sm:flex-none sm:min-w-[180px]"
            >
              <Link href="/products" className="flex items-center justify-center">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Browse Products
              </Link>
            </Button>
          </div>

          {/* Helpful Links */}
          <div className="pt-8 border-t border-border/40 w-full max-w-md">
            <p className="text-sm text-navy/60 mb-4">Looking for something specific?</p>
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm">
              <Link
                href="/categories"
                className="text-navy hover:text-sky transition-colors font-medium"
              >
                Categories
              </Link>
              <span className="text-navy/30">•</span>
              <Link
                href="/about"
                className="text-navy hover:text-sky transition-colors font-medium"
              >
                About Us
              </Link>
              <span className="text-navy/30">•</span>
              <Link
                href="/contact"
                className="text-navy hover:text-sky transition-colors font-medium"
              >
                Contact
              </Link>
              <span className="text-navy/30">•</span>
              <Link
                href="/orders"
                className="text-navy hover:text-sky transition-colors font-medium"
              >
                My Orders
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
