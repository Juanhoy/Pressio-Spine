"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";
import type { Product } from "@/types/sanity";
import { fixTerminology } from "@/lib/terminology";

interface ProductCardProps {
  product: Product;
  /** Card index (0-based) – used to alternate image left/right */
  index?: number;
  /** Show the full product description. Default: false (compact card for home page). */
  showDescription?: boolean;
}

export default function ProductCard({ product, index = 0, showDescription = false }: ProductCardProps) {
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
          {product.status === "available" ? "AVAILABLE NOW — FDA CLEARED & COMMERCIALLY DISTRIBUTED" : "In Development"}
        </span>

        {/* Product name */}
        <h3 className="pc-name">{product.name}</h3>

        {/* Tagline / subtitle */}
        {product.tagline && (
          <p className="pc-tagline">{fixTerminology(product.tagline)}</p>
        )}

        {/* Short description — only shown when caller opts in (e.g. Products page) */}
        {showDescription && product.description && (
          <p className="pc-desc">{fixTerminology(product.description)}</p>
        )}

        {/* Actions */}
        {product.status === "available" && (
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
        )}
      </div>

      {/* Make the whole card clickable via an invisible overlay link — ONLY for available products */}
      {product.status === "available" && (
        <Link
          href={`/products/${product.slug}`}
          className="pc-card-overlay"
          aria-label={`View ${product.name} details`}
          tabIndex={-1}
        />
      )}
    </article>
  );
}
