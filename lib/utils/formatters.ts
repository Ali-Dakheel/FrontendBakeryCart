import { CURRENCY } from "./constants";
import { format } from "date-fns";


export function toNumber(value: number | string): number {
  return typeof value === "number" ? value : parseFloat(value);
}


export function formatBHD(amount: number | string, locale: string = 'en'): string {
  const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;

  if (isNaN(numAmount) || !isFinite(numAmount)) {
    const currency = locale === 'ar' ? 'د.ب' : CURRENCY.code;
    return `0.000 ${currency}`;
  }

  const currency = locale === 'ar' ? 'د.ب' : CURRENCY.code;
  return `${numAmount.toFixed(CURRENCY.decimals)} ${currency}`;
}


export function formatDate(date: string | Date): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return format(dateObj, "MMMM d, yyyy");
}


export function formatDateTime(date: string | Date): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return format(dateObj, "MMM d, yyyy 'at' h:mm a");
}


export function calculateVAT(amount: number, vatRate: number = 0.1): number {
  return amount * vatRate;
}


export function calculateTotalWithVAT(
  amount: number,
  vatRate: number = 0.1
): number {
  return amount + calculateVAT(amount, vatRate);
}


export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}
