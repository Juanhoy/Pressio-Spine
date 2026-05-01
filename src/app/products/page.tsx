import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity/client";
import { PRODUCTS_QUERY } from "@/lib/sanity/queries";
import type { Product } from "@/types/sanity";
import ProductCard from "@/components/products/ProductCard";

// Re-fetch from Sanity and regenerate this page at most every 60 seconds
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore Pressio Spine™ implant systems — available products and those in development.",
};

export default async function ProductsPage() {
  const products = await sanityFetch<Product[]>(PRODUCTS_QUERY);

  const available = products.filter((p) => p.status === "available");
  const development = products.filter((p) => p.status === "in-development");

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="hero-new" style={{ minHeight: "400px" }} aria-labelledby="products-page-heading">
        <div className="hero-overlay-new" style={{ background: "linear-gradient(105deg, rgba(37, 59, 128, 0.95) 0%, rgba(0, 71, 171, 0.8) 100%)" }} />
        <div className="hero-inner-new" style={{ padding: "100px 40px" }}>
          <div className="hero-content-new">
            <span className="section-label-new" style={{ color: "var(--secondary)" }}>Portfolio</span>
            <h1 id="products-page-heading" style={{ color: "white", marginBottom: "20px" }}>Products</h1>
            <p className="hero-sub-new" style={{ maxWidth: "520px" }}>
              Pressio Spine utilizes precision engineering to align surgical workflows with unique patient
              needs. Our platform supports a broad spectrum of techniques through our core solutions.
            </p>
          </div>
        </div>
      </section>

      {/* ── Available Products ─────────────────────────────────────────── */}
      <section className="section-new" aria-labelledby="available-heading">
        <div className="section-inner-new">
          <div className="portfolio-bucket-new">
            <div className="bucket-header-new">
              <span className="bucket-label-new available">Available Now — FDA Cleared &amp; Commercially Distributed</span>
              <div className="bucket-hr-new" aria-hidden="true" />
            </div>

            {available.length > 0 ? (
              <div className="pc-list">
                {available.map((p, i) => (
                  <ProductCard key={p._id} product={p} index={i} />
                ))}
              </div>
            ) : (
              <PlaceholderCard label="Available" />
            )}
          </div>
        </div>
      </section>

      {/* ── In-Development Pipeline ───────────────────────────────────── */}
      {development.length > 0 && (
        <section className="section-new" style={{ background: "var(--neutral)" }} aria-labelledby="dev-heading">
          <div className="section-inner-new">
            <div className="portfolio-bucket-new">
              <div className="bucket-header-new">
                <span className="bucket-label-new pipeline">In Development — Pipeline</span>
                <div className="bucket-hr-new" aria-hidden="true" />
              </div>

              <div className="pc-list">
                {development.map((p, i) => (
                  <ProductCard key={p._id} product={p} index={available.length + i} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function PlaceholderCard({ label }: { label: string }) {
  return (
    <div className="pc-list">
      {[1, 2].map((i) => (
        <div key={i} className="pc-card" style={{ opacity: 0.45, pointerEvents: "none" }}>
          <div className="pc-img-wrap" style={{ background: "var(--white)" }} />
          <div className="pc-body">
            <div style={{ height: 18, width: "40%", background: "#E2E8F0", borderRadius: 4, marginBottom: 14 }} />
            <div style={{ height: 28, width: "60%", background: "#E2E8F0", borderRadius: 4, marginBottom: 12 }} />
            <div style={{ height: 14, width: "80%", background: "#E2E8F0", borderRadius: 4 }} />
          </div>
        </div>
      ))}
    </div>
  );
}
