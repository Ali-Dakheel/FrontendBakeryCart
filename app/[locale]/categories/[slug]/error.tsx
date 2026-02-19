"use client";

import { AlertCircle, RefreshCw, ShoppingBag, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CategoryError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-lg border-2 border-destructive/50 p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertCircle className="h-6 w-6 text-destructive" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-navy">
              Category Unavailable
            </h1>
            <p className="text-sm text-navy/60">
              We couldn&apos;t load this category&apos;s products
            </p>
          </div>
        </div>

        <div className="bg-cream-dark p-4 rounded-md">
          <p className="text-sm text-navy/70 leading-relaxed">
            This could be a temporary issue or the category may no longer exist.
            Try refreshing the page or browse all products.
          </p>
        </div>

        {error.message && process.env.NODE_ENV === "development" && (
          <details className="text-xs bg-muted p-3 rounded-md border border-border">
            <summary className="cursor-pointer font-medium mb-2 text-navy">
              Technical Details
            </summary>
            <pre className="overflow-auto whitespace-pre-wrap text-navy/70">
              {error.message}
            </pre>
            {error.digest && (
              <p className="mt-2 text-navy/60">Error ID: {error.digest}</p>
            )}
          </details>
        )}

        <div className="space-y-3">
          <Button
            onClick={reset}
            className="w-full bg-navy hover:bg-navy-light"
            size="lg"
          >
            <RefreshCw className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
            Try Again
          </Button>

          <div className="flex gap-3">
            <Button asChild variant="outline" className="flex-1">
              <Link href="/products">
                <ShoppingBag className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                All Products
              </Link>
            </Button>
            <Button asChild variant="ghost" className="flex-1">
              <Link href="/categories">
                <Home className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                All Categories
              </Link>
            </Button>
          </div>
        </div>

        <p className="text-xs text-center text-navy/60">
          If this problem persists, please{" "}
          <Link href="/contact" className="text-sky hover:underline font-medium">
            contact our support team
          </Link>
        </p>
      </div>
    </div>
  );
}
