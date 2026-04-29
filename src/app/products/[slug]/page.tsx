import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/lib/sanity/client";
import { PRODUCT_QUERY, PRODUCTS_QUERY } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import type { Product } from "@/types/sanity";

// ── Static params ─────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  const products = await sanityFetch<Pick<Product, "slug">[]>(
    `*[_type == "product"]{ "slug": slug.current }`
  ).catch(() => []);
  return products.map((p) => ({ slug: p.slug }));
}

// ── Metadata ──────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await sanityFetch<Product>(PRODUCT_QUERY, { slug }).catch(() => null);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.tagline,
    openGraph: {
      title: `${product.name} | Pressio Spine™`,
      description: product.tagline,
      images: product.heroImage
        ? [{ url: urlFor(product.heroImage).width(1200).height(630).url() }]
        : [],
    },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await sanityFetch<Product>(PRODUCT_QUERY, { slug }).catch(() => null);

  if (!product) notFound();

  return (
    <>
      {/* Hero */}
      <section className="page-hero" aria-labelledby="product-name">
        <div className="container">
          <span className={`badge badge--${product.status === "available" ? "available" : "development"}`}>
            {product.status === "available" ? "Available" : "In Development"}
          </span>
          <h1 id="product-name" className="heading-xl" style={{ color: "var(--color-white)", marginTop: "var(--space-4)" }}>
            {product.name}
          </h1>
          <p className="body-lg" style={{ color: "rgba(255,255,255,0.75)", marginTop: "var(--space-4)", maxWidth: 560 }}>
            {product.tagline}
          </p>
          <div style={{ marginTop: "var(--space-8)", display: "flex", gap: "var(--space-4)" }}>
            {product.ifu && (
              <a href={product.ifu} target="_blank" rel="noopener noreferrer" className="btn btn--white" id="product-download-ifu">
                Download IFU
              </a>
            )}
            {product.brochure && (
              <a href={product.brochure} target="_blank" rel="noopener noreferrer" className="btn btn--accent" id="product-download-brochure">
                Product Brochure
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Hero image */}
      {product.heroImage && (
        <div style={{ background: "var(--color-off-white)" }}>
          <div className="container" style={{ paddingBlock: "var(--space-12)" }}>
            <div style={{ position: "relative", aspectRatio: "16/7", borderRadius: "var(--radius-lg)", overflow: "hidden", boxShadow: "var(--shadow-lg)" }}>
              <Image
                src={urlFor(product.heroImage).width(1280).height(560).url()}
                alt={product.heroImage.alt ?? product.name}
                fill
                priority
                style={{ objectFit: "cover" }}
                sizes="100vw"
                unoptimized
              />
            </div>
          </div>
        </div>
      )}

      {/* Description + Key Features */}
      <section className="section" aria-labelledby="product-overview">
        <div className="container">
          <div className="grid-2" style={{ alignItems: "start" }}>
            <div>
              <h2 id="product-overview" className="heading-md" style={{ marginBottom: "var(--space-6)" }}>
                Product Overview
              </h2>
              <p className="body-lg" style={{ color: "var(--color-gray-700)" }}>
                {product.description ?? "Full product description coming soon."}
              </p>
            </div>
            {product.keyFeatures && product.keyFeatures.length > 0 && (
              <div>
                <h3 className="heading-sm" style={{ marginBottom: "var(--space-6)" }}>Key Features</h3>
                <ul style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
                  {product.keyFeatures.map((feat, i) => (
                    <li key={i} style={{ display: "flex", gap: "var(--space-3)", alignItems: "flex-start" }}>
                      <span style={{ color: "var(--color-accent)", fontWeight: 700, marginTop: 2 }}>✓</span>
                      <span className="body-base">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Indications */}
      {product.indications && product.indications.length > 0 && (
        <section className="section section--gray" aria-labelledby="product-indications">
          <div className="container">
            <h2 id="product-indications" className="heading-md" style={{ marginBottom: "var(--space-6)" }}>
              Indications
            </h2>
            <ul style={{ columns: 2, gap: "var(--space-8)" }}>
              {product.indications.map((ind, i) => (
                <li key={i} className="body-base" style={{ marginBottom: "var(--space-3)", breakInside: "avoid" }}>
                  {ind}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Surgical Technique */}
      {product.surgicalTechnique && product.surgicalTechnique.length > 0 && (
        <section className="section" aria-labelledby="product-st">
          <div className="container">
            <h2 id="product-st" className="heading-md" style={{ marginBottom: "var(--space-6)" }}>
              Surgical Technique
            </h2>
            <div style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap" }}>
              {product.surgicalTechnique.map((st, i) => (
                <a
                  key={i}
                  href={st.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--secondary"
                  id={`st-download-${i}`}
                >
                  Download: {st.title || "Surgical Technique"}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Clinical Evidence */}
      {product.clinicalEvidence && product.clinicalEvidence.length > 0 && (
        <section className="section section--dark" aria-labelledby="product-clinical-evidence">
          <div className="container">
            <h2 id="product-clinical-evidence" className="heading-md" style={{ color: "var(--color-white)", marginBottom: "var(--space-8)" }}>
              Clinical Evidence
            </h2>
            <div className="grid-3">
              {product.clinicalEvidence.map((ce) => (
                <Link key={ce._id} href={`/clinical-evidence/${ce.slug}`} className="card" style={{ padding: "var(--space-6)" }}>
                  <span className="badge badge--clinical" style={{ marginBottom: "var(--space-3)" }}>Study</span>
                  <p className="heading-sm">{ce.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <section className="section" aria-labelledby="product-contact-cta">
        <div className="container" style={{ textAlign: "center" }}>
          <h2 id="product-contact-cta" className="heading-md" style={{ marginBottom: "var(--space-4)" }}>
            Interested in {product.name}?
          </h2>
          <p className="body-lg" style={{ color: "var(--color-gray-500)", marginBottom: "var(--space-8)" }}>
            Connect with our team to request samples, surgical support, or pricing information.
          </p>
          <Link href="/contact" className="btn btn--primary" id={`product-${product.slug}-contact-cta`}>
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
