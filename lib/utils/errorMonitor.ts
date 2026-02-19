import { toast } from "sonner";

/**
 * Initialises a global handler for unhandled promise rejections.
 * Call once from the root layout's client component (e.g. inside a useEffect).
 * Future: pipe `event.reason` to Sentry / LogRocket.
 */
export function initErrorMonitoring(): void {
  if (typeof window === "undefined") return;

  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason;

    // Show a toast only for network errors — API errors already have toast handling
    const message: string =
      reason instanceof Error ? reason.message : String(reason ?? "");

    if (
      message.includes("Network") ||
      message.includes("fetch") ||
      message.includes("Failed to fetch")
    ) {
      toast.error("Connection lost. Please check your network.");
    }
  });
}
