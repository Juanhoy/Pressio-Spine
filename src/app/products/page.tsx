import type { Metadata } from "next";
import Link from "next/link";
import { sanityFetch } from "@/lib/sanity/client";
import { PRODUCTS_QUERY } from "@/lib/sanity/queries";
import type { Product } from "@/types/sanity";
import { urlFor } from "@/lib/sanity/image";
import Image from "next/image";

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
      {/* Page hero */}
      <section className="page-hero" aria-labelledby="products-page-heading">
        <div className="container">
          <p className="overline">Our Portfolio</p>
          <h1 id="products-page-heading" className="heading-xl" style={{ color: "var(--color-white)", marginTop: "var(--space-3)" }}>
            Implant Systems
          </h1>
          <p className="body-lg" style={{ color: "rgba(255,255,255,0.7)", marginTop: "var(--space-4)", maxWidth: 520 }}>
            Designed for surgical precision. Validated by clinical evidence.
          </p>
        </div>
      </section>

      {/* Available Products */}
      <section id="available" className="section" aria-labelledby="available-heading">
        <div className="container">
          <h2 id="available-heading" className="heading-md" style={{ marginBottom: "var(--space-8)" }}>
            Available Products
          </h2>
          {available.length > 0 ? (
            <div className="grid-3">
              {available.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          ) : (
            <PlaceholderGrid label="Available" />
          )}
        </div>
      </section>

      {/* In Development */}
      <section id="development" className="section section--gray" aria-labelledby="dev-heading">
        <div className="container">
          <h2 id="dev-heading" className="heading-md" style={{ marginBottom: "var(--space-8)" }}>
            In Development
          </h2>
          {development.length > 0 ? (
            <div className="grid-3">
              {development.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          ) : (
            <PlaceholderGrid label="In Development" />
          )}
        </div>
      </section>
    </>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="card" id={`product-${product.slug}`}>
      {product.heroImage && (
        <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
          <Image
            src={urlFor(product.heroImage).width(640).height(360).url()}
            alt={product.heroImage.alt ?? product.name}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 640px) 100vw, 33vw"
            unoptimized
          />
        </div>
      )}
      <div style={{ padding: "var(--space-6)" }}>
        <span className={`badge badge--${product.status === "available" ? "available" : "development"}`}>
          {product.status === "available" ? "Available" : "In Development"}
        </span>
        <p className="heading-sm" style={{ marginTop: "var(--space-3)" }}>{product.name}</p>
        <p className="body-sm" style={{ color: "var(--color-gray-500)", marginTop: "var(--space-2)" }}>
          {product.tagline}
        </p>
      </div>
    </Link>
  );
}

function PlaceholderGrid({ label }: { label: string }) {
  return (
    <div className="grid-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="card" style={{ padding: "var(--space-6)", minHeight: 240 }}>
          <div className="skeleton" style={{ height: 140, marginBottom: "var(--space-4)" }} />
          <div className="skeleton" style={{ height: 20, width: "60%", marginBottom: "var(--space-2)" }} />
          <div className="skeleton" style={{ height: 16, width: "80%" }} />
        </div>
      ))}
    </div>
  );
}
