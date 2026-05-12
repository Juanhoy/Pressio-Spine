/**
 * Utility to handle global terminology changes across the site.
 * This is useful for replacing terms found in CMS data without direct database access.
 */
export function fixTerminology(text: string): string {
  if (!text) return text;
  
  return text
    .replace(/designed to support superior fusion biology/gi, "optimized to support fusion biology")
    .replace(/for superior fusion biology/gi, "optimized to support fusion biology")
    .replace(/superior fusion biology/gi, "optimized to support fusion biology")
    .replace(/\b(dynamic\s+)?fusion\b/gi, (m) => m[0] === m[0].toUpperCase() ? "Dynamic Fusion" : "dynamic fusion");
}
