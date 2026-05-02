import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { sanityFetch } from "@/lib/sanity/client";
import { SOLUTIONS_QUERY } from "@/lib/sanity/queries";
import type { SolutionsPage } from "@/types/sanity";

export const revalidate = 30;

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Pressio Spine™ solutions for surgeons, ASCs, and distribution partners.",
};

const AUDIENCES = [
  { id: "surgeons", key: "forSurgeons" as const, label: "For Surgeons",  emoji: "🏥", img: "https://res.cloudinary.com/dvm7fjhxs/image/upload/v1777652069/Surgeons_o3nldt.png" },
  { id: "ascs",     key: "forASCs"     as const, label: "For ASCs",      emoji: "⚕️", img: "https://res.cloudinary.com/dvm7fjhxs/image/upload/v1777652068/ASCs_nmgfof.png" },
  { id: "partners", key: "forPartners" as const, label: "For Partners",  emoji: "🤝", img: "https://res.cloudinary.com/dvm7fjhxs/image/upload/v1777652069/Partners_l5xfjj.png" },
];

export default async function SolutionsPage() {
  const data = await sanityFetch<SolutionsPage>(SOLUTIONS_QUERY)
    .catch(() => null);

  return (
    <>
      <section className="hero-new" style={{ minHeight: "400px" }} aria-labelledby="solutions-page-heading">
        <div className="hero-overlay-new" style={{ background: "linear-gradient(105deg, rgba(37, 59, 128, 0.95) 0%, rgba(0, 71, 171, 0.8) 100%)" }} />
        <div className="hero-inner-new" style={{ padding: "100px 40px" }}>
          <div className="hero-content-new">
            <span className="section-label-new" style={{ color: "var(--secondary)" }}>Who We Serve</span>
            <h1 id="solutions-page-heading" style={{ color: "white", marginBottom: "20px" }}>Solutions</h1>
            <p className="hero-sub-new" style={{ maxWidth: "520px" }}>
              From the OR to the boardroom — we support every stakeholder in the spinal ecosystem with advanced nitinol technology.
            </p>
          </div>
        </div>
      </section>

      {AUDIENCES.map(({ id, key, label, emoji, img }, i) => {
        const section = data?.[key];
        const isEven = i % 2 === 0;
        return (
          <section
            key={id}
            id={id}
            className="section-new"
            style={!isEven ? { background: "var(--neutral)" } : {}}
            aria-labelledby={`solutions-${id}-heading`}
          >
            <div className="section-inner-new">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "60px", alignItems: "center" }}>
                <div style={{ order: isEven ? 0 : 1 }}>
                  <span className="section-label-new">{emoji} {label}</span>
                  <h2 id={`solutions-${id}-heading`} className="section-title-new" style={{ marginTop: "12px", marginBottom: "24px" }}>
                    {section?.headline ?? label}
                  </h2>
                  <p className="section-sub-new" style={{ marginBottom: "32px", maxWidth: "100%" }}>
                    {section?.body ?? "Detailed solution information coming soon."}
                  </p>
                  <Link
                    href={section?.ctaHref ?? "/contact"}
                    className="btn-primary-new"
                    id={`solutions-${id}-cta`}
                  >
                    {section?.ctaLabel ?? "Contact Specialist"}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M2 7h10M8 3l4 4-4 4" />
                    </svg>
                  </Link>
                </div>
                <div style={{ 
                  order: isEven ? 1 : 0, 
                  aspectRatio: "16/10", 
                  borderRadius: "24px", 
                  overflow: "hidden",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
                  position: "relative"
                }}>
                  <Image
                    src={img}
                    alt={label}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
