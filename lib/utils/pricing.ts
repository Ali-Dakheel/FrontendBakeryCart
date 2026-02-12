/**
 * Determines the pricing unit translation key based on product name
 *
 * Rules:
 * - Mini croissants: per kg
 * - Medium/Jumbo croissants: per box
 * - Babka: per piece
 * - Everything else: per box
 *
 * @param productName - The product name
 * @returns Translation key like "products.perBox", "products.perKg", "products.perPiece"
 */
export function getPricingUnitKey(productName: string): string {
  const nameLower = productName.toLowerCase();

  // Check for babka - priced per piece
  if (nameLower.includes('babka')) {
    return 'products.perPiece';
  }

  // Check for mini croissants - priced per kg
  if (nameLower.includes('croissant') && nameLower.includes('mini')) {
    return 'products.perKg';
  }

  // Medium/Jumbo croissants and everything else - per box
  return 'products.perBox';
}

/**
 * Determines the pricing unit based on product name
 *
 * Rules:
 * - Mini croissants: per kg
 * - Medium/Jumbo croissants: per box
 * - Babka: per piece
 * - Everything else: per box
 *
 * @deprecated Use getPricingUnitKey with translations instead
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
