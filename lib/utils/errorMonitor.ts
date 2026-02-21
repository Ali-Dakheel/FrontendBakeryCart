import { toast } from "sonner";


export function initErrorMonitoring(): void {
  if (typeof window === "undefined") return;

  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason;

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
