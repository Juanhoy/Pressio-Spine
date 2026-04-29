// ─── Portable Text image helper ────────────────────────────────────────────────
import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityClient } from "./client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return createImageUrlBuilder({
    projectId: "416agrv8",
    dataset: "production",
  }).image(source);
}
