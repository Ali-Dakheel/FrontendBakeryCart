"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="flex items-center justify-center gap-2 px-6 py-3 rounded-md border border-navy/20 text-navy hover:bg-navy/5 transition-colors flex-1 sm:flex-none sm:min-w-45 text-sm font-medium"
    >
      <ArrowLeft className="h-4 w-4" />
      Go Back
    </button>
  );
}
