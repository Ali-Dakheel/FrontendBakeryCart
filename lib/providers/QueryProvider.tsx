"use client";

import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        // Global error handling for queries
        queryCache: new QueryCache({
          onError: (error: Error, query) => {
            // Suppress 401 errors for user query (expected when not authenticated)
            const isUserQuery = query.queryKey[0] === 'user';
            const is401Error = error.message.includes('401');

            if (isUserQuery && is401Error) {
              // Silent fail - guest users are expected to get 401
              return;
            }

            // Log other errors for debugging
            console.error('Query error:', error);

            // Show user-friendly message for network errors
            if (error.message.includes('Network') || error.message.includes('fetch')) {
              toast.error('Network error. Please check your connection and try again.');
            }
          },
        }),
        // Global error handling for mutations
        mutationCache: new MutationCache({
          onError: (error: Error) => {
            // Suppress expected errors (401 for login failures, validation errors, etc.)
            // These are handled by individual mutation error handlers
            const is401Error = error.message.includes('401');
            const is422Error = error.message.includes('422'); // Validation errors

            if (is401Error || is422Error) {
              // Silent - these are expected user errors handled by mutation onError
              return;
            }

            // Log unexpected errors for debugging
            console.error('Mutation error:', error);
          },
        }),
        defaultOptions: {
          queries: {
            // Caching & Staleness
            staleTime: 60 * 1000, // 1 minute - data is considered fresh for 1 min
            gcTime: 5 * 60 * 1000, // 5 minutes - garbage collection time

            // Refetch Configuration
            refetchOnWindowFocus: false, // Don't refetch when user returns to window
            refetchOnReconnect: true, // Refetch when reconnecting to network
            refetchOnMount: true, // Refetch when component mounts if stale

            // Retry Configuration
            retry: 1, // Only retry failed requests once
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff

            // Performance
            networkMode: 'online', // Only run queries when online
          },
          mutations: {
            // Retry Configuration for mutations
            retry: 0, // Don't retry mutations by default
            networkMode: 'online',
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
