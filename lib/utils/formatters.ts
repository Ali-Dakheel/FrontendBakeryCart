import { CURRENCY } from "./constants";
import { format } from "date-fns";

/**
 * Safely convert a number or numeric string to a number
 */
export function toNumber(value: number | string): number {
  return typeof value === "number" ? value : parseFloat(value);
}

/**
 * Format price in BHD with 3 decimal places
 * @param amount - The amount to format
 * @param locale - The locale for currency symbol (default: 'en')
 * @returns Formatted string like "0.500 BHD" or "0.500 د.ب"
 */
export function formatBHD(amount: number | string, locale: string = 'en'): string {
  const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;

  // Handle invalid numbers
  if (isNaN(numAmount) || !isFinite(numAmount)) {
    const currency = locale === 'ar' ? 'د.ب' : CURRENCY.code;
    return `0.000 ${currency}`;
  }

  const currency = locale === 'ar' ? 'د.ب' : CURRENCY.code;
  return `${numAmount.toFixed(CURRENCY.decimals)} ${currency}`;
}

/**
 * Format date in a readable format
 * @param date - Date string or Date object
 * @returns Formatted date like "January 1, 2026"
 */
export function formatDate(date: string | Date): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return format(dateObj, "MMMM d, yyyy");
}

/**
 * Format datetime in a readable format
 * @param date - Date string or Date object
 * @returns Formatted datetime like "Jan 1, 2026 at 10:30 AM"
 */
export function formatDateTime(date: string | Date): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return format(dateObj, "MMM d, yyyy 'at' h:mm a");
}

/**
 * Calculate VAT amount
 * @param amount - Base amount
 * @param vatRate - VAT rate (default 10%)
 * @returns VAT amount
 */
export function calculateVAT(amount: number, vatRate: number = 0.1): number {
  return amount * vatRate;
}

/**
 * Calculate total with VAT
 * @param amount - Base amount
 * @param vatRate - VAT rate (default 10%)
 * @returns Total with VAT
 */
export function calculateTotalWithVAT(
  amount: number,
  vatRate: number = 0.1
): number {
  return amount + calculateVAT(amount, vatRate);
}

/**
 * Truncate text to specified length
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}
