"use client";

import { useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { toast } from "sonner";
import { useOnlineStatus } from "@/lib/hooks/useOnlineStatus";
import { initErrorMonitoring } from "@/lib/utils/errorMonitor";
import { getQueryClient } from "@/lib/utils/queryClient";
import { useUser } from "@/lib/hooks/useAuth";

export { getQueryClient };

function AuthSync() {
  const { data: user, isError } = useUser();

  useEffect(() => {
    if (user) {
      document.cookie = 'easybake_auth=1; path=/; SameSite=Lax';
    } else if (isError) {
      document.cookie = 'easybake_auth=; path=/; SameSite=Lax; Max-Age=0';
    }
  }, [user, isError]);

  return null;
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
      <AuthSync />
      <AppMonitor />
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
