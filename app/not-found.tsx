import Link from "next/link";
import { Home, AlertCircle } from "lucide-react";
import BackButton from "@/components/ui/back-button";

export default function NotFound() {
  return (
    <div className="fixed inset-0 bg-cream flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-2xl mx-auto">
        <div className="flex flex-col items-center justify-center text-center space-y-8">
          <div className="w-32 h-32 rounded-full bg-cream-dark flex items-center justify-center">
            <AlertCircle className="h-16 w-16 text-navy/30" />
          </div>

          <div className="space-y-4">
            <h1 className="font-display text-5xl md:text-6xl font-bold text-navy">
              Page Not Found
            </h1>
            <p className="text-lg text-navy/60 max-w-md mx-auto leading-relaxed">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md justify-center">
            <BackButton />
            <Link
              href="/"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-navy text-cream hover:bg-navy/90 transition-colors flex-1 sm:flex-none sm:min-w-45 text-sm font-medium"
            >
              <Home className="h-4 w-4" />
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
