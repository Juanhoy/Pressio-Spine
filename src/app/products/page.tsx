import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity/client";
import { PRODUCTS_QUERY } from "@/lib/sanity/queries";
import type { Product } from "@/types/sanity";
import ProductCard from "@/components/products/ProductCard";

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
      <section className="hero-new" style={{ minHeight: "400px" }} aria-labelledby="products-page-heading">
        <div className="hero-overlay-new" style={{ background: "linear-gradient(105deg, rgba(37, 59, 128, 0.95) 0%, rgba(0, 71, 171, 0.8) 100%)" }} />
        <div className="hero-inner-new" style={{ padding: "100px 40px" }}>
          <div className="hero-content-new">
            <span className="section-label-new" style={{ color: "var(--secondary)" }}>Portfolio</span>
            <h1 id="products-page-heading" style={{ color: "white", marginBottom: "20px" }}>Implant Systems</h1>
            <p className="hero-sub-new" style={{ maxWidth: "520px" }}>
              Designed for surgical precision. Validated by clinical evidence. Optimized for the ASC economic model.
            </p>
          </div>
        </div>
      </section>

      <section className="section-new" aria-labelledby="available-heading">
        <div className="section-inner-new">
          <div className="portfolio-bucket-new">
            <div className="bucket-header-new">
              <span className="bucket-label-new available">Available Now — FDA Cleared</span>
              <div className="bucket-hr-new" aria-hidden="true"></div>
            </div>

            {available.length > 0 ? (
              <div className="products-grid-new">
                {available.map((p) => (
                  <ProductCard key={p._id} product={p} />
                ))}
              </div>
            ) : (
              <PlaceholderGrid label="Available" />
            )}
          </div>
        </div>
      </section>

      <section className="section-new" style={{ background: "var(--neutral)" }} aria-labelledby="dev-heading">
        <div className="section-inner-new">
          <div className="portfolio-bucket-new">
            <div className="bucket-header-new">
              <span className="bucket-label-new pipeline">In Development — Pipeline</span>
              <div className="bucket-hr-new" aria-hidden="true"></div>
            </div>

            {development.length > 0 ? (
              <div className="products-grid-new">
                {development.map((p) => (
                  <ProductCard key={p._id} product={p} />
                ))}
              </div>
            ) : (
              <PlaceholderGrid label="In Development" />
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function PlaceholderGrid({ label }: { label: string }) {
  return (
    <div className="products-grid-new">
      {[1, 2].map((i) => (
        <div key={i} className="product-card-new" style={{ minHeight: 300, opacity: 0.5 }}>
          <div className="product-card-img-new" style={{ height: 200, background: "#F1F5F9" }} />
          <div className="product-card-body-new">
            <div style={{ height: 20, width: "60%", background: "#F1F5F9", marginBottom: 10 }} />
            <div style={{ height: 16, width: "80%", background: "#F1F5F9" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

