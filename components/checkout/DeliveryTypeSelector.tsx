"use client";

import { Truck, Store } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface DeliveryTypeSelectorProps {
  value: "delivery" | "pickup";
  onChange: (value: "delivery" | "pickup") => void;
}

export function DeliveryTypeSelector({ value, onChange }: DeliveryTypeSelectorProps) {
  const t = useTranslations("checkout");

  const options = [
    {
      id: "delivery" as const,
      icon: Truck,
      title: t("deliveryOption"),
      desc: t("deliveryOptionDesc"),
    },
    {
      id: "pickup" as const,
      icon: Store,
      title: t("pickupOption"),
      desc: t("pickupOptionDesc"),
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-bold text-navy">{t("fulfillmentType")}</h2>
      <RadioGroup
        value={value}
        onValueChange={(v) => onChange(v as "delivery" | "pickup")}
        className="grid grid-cols-2 gap-3"
      >
        {options.map(({ id, icon: Icon, title, desc }) => (
          <label
            key={id}
            htmlFor={`delivery-type-${id}`}
            className={cn(
              "flex flex-col items-center gap-2 rounded-xl border-2 p-4 cursor-pointer transition-colors",
              value === id
                ? "border-sky bg-sky/5"
                : "border-navy/10 hover:border-sky/40"
            )}
          >
            <RadioGroupItem value={id} id={`delivery-type-${id}`} className="sr-only" />
            <Icon
              className={cn(
                "h-6 w-6 transition-colors",
                value === id ? "text-sky" : "text-navy/40"
              )}
            />
            <span
              className={cn(
                "font-semibold text-sm transition-colors",
                value === id ? "text-sky" : "text-navy"
              )}
            >
              {title}
            </span>
            <span className="text-xs text-navy/60 text-center">{desc}</span>
          </label>
        ))}
      </RadioGroup>
    </div>
  );
}
