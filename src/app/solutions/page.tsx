import type { Metadata } from "next";
import Link from "next/link";
import { sanityFetch } from "@/lib/sanity/client";
import { SOLUTIONS_QUERY } from "@/lib/sanity/queries";
import type { SolutionsPage } from "@/types/sanity";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Pressio Spine™ solutions for surgeons, ASCs, and distribution partners.",
};

const AUDIENCES = [
  { id: "surgeons", key: "forSurgeons" as const, label: "For Surgeons",  emoji: "🏥" },
  { id: "ascs",     key: "forASCs"     as const, label: "For ASCs",      emoji: "⚕️" },
  { id: "partners", key: "forPartners" as const, label: "For Partners",  emoji: "🤝" },
];

export default async function SolutionsPage() {
  const data = await sanityFetch<SolutionsPage>(SOLUTIONS_QUERY)
    .catch(() => null);

  return (
    <>
      <section className="page-hero" aria-labelledby="solutions-page-heading">
        <div className="container">
          <p className="overline">Who We Serve</p>
          <h1 id="solutions-page-heading" className="heading-xl" style={{ color: "var(--color-white)", marginTop: "var(--space-3)" }}>
            Solutions
          </h1>
          <p className="body-lg" style={{ color: "rgba(255,255,255,0.7)", marginTop: "var(--space-4)", maxWidth: 520 }}>
            From the OR to the boardroom — we support every stakeholder in the spinal ecosystem.
          </p>
        </div>
      </section>

      {AUDIENCES.map(({ id, key, label, emoji }, i) => {
        const section = data?.[key];
        const isEven = i % 2 === 0;
        return (
          <section
            key={id}
            id={id}
            className={`section${isEven ? "" : " section--gray"}`}
            aria-labelledby={`solutions-${id}-heading`}
          >
            <div className="container">
              <div className="grid-2" style={{ alignItems: "center", gap: "var(--space-16)" }}>
                <div style={{ order: isEven ? 0 : 1 }}>
                  <p className="overline">{emoji} {label}</p>
                  <h2 id={`solutions-${id}-heading`} className="heading-lg" style={{ marginTop: "var(--space-3)", marginBottom: "var(--space-6)" }}>
                    {section?.headline ?? label}
                  </h2>
                  <p className="body-lg" style={{ color: "var(--color-gray-700)", marginBottom: "var(--space-8)" }}>
                    {section?.body ?? "Detailed solution information coming soon."}
                  </p>
                  <Link
                    href={section?.ctaHref ?? "/contact"}
                    className="btn btn--primary"
                    id={`solutions-${id}-cta`}
                  >
                    {section?.ctaLabel ?? "Learn More"}
                  </Link>
                </div>
                {/* Visual placeholder – replace with actual Cloudinary image/video */}
                <div style={{ order: isEven ? 1 : 0, aspectRatio: "4/3", background: "var(--color-gray-100)", borderRadius: "var(--radius-xl)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "4rem" }}>{emoji}</span>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
