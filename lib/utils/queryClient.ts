import { QueryClient, QueryCache, MutationCache, isServer, defaultShouldDehydrateQuery } from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    queryCache: new QueryCache({
      onError: (error: Error, query) => {
        if (isServer) return;

        const isUserQuery = query.queryKey[0] === "user";
        const is401Error = error.message.includes("401");

        if (isUserQuery && is401Error) return; 
      },
    }),
    mutationCache: new MutationCache({
      onError: (error: Error) => {
        const is401Error = error.message.includes("401");
        const is422Error = error.message.includes("422");

        if (is401Error || is422Error) return; 
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
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) || query.state.status === "pending",
        shouldRedactErrors: () => false,
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
 * No "use client" directive — safe to call from Server Components.
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
