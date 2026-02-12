"use client";

import { CreditCard, Banknote, Wallet } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PAYMENT_METHODS, PAYMENT_METHOD_LABELS } from "@/lib/utils/constants";

interface PaymentMethodSelectorProps {
  selectedMethod: string;
  onMethodChange: (method: string) => void;
}

export function PaymentMethodSelector({
  selectedMethod,
  onMethodChange,
}: PaymentMethodSelectorProps) {
  const paymentMethods = [
    {
      value: PAYMENT_METHODS.CASH,
      label: PAYMENT_METHOD_LABELS.cash,
      icon: Banknote,
      description: "Pay with cash when your order is delivered",
      available: true,
    },
    {
      value: PAYMENT_METHODS.CARD,
      label: PAYMENT_METHOD_LABELS.card,
      icon: CreditCard,
      description: "Pay securely with your credit or debit card",
      available: false,
      comingSoon: true,
    },
    {
      value: PAYMENT_METHODS.BENEFIT_PAY,
      label: PAYMENT_METHOD_LABELS.benefit_pay,
      icon: Wallet,
      description: "Pay using Benefit Pay mobile app",
      available: false,
      comingSoon: true,
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-navy">Payment Method</h3>

      <RadioGroup value={selectedMethod} onValueChange={onMethodChange}>
        <div className="space-y-3">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            return (
              <div
                key={method.value}
                className={cn(
                  "relative flex items-start space-x-3 rounded-lg border-2 p-4 transition-all",
                  method.available
                    ? "cursor-pointer hover:border-navy/50"
                    : "cursor-not-allowed opacity-60",
                  selectedMethod === method.value && method.available
                    ? "border-navy bg-navy/5"
                    : "border-border"
                )}
                onClick={() => method.available && onMethodChange(method.value)}
              >
                <RadioGroupItem
                  value={method.value}
                  id={`payment-${method.value}`}
                  disabled={!method.available}
                  className="mt-1 shrink-0"
                />
                <Label
                  htmlFor={`payment-${method.value}`}
                  className={cn(
                    "flex-1",
                    method.available ? "cursor-pointer" : "cursor-not-allowed"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <Icon className="h-5 w-5 text-navy" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-navy">
                          {method.label}
                        </span>
                        {method.comingSoon && (
                          <Badge variant="secondary" className="text-xs">
                            Coming Soon
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-navy/60">{method.description}</p>
                    </div>
                  </div>
                </Label>
              </div>
            );
          })}
        </div>
      </RadioGroup>

      {/* Info Note */}
      <div className="bg-sky/10 border border-sky/20 rounded-lg p-3">
        <p className="text-xs text-navy/70">
          <strong>Note:</strong> For cash on delivery, please have exact change ready.
          Our delivery team will collect payment when your order arrives.
        </p>
      </div>
    </div>
  );
}
