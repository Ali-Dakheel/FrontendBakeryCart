/**
 * Determines the pricing unit based on product name
 *
 * Rules:
 * - Mini croissants: per kg
 * - Medium/Jumbo croissants: per box
 * - Babka: per piece
 * - Everything else: per box
 */
export function getPricingUnit(productName: string): string {
  const nameLower = productName.toLowerCase();

  // Check for babka - priced per piece
  if (nameLower.includes('babka')) {
    return 'per piece';
  }

  // Check for mini croissants - priced per kg
  if (nameLower.includes('croissant') && nameLower.includes('mini')) {
    return 'per kg';
  }

  // Medium/Jumbo croissants and everything else - per box
  return 'per box';
}
