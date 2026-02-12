// Order Status
export const ORDER_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  PREPARING: "preparing",
  OUT_FOR_DELIVERY: "out_for_delivery",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
} as const;

export const ORDER_STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  preparing: "Preparing",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export const ORDER_STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  preparing: "bg-purple-100 text-purple-800",
  out_for_delivery: "bg-indigo-100 text-indigo-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

// Payment Methods
export const PAYMENT_METHODS = {
  CASH: "cash",
  CARD: "card",
  BENEFIT_PAY: "benefit_pay",
  BANK_TRANSFER: "bank_transfer",
} as const;

export const PAYMENT_METHOD_LABELS: Record<string, string> = {
  cash: "Cash on Delivery",
  card: "Credit/Debit Card",
  benefit_pay: "Benefit Pay",
  bank_transfer: "Bank Transfer",
};

// Business Hours
export const BUSINESS_HOURS = {
  openTime: "6:00 AM",
  closeTime: "2:00 PM",
  workingDays: "Saturday - Thursday",
  closedDay: "Friday",
};

// Contact Information
export const CONTACT_INFO = {
  instagram: "@easybake.bh",
  location: "SAAR-Maqabah, Block 509, Bahrain",
  brand: "France Factory",
};

// VAT Rate
export const VAT_RATE = 0.1; // 10%

// Currency
export const CURRENCY = {
  code: "BHD",
  symbol: "BD",
  decimals: 3,
};
