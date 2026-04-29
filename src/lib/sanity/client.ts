// ─── Sanity client used on the server (data fetching) ─────────────────────────
import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder-id";

// Sanity requires projectId to only have a-z, 0-9 and dashes.
const sanitizedProjectId = projectId.replace(/[^a-z0-9-]/gi, "-").toLowerCase();

const client = createClient({
  projectId: sanitizedProjectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01",
  token: process.env.SANITY_API_READ_TOKEN === "your-read-token" ? undefined : process.env.SANITY_API_READ_TOKEN,
  useCdn: process.env.NODE_ENV === "production",
});

/**
 * Safe fetch wrapper that returns empty data immediately if no real project ID is set.
 * This prevents the app from hanging on pages that fetch Sanity data.
 */
export const sanityFetch = async <T>(query: string, params: any = {}): Promise<T> => {
  if (sanitizedProjectId === "placeholder-id") {
    console.warn("⚠️ Sanity fetching skipped: NEXT_PUBLIC_SANITY_PROJECT_ID is still a placeholder.");
    return (query.includes("[0]") ? null : []) as T;
  }
  const result = await client.fetch<T>(query, params);
  console.log(`🔍 Sanity Query [${query.substring(0, 40)}...] returned ${Array.isArray(result) ? result.length : "1"} items.`);
  return result;
};

export const sanityClient = client;
