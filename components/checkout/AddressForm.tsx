"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import type { AddressForm as AddressFormData } from "@/lib/types";

interface AddressFormProps {
  initialData?: Partial<AddressFormData>;
  onSubmit?: (data: AddressFormData) => void;
  onChange?: (data: AddressFormData) => void;
}

export function AddressForm({ initialData, onSubmit, onChange }: AddressFormProps) {
  const [formData, setFormData] = useState<AddressFormData>({
    label: initialData?.label || "",
    street_address: initialData?.street_address || "",
    building: initialData?.building || "",
    flat: initialData?.flat || "",
    area: initialData?.area || "",
    city: initialData?.city || "Bahrain",
    block: initialData?.block || "",
    additional_directions: initialData?.additional_directions || "",
    is_default: initialData?.is_default || false,
  });

  const handleChange = (field: keyof AddressFormData, value: string | boolean) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onChange?.(newData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Label */}
      <div className="space-y-2">
        <Label htmlFor="label">Address Label *</Label>
        <Input
          id="label"
          placeholder="e.g., Home, Work, Office"
          value={formData.label}
          onChange={(e) => handleChange("label", e.target.value)}
          required
        />
      </div>

      {/* Street Address */}
      <div className="space-y-2">
        <Label htmlFor="street_address">Street Address *</Label>
        <Input
          id="street_address"
          placeholder="Street name and number"
          value={formData.street_address}
          onChange={(e) => handleChange("street_address", e.target.value)}
          required
        />
      </div>

      {/* Building & Flat */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="building">Building</Label>
          <Input
            id="building"
            placeholder="Building no."
            value={formData.building}
            onChange={(e) => handleChange("building", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="flat">Flat/Apartment</Label>
          <Input
            id="flat"
            placeholder="Flat no."
            value={formData.flat}
            onChange={(e) => handleChange("flat", e.target.value)}
          />
        </div>
      </div>

      {/* Area & Block */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="area">Area *</Label>
          <Input
            id="area"
            placeholder="e.g., SAAR, Juffair"
            value={formData.area}
            onChange={(e) => handleChange("area", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="block">Block</Label>
          <Input
            id="block"
            placeholder="Block no."
            value={formData.block}
            onChange={(e) => handleChange("block", e.target.value)}
          />
        </div>
      </div>

      {/* City */}
      <div className="space-y-2">
        <Label htmlFor="city">City *</Label>
        <Input
          id="city"
          value={formData.city}
          onChange={(e) => handleChange("city", e.target.value)}
          required
        />
      </div>

      {/* Additional Directions */}
      <div className="space-y-2">
        <Label htmlFor="additional_directions">Additional Directions</Label>
        <Textarea
          id="additional_directions"
          placeholder="Landmarks, special instructions..."
          value={formData.additional_directions}
          onChange={(e) => handleChange("additional_directions", e.target.value)}
          rows={3}
        />
      </div>

      {/* Set as Default */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="is_default"
          checked={formData.is_default}
          onCheckedChange={(checked) =>
            handleChange("is_default", checked === true)
          }
        />
        <Label
          htmlFor="is_default"
          className="text-sm font-normal cursor-pointer"
        >
          Set as default address
        </Label>
      </div>
    </form>
  );
}
