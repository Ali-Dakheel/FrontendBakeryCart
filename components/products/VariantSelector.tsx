"use client";

import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import type { ProductVariant } from "@/lib/types";
import { cn } from "@/lib/utils";

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariantId?: number;
  onVariantChange: (variantId: number) => void;
}

export function VariantSelector({
  variants,
  selectedVariantId,
  onVariantChange,
}: VariantSelectorProps) {
  const t = useTranslations();

  if (!variants || variants.length === 0) return null;

  return (
    <div className="space-y-3">
      <Label className="text-base font-semibold text-navy">{t('products.selectVariant')}</Label>
      <RadioGroup
        value={selectedVariantId?.toString()}
        onValueChange={(value) => onVariantChange(parseInt(value))}
      >
        <div className="space-y-2">
          {variants.map((variant) => (
            <div
              key={variant.id}
              className={cn(
                "relative flex items-center space-x-3 rtl:space-x-reverse rounded-lg border-2 p-4 cursor-pointer transition-all",
                selectedVariantId === variant.id
                  ? "border-navy bg-navy/5"
                  : "border-border hover:border-navy/50",
                !variant.is_available && "opacity-50 cursor-not-allowed"
              )}
              onClick={() => variant.is_available && onVariantChange(variant.id)}
            >
              <RadioGroupItem
                value={variant.id.toString()}
                id={`variant-${variant.id}`}
                disabled={!variant.is_available}
                className="shrink-0"
              />
              <Label
                htmlFor={`variant-${variant.id}`}
                className={cn(
                  "flex-1 cursor-pointer",
                  !variant.is_available && "cursor-not-allowed"
                )}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-navy">{variant.name}</p>
                    <p className="text-sm text-navy/60">
                      {variant.quantity} {variant.quantity === 1 ? t('products.piece') : t('products.pieces')}
                    </p>
                  </div>
                  <div className="text-right">
                    <PriceDisplay amount={variant.price} className="text-xl" />
                    {!variant.is_available && (
                      <p className="text-xs text-red-600 mt-1">{t('products.outOfStock')}</p>
                    )}
                    {variant.is_available && variant.stock_quantity !== undefined && variant.stock_quantity < 10 && (
                      <p className="text-xs text-orange-600 mt-1">
                        {t('products.onlyLeft')} {variant.stock_quantity} {t('products.leftInStock')}
                      </p>
                    )}
                  </div>
                </div>
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
