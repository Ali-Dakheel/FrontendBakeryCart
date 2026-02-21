"use client";

import { AlertCircle, RefreshCw, Home, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

/**
 * Products Error Boundary
 * Handles errors in product listing and detail pages
 */
export default function ProductsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-gradient-to-br from-cream via-cream-dark to-flour border-b border-border/40">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center space-x-3">
            <ShoppingBag className="h-8 w-8 text-sky" />
            <h1 className="font-display text-4xl font-bold text-navy">
              Products
            </h1>
          </div>
        </div>
      </div>

      {/* Error Content */}
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="max-w-md w-full space-y-6">
          {/* Icon */}
          <div className="mx-auto w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertCircle className="h-10 w-10 text-destructive" />
          </div>

          {/* Message */}
          <div className="text-center space-y-2">
            <h2 className="font-display text-2xl font-bold text-navy">
              Unable to Load Products
            </h2>
            <p className="text-navy/60">
              We're having trouble loading the products. This might be a temporary issue.
            </p>
          </div>

          {/* Error Details (Development Only) */}
          {error.message && process.env.NODE_ENV === "development" && (
            <details className="text-xs bg-white p-4 rounded-lg border border-border">
              <summary className="cursor-pointer font-medium mb-2 text-navy">
                Error Details
              </summary>
              <pre className="overflow-auto whitespace-pre-wrap text-navy/70 text-xs">
                {error.message}
              </pre>
              {error.digest && (
                <p className="mt-2 text-navy/60">Error ID: {error.digest}</p>
              )}
            </details>
          )}

          {/* Actions */}
          <div className="space-y-3">
            <Button
              onClick={reset}
              className="w-full bg-navy hover:bg-navy-light"
              size="lg"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>

            <div className="flex gap-3">
              <Button
                asChild
                variant="outline"
                className="flex-1"
              >
                <Link href="/categories">
                  Browse Categories
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="flex-1"
              >
                <Link href="/">
                  <Home className="h-4 w-4 mr-2" />
                  Go Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
