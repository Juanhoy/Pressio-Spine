import type { Metadata } from "next";
import Link from "next/link";
import { sanityClient } from "@/lib/sanity/client";
import { HOME_QUERY } from "@/lib/sanity/queries";
import type { HomePage } from "@/types/sanity";

// ── Hero video – served from Cloudinary ────────────────────────────────────────
// Update this URL in Sanity (homePage.heroVideoUrl) or change the constant below.
const HERO_VIDEO_URL =
  "https://res.cloudinary.com/dvm7fjhxs/video/upload/v1776828558/Hero_Video_gvfgli.mp4";

export const metadata: Metadata = {
  title: "Pressio Spine™ | Advanced Spinal Implant Solutions",
  description:
    "Pressio Spine™ develops innovative spinal implant systems backed by clinical evidence — engineered for surgeons, designed for patients.",
};

export default async function HomePage() {
  const data = await sanityClient.fetch<HomePage>(HOME_QUERY).catch(() => null);

  // Use Sanity value when available, fall back to the hardcoded Cloudinary URL
  const heroVideoUrl = data?.heroVideoUrl ?? HERO_VIDEO_URL;

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="hero" aria-labelledby="hero-headline">
        {/* Background video served from Cloudinary */}
        <video
          className="hero__bg-video"
          src={heroVideoUrl}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="hero__overlay" aria-hidden="true" />

        <div className="container">
          <div className="hero__content">
            <p className="overline hero__overline">
              Spinal Innovation Backed by Science
            </p>
            <h1 id="hero-headline" className="heading-xl hero__headline">
              {data?.heroHeadline ?? "Redefining the Standard of Spinal Care"}
            </h1>
            <p className="body-lg hero__sub">
              {data?.heroSubheadline ??
                "Next-generation implant systems designed for surgical precision, patient outcomes, and clinical confidence."}
            </p>
            <div className="hero__actions">
              <Link
                href={data?.heroCtaHref ?? "/products"}
                className="btn btn--accent"
                id="hero-cta-primary"
              >
                {data?.heroCtaLabel ?? "Explore Products"}
              </Link>
              <Link
                href="/clinical-evidence"
                className="btn btn--white"
                id="hero-cta-secondary"
              >
                Clinical Evidence
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Products teaser ──────────────────────────────────────────── */}
      <section className="section" aria-labelledby="products-teaser-heading">
        <div className="container">
          <p className="overline">Our Portfolio</p>
          <h2 id="products-teaser-heading" className="heading-lg" style={{ marginBottom: "var(--space-2)" }}>
            Innovative Implant Systems
          </h2>
          <p className="body-lg" style={{ color: "var(--color-gray-500)", marginBottom: "var(--space-12)" }}>
            Every product is engineered to solve a specific clinical challenge.
          </p>

          {/* Products grid populated from Sanity */}
          <div className="grid-3">
            {(data?.productsTeaser ?? []).map((product) => (
              <Link href={`/products/${product.slug}`} key={product._id} className="card" style={{ padding: "var(--space-8)" }}>
                <p className="heading-sm" style={{ marginBottom: "var(--space-2)" }}>{product.name}</p>
                <p className="body-sm" style={{ color: "var(--color-gray-500)" }}>{product.tagline}</p>
              </Link>
            ))}
            {/* Fallback placeholder cards */}
            {(!data?.productsTeaser || data.productsTeaser.length === 0) &&
              ["TLIF System", "LLIF System", "Pedicle Screw System"].map((name) => (
                <div key={name} className="card" style={{ padding: "var(--space-8)", minHeight: 180 }}>
                  <div className="skeleton" style={{ height: 80, marginBottom: "var(--space-4)" }} />
                  <p className="heading-sm">{name}</p>
                </div>
              ))}
          </div>

          <div style={{ marginTop: "var(--space-12)", textAlign: "center" }}>
            <Link href="/products" className="btn btn--primary" id="home-view-all-products">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* ── Clinical Evidence teaser ──────────────────────────────────── */}
      <section className="section section--dark" aria-labelledby="clinical-teaser-heading">
        <div className="container" style={{ textAlign: "center" }}>
          <p className="overline">Data-Driven Surgery</p>
          <h2 id="clinical-teaser-heading" className="heading-lg" style={{ color: "var(--color-white)", margin: "var(--space-4) 0 var(--space-6)" }}>
            Built on Clinical Evidence
          </h2>
          <p className="body-lg" style={{ color: "rgba(255,255,255,0.7)", maxWidth: 600, margin: "0 auto var(--space-8)" }}>
            {data?.clinicalEvidenceTeaser ??
              "Every design decision is validated by published research, cadaveric studies, and real-world surgical outcomes."}
          </p>
          <Link href="/clinical-evidence" className="btn btn--accent" id="home-clinical-cta">
            Explore Clinical Data
          </Link>
        </div>
      </section>

      {/* ── Solutions teaser ──────────────────────────────────────────── */}
      <section className="section section--gray" aria-labelledby="solutions-teaser-heading">
        <div className="container">
          <p className="overline">Who We Serve</p>
          <h2 id="solutions-teaser-heading" className="heading-lg" style={{ marginBottom: "var(--space-12)" }}>
            {data?.solutionsTeaserLabel ?? "Solutions Tailored to Your Role"}
          </h2>
          <div className="grid-3">
            {[
              { title: "For Surgeons",  href: "/solutions#surgeons",  desc: "Precision instrumentation, training programs, and surgical support." },
              { title: "For ASCs",      href: "/solutions#ascs",      desc: "Streamlined procurement, quick-turn logistics, and outcomes tracking." },
              { title: "For Partners",  href: "/solutions#partners",  desc: "Distributor programs, co-marketing assets, and clinical training." },
            ].map((item) => (
              <Link href={item.href} key={item.href} className="card" style={{ padding: "var(--space-8)" }}>
                <p className="heading-sm" style={{ marginBottom: "var(--space-3)" }}>{item.title}</p>
                <p className="body-sm" style={{ color: "var(--color-gray-500)" }}>{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
