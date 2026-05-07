import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/lib/sanity/client";
import { PRODUCT_QUERY } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import type { Product } from "@/types/sanity";

// Re-fetch from Sanity every 30 seconds
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

import { 
  ShieldCheck, 
  Activity, 
  Package, 
  Layers, 
  Zap, 
  Settings, 
  Maximize, 
  Microscope,
  CheckCircle2,
  Wrench
} from "lucide-react";

// ── Feature icon mapping ─────────────────────────────────────────────────────
function FeatureIcon({ text, index }: { text: string; index: number }) {
  const lower = text.toLowerCase();
  
  if (lower.includes("compression") || lower.includes("force") || lower.includes("nitinol")) 
    return <Activity size={22} />;
  
  if (lower.includes("kit") || lower.includes("sterile") || lower.includes("delivery") || lower.includes("fedex")) 
    return <Package size={22} />;
  
  if (lower.includes("size") || lower.includes("configur") || lower.includes("range")) 
    return <Layers size={22} />;
  
  if (lower.includes("technique") || lower.includes("step") || lower.includes("surgeon")) 
    return <Zap size={22} />;
  
  if (lower.includes("monolithic") || lower.includes("design") || lower.includes("hardware")) 
    return <Settings size={22} />;
  
  if (lower.includes("fixation") || lower.includes("screw") || lower.includes("line")) 
    return <TargetIcon size={22} />;

  if (lower.includes("clinical") || lower.includes("evidence") || lower.includes("data")) 
    return <Microscope size={22} />;

  if (lower.includes("simplified") || lower.includes("easy")) 
    return <CheckCircle2 size={22} />;

  // Default icons based on index to prevent total repetition if no keywords match
  const defaults = [<ShieldCheck key={0} size={22} />, <Wrench key={1} size={22} />, <Maximize key={2} size={22} />];
  return defaults[index % defaults.length];
}

// Custom Target icon since Target might conflict or be simpler as a component
function TargetIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

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
                    <FeatureIcon text={feat} index={i} />
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
            {/* Clinical Evidence — always links to the product-specific CE page */}
            <Link
              href={`/products/${slug}/clinical-evidence`}
              className="pd-dl-tile"
              aria-label="View Clinical Evidence"
              id="pd-ce-tile"
            >
              <div className="pd-dl-thumb" style={{ position: "relative", overflow: "hidden" }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="9" y1="13" x2="15" y2="13" />
                  <line x1="9" y1="17" x2="15" y2="17" />
                </svg>
              </div>
              <div className="pd-dl-label">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <span>Clinical Evidence</span>
              </div>
            </Link>
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
