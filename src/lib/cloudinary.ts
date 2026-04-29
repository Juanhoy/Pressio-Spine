// ─── Cloudinary configuration ──────────────────────────────────────────────────
// Usage: import { cld } from "@/lib/cloudinary";
// then:  cld.image("pressio-spine/some-image")
import { Cloudinary } from "@cloudinary/url-gen";

export const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  },
  url: {
    secure: true,
  },
});
