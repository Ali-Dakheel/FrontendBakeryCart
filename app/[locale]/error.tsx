"use client";

import { AlertCircle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <Card className="max-w-md w-full border-destructive/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <CardTitle className="text-destructive">Something went wrong</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            We encountered an unexpected error. Please try refreshing the page or return to the home page.
          </p>
          {error.message && process.env.NODE_ENV === "development" && (
            <details className="text-xs bg-muted p-3 rounded-md">
              <summary className="cursor-pointer font-medium mb-2">Error Details</summary>
              <pre className="overflow-auto whitespace-pre-wrap">{error.message}</pre>
              {error.digest && (
                <p className="mt-2 text-muted-foreground">Error ID: {error.digest}</p>
              )}
            </details>
          )}
          <div className="flex gap-2">
            <Button
              onClick={reset}
              className="flex-1"
              variant="outline"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
            <Button
              asChild
              className="flex-1 bg-navy hover:bg-navy-light"
            >
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
