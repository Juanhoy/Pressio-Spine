// ─── Portable Text image helper ────────────────────────────────────────────────
import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityClient } from "./client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return createImageUrlBuilder({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "416agrv8",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  }).image(source);
}
