"use client";

import { useEffect } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { createAddressSchema, type AddressFormData } from "@/lib/schemas/address";
import type { AddressForm as AddressFormValues } from "@/lib/types";
import { useTranslations } from "next-intl";

interface AddressFormProps {
  initialData?: Partial<AddressFormValues>;
  onSubmit?: (data: AddressFormValues) => void;
  onChange?: (data: AddressFormValues) => void;
}

export function AddressForm({ initialData, onSubmit, onChange }: AddressFormProps) {
  const t = useTranslations();
  const schema = createAddressSchema((key) => t(key as never));

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<AddressFormData>({
    resolver: zodResolver(schema) as Resolver<AddressFormData>,
    mode: "onChange",
    defaultValues: {
      label: initialData?.label ?? "",
      street_address: initialData?.street_address ?? "",
      building: initialData?.building ?? "",
      flat: initialData?.flat ?? "",
      area: initialData?.area ?? "",
      city: initialData?.city ?? "Bahrain",
      block: initialData?.block ?? "",
      additional_directions: initialData?.additional_directions ?? "",
      is_default: initialData?.is_default ?? false,
    },
  });

  // Notify parent of live data when form is valid
  const watched = watch();
  useEffect(() => {
    if (onChange && isValid) {
      onChange(watched as AddressFormValues);
    }
  }, [JSON.stringify(watched), isValid]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFormSubmit = (data: AddressFormData) => {
    onSubmit?.(data as AddressFormValues);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {/* Label */}
      <div className="space-y-2">
        <Label htmlFor="label">Address Label *</Label>
        <Input
          id="label"
          placeholder="e.g., Home, Work, Office"
          aria-required="true"
          aria-invalid={!!errors.label}
          aria-describedby={errors.label ? "label-error" : undefined}
          {...register("label")}
        />
        {errors.label && (
          <p id="label-error" role="alert" className="text-xs text-destructive">
            {errors.label.message}
          </p>
        )}
      </div>

      {/* Street Address */}
      <div className="space-y-2">
        <Label htmlFor="street_address">Street Address *</Label>
        <Input
          id="street_address"
          placeholder="Street name and number"
          aria-required="true"
          aria-invalid={!!errors.street_address}
          aria-describedby={errors.street_address ? "street-error" : undefined}
          {...register("street_address")}
        />
        {errors.street_address && (
          <p id="street-error" role="alert" className="text-xs text-destructive">
            {errors.street_address.message}
          </p>
        )}
      </div>

      {/* Building & Flat */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="building">Building</Label>
          <Input
            id="building"
            placeholder="Building no."
            {...register("building")}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="flat">Flat/Apartment</Label>
          <Input
            id="flat"
            placeholder="Flat no."
            {...register("flat")}
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
            aria-required="true"
            aria-invalid={!!errors.area}
            aria-describedby={errors.area ? "area-error" : undefined}
            {...register("area")}
          />
          {errors.area && (
            <p id="area-error" role="alert" className="text-xs text-destructive">
              {errors.area.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="block">Block</Label>
          <Input
            id="block"
            placeholder="Block no."
            {...register("block")}
          />
        </div>
      </div>

      {/* City */}
      <div className="space-y-2">
        <Label htmlFor="city">City *</Label>
        <Input
          id="city"
          aria-required="true"
          aria-invalid={!!errors.city}
          aria-describedby={errors.city ? "city-error" : undefined}
          {...register("city")}
        />
        {errors.city && (
          <p id="city-error" role="alert" className="text-xs text-destructive">
            {errors.city.message}
          </p>
        )}
      </div>

      {/* Additional Directions */}
      <div className="space-y-2">
        <Label htmlFor="additional_directions">Additional Directions</Label>
        <Textarea
          id="additional_directions"
          placeholder="Landmarks, special instructions..."
          rows={3}
          {...register("additional_directions")}
        />
      </div>

      {/* Set as Default */}
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <Checkbox
          id="is_default"
          onCheckedChange={(checked) => setValue("is_default", checked === true)}
          defaultChecked={initialData?.is_default ?? false}
        />
        <Label htmlFor="is_default" className="text-sm font-normal cursor-pointer">
          Set as default address
        </Label>
      </div>
    </form>
  );
}
