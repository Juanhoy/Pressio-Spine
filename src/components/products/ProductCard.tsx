"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";
import type { Product } from "@/types/sanity";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card-new">
      <div className="product-card-img-new" style={{ height: 240, position: "relative" }}>
        {product.heroImage ? (
          <Image
            src={urlFor(product.heroImage).width(800).height(450).url()}
            alt={product.heroImage.alt ?? product.name}
            fill
            style={{ objectFit: "cover" }}
            unoptimized
          />
        ) : (
          <div style={{ width: "100%", height: "100%", background: "#EEF1F6" }} />
        )}
      </div>
      <div className="product-card-body-new">
        <span className={`product-status-new ${product.status === "available" ? "status-cleared-new" : ""}`} 
              style={product.status !== "available" && product.status ? { background: "#FEF3C7", color: "#92400E" } : {}}>
          {product.status === "available" || !product.status ? "FDA 510(k) Cleared" : "In Development"}
        </span>
        <h3>{product.name}</h3>
        <p>{product.tagline}</p>
        <Link href={`/products/${product.slug}`} className="product-card-link-new">
          Technical Specifications & IFU
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M2 7h10M8 3l4 4-4 4" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
