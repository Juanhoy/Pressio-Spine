import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "next-sanity";
import { sanityFetch } from "@/lib/sanity/client";
import { CLINICAL_EVIDENCE_ITEM_QUERY } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import type { ClinicalEvidence } from "@/types/sanity";

export async function generateStaticParams() {
  const docs = await sanityFetch<Pick<ClinicalEvidence, "slug">[]>(
    `*[_type == "clinicalEvidence"]{ "slug": slug.current }`
  ).catch(() => []);
  return docs.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = await sanityFetch<ClinicalEvidence>(CLINICAL_EVIDENCE_ITEM_QUERY, {
    slug,
  }).catch(() => null);
  if (!doc) return { title: "Document Not Found" };
  return { title: doc.title, description: doc.summary };
}

export default async function ClinicalEvidenceItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = await sanityFetch<ClinicalEvidence>(CLINICAL_EVIDENCE_ITEM_QUERY, {
    slug,
  }).catch(() => null);

  if (!doc) notFound();

  return (
    <>
      <section className="page-hero" aria-labelledby="ce-item-heading">
        <div className="container" style={{ maxWidth: 800 }}>
          <span className="badge badge--clinical" style={{ marginBottom: "var(--space-4)" }}>
            {doc.category}
          </span>
          <h1 id="ce-item-heading" className="heading-xl" style={{ color: "var(--color-white)", marginBottom: "var(--space-4)" }}>
            {doc.title}
          </h1>
          {doc.journal && (
            <p className="body-base" style={{ color: "rgba(255,255,255,0.6)", fontStyle: "italic" }}>
              {doc.journal}
              {doc.publishedAt && ` · ${new Date(doc.publishedAt).getFullYear()}`}
            </p>
          )}
          {doc.authors && doc.authors.length > 0 && (
            <p className="body-sm" style={{ color: "rgba(255,255,255,0.5)", marginTop: "var(--space-2)" }}>
              {doc.authors.join(", ")}
            </p>
          )}

          {doc.files && doc.files.length > 0 && (
            <div style={{ marginTop: "var(--space-6)", display: "flex", gap: "var(--space-4)", flexWrap: "wrap" }}>
              {doc.files.map((f, i) => (
                <a
                  key={i}
                  href={f.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--accent"
                  id={`ce-download-${i}`}
                >
                  Download: {f.title || "PDF Document"}
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      <article className="section">
        <div className="container" style={{ maxWidth: 800 }}>
          {doc.summary && (
            <p className="body-lg" style={{ color: "var(--color-gray-700)", marginBottom: "var(--space-8)", padding: "var(--space-6)", background: "var(--color-off-white)", borderLeft: "4px solid var(--color-sky)", borderRadius: "0 var(--radius-md) var(--radius-md) 0" }}>
              {doc.summary}
            </p>
          )}

          {/* Body content from Sanity Portable Text */}
          {doc.body && (
            <div className="portable-text-container">
              <PortableText value={doc.body} />
            </div>
          )}
          {!doc.body && (
            <p className="body-base" style={{ color: "var(--color-gray-500)" }}>
              Full document content coming soon.
            </p>
          )}

          {/* Related products */}
          {doc.relatedProducts && doc.relatedProducts.length > 0 && (
            <div style={{ marginTop: "var(--space-16)" }}>
              <h2 className="heading-sm" style={{ marginBottom: "var(--space-6)" }}>Related Products</h2>
              <div style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap" }}>
                {doc.relatedProducts.map((p) => (
                  <Link key={p._id} href={`/products/${p.slug}`} className="btn btn--secondary" id={`ce-related-${p.slug}`}>
                    {p.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginTop: "var(--space-12)" }}>
            <Link href="/clinical-evidence" className="btn btn--primary" id="ce-back">
              ← Back to Clinical Evidence
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
