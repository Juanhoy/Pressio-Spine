import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/lib/sanity/client";
import { PRODUCT_QUERY } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import type { Product } from "@/types/sanity";

// Re-fetch from Sanity and regenerate at most every 30 seconds
export const revalidate = 30;
// Allow new slugs (products created after build) to be rendered on-demand
export const dynamicParams = true;

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

// ── Feature icon SVG paths ─────────────────────────────────────────────────────
const FEATURE_ICONS = [
  "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
  "M13 10V3L4 14h7v7l9-11h-7z",
  "M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 3H8L6 7h12l-2-4z",
  "M4 6h16M4 12h16M4 18h16",
];

// ── Download tile helper ───────────────────────────────────────────────────────
function DownloadTile({
  label,
  href,
  imageUrl,
  disabled = false,
}: {
  label: string;
  href?: string | null;
  imageUrl?: string | null;
  disabled?: boolean;
}) {
  const inner = (
    <>
      <div className="pd-dl-thumb" style={{ position: "relative", overflow: "hidden" }}>
        {imageUrl && !disabled ? (
          <Image
            src={imageUrl}
            alt={`${label} Preview`}
            fill
            style={{ objectFit: "cover" }}
            unoptimized
          />
        ) : (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="9" y1="13" x2="15" y2="13" />
            <line x1="9" y1="17" x2="15" y2="17" />
          </svg>
        )}
      </div>
      <div className="pd-dl-label">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        <span>{label}</span>
      </div>
    </>
  );

  if (href && !disabled) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="pd-dl-tile"
        aria-label={`Download ${label}`}
      >
        {inner}
      </a>
    );
  }

  return (
    <div className="pd-dl-tile pd-dl-tile--disabled" aria-disabled="true">
      {inner}
    </div>
  );
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
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="pd-hero" aria-labelledby="pd-name">
        <div className="pd-hero-overlay" />
        <div className="pd-hero-inner">
          <h1 id="pd-name" className="pd-hero-title">{product.name}</h1>
          {product.tagline && (
            <p className="pd-hero-tagline">{product.tagline}</p>
          )}
          {product.description && (
            <p className="pd-hero-desc">{product.description}</p>
          )}
        </div>
      </section>

      {/* ── Image + Key Features ─────────────────────────────────────── */}
      <section className="pd-main-section" aria-labelledby="pd-features-heading">
        <div className="pd-main-inner">
          {/* Product image */}
          <div className="pd-img-col">
            {product.heroImage ? (
              <div className="pd-img-wrap">
                <Image
                  src={urlFor(product.heroImage).width(700).height(700).url()}
                  alt={product.heroImage.alt ?? product.name}
                  fill
                  priority
                  style={{ objectFit: "contain" }}
                  unoptimized
                />
              </div>
            ) : (
              <div className="pd-img-wrap pd-img-placeholder" />
            )}
          </div>

          {/* Key features */}
          <div className="pd-features-col">
            <h2 id="pd-features-heading" className="pd-features-heading">Key Features</h2>
            <ul className="pd-features-list">
              {(product.keyFeatures && product.keyFeatures.length > 0
                ? product.keyFeatures
                : [
                    "Simplified Procedure",
                    "Continuous Compression",
                    "Sterile Single-Use Kits",
                    "Versatile System",
                  ]
              ).map((feat, i) => (
                <li key={i} className="pd-feature-item">
                  <div className="pd-feature-icon" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d={FEATURE_ICONS[i % FEATURE_ICONS.length]} />
                    </svg>
                  </div>
                  <div className="pd-feature-text">
                    <strong className="pd-feature-title">{feat}</strong>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Downloads ────────────────────────────────────────────────── */}
      <section className="pd-downloads-section" aria-labelledby="pd-downloads-heading">
        <div className="section-inner-new">
          <h2 id="pd-downloads-heading" className="pd-downloads-heading">Product Documents</h2>
          <div className="pd-dl-grid">
            <DownloadTile 
              label="Product Details" 
              href={product.brochure} 
              imageUrl={product.brochureImage ? urlFor(product.brochureImage).width(400).height(400).url() : null}
            />
            <DownloadTile
              label="Surgical Technique"
              href={product.surgicalTechnique?.[0]?.url}
              imageUrl={product.surgicalTechnique?.[0]?.coverImage ? urlFor(product.surgicalTechnique[0].coverImage).width(400).height(400).url() : null}
            />
            {product.clinicalEvidence && product.clinicalEvidence.length > 0 ? (
              <Link
                href={`/clinical-evidence/${product.clinicalEvidence[0].slug}`}
                className="pd-dl-tile"
                aria-label="View Clinical Evidence"
              >
                <div className="pd-dl-thumb" style={{ position: "relative", overflow: "hidden" }}>
                  {product.clinicalEvidence[0].heroImage ? (
                    <Image
                      src={urlFor(product.clinicalEvidence[0].heroImage).width(400).height(400).url()}
                      alt="Clinical Evidence Preview"
                      fill
                      style={{ objectFit: "cover" }}
                      unoptimized
                    />
                  ) : (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  )}
                </div>
                <div className="pd-dl-label">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <span>Clinical Evidence</span>
                </div>
              </Link>
            ) : (
              <DownloadTile label="Clinical Evidence" disabled />
            )}
            <DownloadTile 
              label="IFU" 
              href={product.ifu} 
              imageUrl={product.ifuImage ? urlFor(product.ifuImage).width(400).height(400).url() : null}
            />
          </div>
        </div>
      </section>

      {/* ── Indications ─────────────────────────────────────────────── */}
      {product.indications && product.indications.length > 0 && (
        <section className="section-new" style={{ background: "var(--neutral)" }} aria-labelledby="pd-indications">
          <div className="section-inner-new">
            <span className="section-label-new">Clinical Use</span>
            <h2 id="pd-indications" className="section-title-new" style={{ marginBottom: "32px" }}>Indications</h2>
            <div style={{ columns: 2, columnGap: "60px" }}>
              {product.indications.map((ind, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom: "16px",
                    paddingLeft: "20px",
                    borderLeft: "2px solid var(--secondary)",
                    fontSize: "14px",
                    color: "var(--gray-600)",
                    breakInside: "avoid",
                  }}
                >
                  {ind}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="section-new" aria-labelledby="pd-contact-cta">
        <div className="section-inner-new" style={{ textAlign: "center" }}>
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <span className="section-label-new">Next Steps</span>
            <h2 id="pd-contact-cta" className="section-title-new" style={{ marginBottom: "20px" }}>
              Interested in {product.name}?
            </h2>
            <p className="section-sub-new" style={{ marginBottom: "40px", marginInline: "auto" }}>
              Connect with our team to request samples, surgical technique guidance, or clinical consultation.
            </p>
            <Link href="/contact" className="btn-primary-new">
              Contact Sales Specialist
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M2 7h10M8 3l4 4-4 4" />
              </svg>
            </Link>
          </div>
        </div>
    </section>
    </>
  );
}
