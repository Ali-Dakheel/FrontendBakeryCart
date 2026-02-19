"use client";

import { useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { toast } from "sonner";
import { useOnlineStatus } from "@/lib/hooks/useOnlineStatus";
import { initErrorMonitoring } from "@/lib/utils/errorMonitor";
import { getQueryClient } from "@/lib/utils/queryClient";

export { getQueryClient };

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
