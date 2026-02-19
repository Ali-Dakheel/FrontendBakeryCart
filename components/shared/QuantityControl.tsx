"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuantityControlProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (newValue: number) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  productName?: string;
}

const SIZE_CONFIG = {
  sm: {
    button: "h-7 w-7",
    icon: "h-3 w-3",
    count: "w-8 text-sm font-medium",
    variant: "outline" as const,
    container: "gap-2",
    border: "",
  },
  md: {
    button: "h-9 w-9",
    icon: "h-4 w-4",
    count: "w-12 font-semibold",
    variant: "ghost" as const,
    container: "gap-0",
    border: "border-2 border-border rounded-lg",
  },
  lg: {
    button: "h-11 w-11",
    icon: "h-4 w-4",
    count: "w-12 font-semibold",
    variant: "ghost" as const,
    container: "gap-0",
    border: "border-2 border-border rounded-lg",
  },
} as const;

export function QuantityControl({
  value,
  min = 1,
  max,
  onChange,
  disabled = false,
  size = "md",
  productName,
}: QuantityControlProps) {
  const cfg = SIZE_CONFIG[size];

  return (
    <div className={cn("flex items-center", cfg.container, cfg.border)}>
      <Button
        variant={cfg.variant}
        size="icon"
        className={cfg.button}
        onClick={() => onChange(value - 1)}
        disabled={disabled || value <= min}
        aria-label={productName ? `Decrease quantity of ${productName}` : "Decrease quantity"}
      >
        <Minus className={cfg.icon} />
      </Button>
      <span
        className={cn("text-center text-navy", cfg.count)}
        aria-live="polite"
        aria-label={`Quantity: ${value}`}
      >
        {value}
      </span>
      <Button
        variant={cfg.variant}
        size="icon"
        className={cfg.button}
        onClick={() => onChange(value + 1)}
        disabled={disabled || (max !== undefined && value >= max)}
        aria-label={productName ? `Increase quantity of ${productName}` : "Increase quantity"}
      >
        <Plus className={cfg.icon} />
      </Button>
    </div>
  );
}
