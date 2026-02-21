
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
