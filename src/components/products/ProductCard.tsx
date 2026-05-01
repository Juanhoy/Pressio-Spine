"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";
import type { Product } from "@/types/sanity";

interface ProductCardProps {
  product: Product;
  /** Card index (0-based) – used to alternate image left/right */
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const imageRight = index % 2 !== 0;

  return (
    <article className={`pc-card ${imageRight ? "pc-card--reverse" : ""}`}>
      {/* ── Image panel ──────────────────────────────────────────────── */}
      <div className="pc-img-wrap">
        {product.heroImage ? (
          <Image
            src={urlFor(product.heroImage).width(900).height(600).url()}
            alt={product.heroImage.alt ?? product.name}
            fill
            style={{ objectFit: "contain", padding: "24px" }}
            unoptimized
          />
        ) : (
          <div className="pc-img-placeholder" />
        )}
      </div>

      {/* ── Content panel ────────────────────────────────────────────── */}
      <div className="pc-body">
        {/* Status badge */}
        <span className={`pc-badge ${product.status === "available" ? "pc-badge--cleared" : "pc-badge--dev"}`}>
          {product.status === "available" ? "FDA 510(k) Cleared" : "In Development"}
        </span>

        {/* Product name */}
        <h3 className="pc-name">{product.name}</h3>

        {/* Tagline / subtitle */}
        {product.tagline && (
          <p className="pc-tagline">{product.tagline}</p>
        )}

        {/* Short description */}
        {product.description && (
          <p className="pc-desc">{product.description}</p>
        )}

        {/* Actions */}
        <div className="pc-actions">
          {product.brochure ? (
            <a
              href={product.brochure}
              target="_blank"
              rel="noopener noreferrer"
              className="pc-btn pc-btn--outline"
              onClick={(e) => e.stopPropagation()}
            >
              Download Brochure
            </a>
          ) : (
            <span className="pc-btn pc-btn--outline pc-btn--disabled">
              Download Brochure
            </span>
          )}
          <Link href={`/products/${product.slug}`} className="pc-btn pc-btn--solid">
            See Detail
          </Link>
        </div>
      </div>

      {/* Make the whole card clickable via an invisible overlay link */}
      <Link
        href={`/products/${product.slug}`}
        className="pc-card-overlay"
        aria-label={`View ${product.name} details`}
        tabIndex={-1}
      />
    </article>
  );
}
