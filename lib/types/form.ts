// Form Types

import type { AddressForm } from "./address";

export interface CheckoutForm {
  delivery_type: "delivery" | "pickup";
  address_id?: number;
  payment_method: string;
  notes?: string;
  // If creating new address
  address?: AddressForm;
}
