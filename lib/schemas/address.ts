import { z } from "zod";


export const addressBaseSchema = z.object({
  label:                 z.string().min(1),
  street_address:        z.string().min(1),
  building:              z.string().optional(),
  flat:                  z.string().optional(),
  area:                  z.string().min(1),
  city:                  z.string().min(1).default("Bahrain"),
  block:                 z.string().optional(),
  additional_directions: z.string().optional(),
  is_default:            z.boolean().optional().default(false),
});

export type AddressFormData = z.infer<typeof addressBaseSchema>;


export function createAddressSchema(t: (key: string) => string) {
  return z.object({
    label: z
      .string()
      .min(1, t("validation.addressLabelRequired")),
    street_address: z
      .string()
      .min(1, t("validation.streetRequired")),
    building:              z.string().optional(),
    flat:                  z.string().optional(),
    area: z
      .string()
      .min(1, t("validation.areaRequired")),
    city: z
      .string()
      .min(1, t("validation.cityRequired"))
      .default("Bahrain"),
    block:                 z.string().optional(),
    additional_directions: z.string().optional(),
    is_default:            z.boolean().optional().default(false),
  });
}
