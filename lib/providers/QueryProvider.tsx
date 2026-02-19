"use client";

import { useEffect } from "react";
import { QueryClient, QueryClientProvider, QueryCache, MutationCache, isServer } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { toast } from "sonner";
import { useOnlineStatus } from "@/lib/hooks/useOnlineStatus";
import { initErrorMonitoring } from "@/lib/utils/errorMonitor";

function makeQueryClient() {
  return new QueryClient({
    queryCache: new QueryCache({
      onError: (error: Error, query) => {
        const isUserQuery = query.queryKey[0] === "user";
        const is401Error = error.message.includes("401");

        if (isUserQuery && is401Error) return; // Silent — guests are expected to get 401

        console.error("Query error:", error);

        if (error.message.includes("Network") || error.message.includes("fetch")) {
          toast.error("Network error. Please check your connection and try again.");
        }
      },
    }),
    mutationCache: new MutationCache({
      onError: (error: Error) => {
        const is401Error = error.message.includes("401");
        const is422Error = error.message.includes("422");

        if (is401Error || is422Error) return; // Handled by individual mutation onError

        console.error("Mutation error:", error);
      },
    }),
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        gcTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        refetchOnMount: true,
        retry: 1,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        networkMode: "online",
      },
      mutations: {
        retry: 0,
        networkMode: "online",
      },
    },
  });
}

// Singleton for the browser — one QueryClient per browser session
let browserQueryClient: QueryClient | undefined = undefined;

/**
 * Returns the shared QueryClient instance.
 * On the server: fresh client per request (no shared state between requests).
 * On the client: stable singleton so cache survives navigations.
 *
 * Use in Server Components for HydrationBoundary prefetching.
 */
export function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  }
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}

function AppMonitor() {
  const isOnline = useOnlineStatus();

  useEffect(() => {
    initErrorMonitoring();
  }, []);

  useEffect(() => {
    if (!isOnline) {
      toast.error("You are offline. Some features may not work.", { id: "offline-toast", duration: Infinity });
    } else {
      toast.dismiss("offline-toast");
    }
  }, [isOnline]);

  return null;
}

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AppMonitor />
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
