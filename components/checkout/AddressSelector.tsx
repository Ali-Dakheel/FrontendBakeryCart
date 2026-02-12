"use client";

import { MapPin, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/EmptyState";
import { cn } from "@/lib/utils";
import type { Address } from "@/lib/types";

interface AddressSelectorProps {
  addresses: Address[];
  selectedAddressId?: number;
  onAddressChange: (addressId: number) => void;
  onAddNew: () => void;
}

export function AddressSelector({
  addresses,
  selectedAddressId,
  onAddressChange,
  onAddNew,
}: AddressSelectorProps) {
  if (addresses.length === 0) {
    return (
      <EmptyState
        icon={MapPin}
        title="No saved addresses"
        description="Add a delivery address to continue with your order."
        action={{ label: "Add New Address", onClick: onAddNew }}
        className="py-4"
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-navy">Delivery Address</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={onAddNew}
          className="text-navy hover:text-sky"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add New
        </Button>
      </div>

      <RadioGroup
        value={selectedAddressId?.toString()}
        onValueChange={(value) => onAddressChange(parseInt(value))}
      >
        <div className="space-y-3">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={cn(
                "relative flex items-start space-x-3 rounded-lg border-2 p-4 cursor-pointer transition-all",
                selectedAddressId === address.id
                  ? "border-navy bg-navy/5"
                  : "border-border hover:border-navy/50"
              )}
              onClick={() => onAddressChange(address.id)}
            >
              <RadioGroupItem
                value={address.id.toString()}
                id={`address-${address.id}`}
                className="mt-1 shrink-0"
              />
              <Label
                htmlFor={`address-${address.id}`}
                className="flex-1 cursor-pointer"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-navy">{address.label}</span>
                    {address.is_default && (
                      <Badge variant="secondary" className="text-xs">
                        Default
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-navy/70 space-y-0.5">
                    <p>{address.street_address}</p>
                    {(address.building || address.flat) && (
                      <p>
                        {address.building && `Building ${address.building}`}
                        {address.building && address.flat && ", "}
                        {address.flat && `Flat ${address.flat}`}
                      </p>
                    )}
                    <p>
                      {address.area}
                      {address.block && `, Block ${address.block}`}
                    </p>
                    <p>{address.city}</p>
                    {address.additional_directions && (
                      <p className="text-xs italic mt-1">
                        {address.additional_directions}
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
