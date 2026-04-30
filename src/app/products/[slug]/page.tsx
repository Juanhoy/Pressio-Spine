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
      <section className="hero-new" style={{ minHeight: "500px" }} aria-labelledby="product-name">
        <div className="hero-overlay-new" style={{ background: "linear-gradient(105deg, rgba(37, 59, 128, 0.95) 0%, rgba(0, 71, 171, 0.8) 100%)" }} />
        <div className="hero-inner-new" style={{ padding: "120px 40px" }}>
          <div className="hero-content-new">
            <span className={`product-status-new ${product.status === "available" ? "status-cleared-new" : ""}`} 
                  style={{ background: product.status === "available" ? "#DBEAFE" : "#FEF3C7", color: product.status === "available" ? "var(--primary)" : "#92400E", marginBottom: "20px" }}>
              {product.status === "available" ? "FDA 510(k) Cleared" : "In Development"}
            </span>
            <h1 id="product-name" style={{ color: "white", marginBottom: "20px" }}>{product.name}</h1>
            <p className="hero-sub-new" style={{ maxWidth: "560px" }}>{product.tagline}</p>
            <div style={{ marginTop: "40px", display: "flex", gap: "16px", flexWrap: "wrap" }}>
              {product.ifu && (
                <a href={product.ifu} target="_blank" rel="noopener noreferrer" className="btn-primary-new" style={{ background: "white", color: "var(--primary)" }}>
                  Download IFU
                </a>
              )}
              {product.brochure && (
                <a href={product.brochure} target="_blank" rel="noopener noreferrer" className="btn-ghost-new">
                  Product Brochure
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {product.heroImage && (
        <section className="section-new" style={{ background: "#F8FAFC", paddingTop: 0, marginTop: "-80px", position: "relative", zIndex: 10 }}>
          <div className="section-inner-new">
            <div style={{ position: "relative", aspectRatio: "16/7", borderRadius: "24px", overflow: "hidden", boxShadow: "0 20px 50px rgba(0,0,0,0.15)" }}>
              <Image
                src={urlFor(product.heroImage).width(1600).height(700).url()}
                alt={product.heroImage.alt ?? product.name}
                fill
                priority
                style={{ objectFit: "cover" }}
                unoptimized
              />
            </div>
          </div>
        </section>
      )}

      <section className="section-new" aria-labelledby="product-overview">
        <div className="section-inner-new">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "60px", alignItems: "start" }}>
            <div>
              <span className="section-label-new">Overview</span>
              <h2 id="product-overview" className="section-title-new" style={{ marginBottom: "24px" }}>Product Rationale</h2>
              <p className="section-sub-new" style={{ color: "var(--gray-700)", maxWidth: "100%" }}>
                {product.description ?? "Full product description coming soon."}
              </p>
            </div>
            {product.keyFeatures && product.keyFeatures.length > 0 && (
              <div className="why-card-new" style={{ background: "var(--neutral)", borderColor: "transparent" }}>
                <div className="why-card-body-new">
                  <h3 style={{ fontSize: "19px", marginBottom: "24px" }}>Key Features</h3>
                  <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
                    {product.keyFeatures.map((feat, i) => (
                      <li key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "14px", color: "var(--gray-900)" }}>
                        <span style={{ color: "var(--secondary)", fontWeight: 800, fontSize: "16px" }}>✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {product.indications && product.indications.length > 0 && (
        <section className="section-new" style={{ background: "var(--neutral)" }} aria-labelledby="product-indications">
          <div className="section-inner-new">
            <span className="section-label-new">Clinical Use</span>
            <h2 id="product-indications" className="section-title-new" style={{ marginBottom: "32px" }}>Indications</h2>
            <div style={{ columns: 2, columnGap: "60px" }}>
              {product.indications.map((ind, i) => (
                <div key={i} style={{ marginBottom: "16px", paddingLeft: "20px", borderLeft: "2px solid var(--secondary)", fontSize: "14px", color: "var(--gray-600)", breakInside: "avoid" }}>
                  {ind}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {product.clinicalEvidence && product.clinicalEvidence.length > 0 && (
        <section className="evidence-section-new" aria-labelledby="product-clinical-evidence">
          <div className="evidence-inner-new">
            <div className="evidence-left-new">
              <span className="section-label-new" style={{ color: "var(--secondary)" }}>Data Qualification</span>
              <h2 id="product-clinical-evidence" className="section-title-new" style={{ color: "white" }}>Supporting Evidence</h2>
              <p className="section-sub-new" style={{ color: "rgba(255,255,255,0.7)" }}>
                Explore the clinical papers and technical reports that validate the design and efficacy of {product.name}.
              </p>
            </div>
            <div className="why-grid-new" style={{ marginTop: 0 }}>
              {product.clinicalEvidence.map((ce) => (
                <Link key={ce._id} href={`/clinical-evidence/${ce.slug}`} className="why-card-new" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", textDecoration: "none" }}>
                  <div className="why-card-body-new">
                    <span className="product-status-new" style={{ background: "rgba(255,255,255,0.1)", color: "white", marginBottom: "12px" }}>Resource</span>
                    <h4 style={{ color: "white", fontFamily: "var(--headline)", fontSize: "15px", fontWeight: 700 }}>{ce.title}</h4>
                    <span style={{ marginTop: "auto", color: "var(--secondary)", fontSize: "13px", fontWeight: 700, display: "flex", alignItems: "center", gap: "6px" }}>
                      View Study
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M2 7h10M8 3l4 4-4 4" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-new" aria-labelledby="product-contact-cta">
        <div className="section-inner-new" style={{ textAlign: "center" }}>
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <span className="section-label-new">Next Steps</span>
            <h2 id="product-contact-cta" className="section-title-new" style={{ marginBottom: "20px" }}>
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
