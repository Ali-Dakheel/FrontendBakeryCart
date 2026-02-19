"use client";

import { AlertCircle, RefreshCw, ArrowLeft, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

/**
 * Checkout Error Boundary
 * Handles errors specific to the checkout flow
 */
export default function CheckoutError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-lg border-2 border-destructive/50 p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertCircle className="h-6 w-6 text-destructive" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-navy">
              Checkout Error
            </h1>
            <p className="text-sm text-navy/60">
              We encountered an issue processing your checkout
            </p>
          </div>
        </div>

        {/* Message */}
        <div className="bg-cream-dark p-4 rounded-md">
          <p className="text-sm text-navy/70 leading-relaxed">
            Don't worry, your cart is safe! This could be a temporary issue.
            Please try again, or go back to your cart to review your items.
          </p>
        </div>

        {/* Error Details (Development Only) */}
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
              <Link href="/cart">
                <ShoppingBag className="h-4 w-4 mr-2" />
                View Cart
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="flex-1"
            >
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Home
              </Link>
            </Button>
          </div>
        </div>

        {/* Help Text */}
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
