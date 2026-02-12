// Address Types

export interface Address {
  id: number;
  user_id: number;
  label: string;
  street_address: string;
  building?: string;
  flat?: string;
  area: string;
  city: string;
  block?: string;
  additional_directions?: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface AddressForm {
  label: string;
  street_address: string;
  building?: string;
  flat?: string;
  area: string;
  city: string;
  block?: string;
  additional_directions?: string;
  is_default?: boolean;
}
