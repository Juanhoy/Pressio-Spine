// ─── Sanity client used on the server (data fetching) ─────────────────────────
import { createClient } from "next-sanity";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01",
  // Use token only when you need to read draft content (server-side only)
  token: process.env.SANITY_API_READ_TOKEN,
  useCdn: process.env.NODE_ENV === "production",
});
