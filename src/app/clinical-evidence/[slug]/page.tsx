import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PortableText } from "next-sanity";
import { sanityFetch } from "@/lib/sanity/client";
import { CLINICAL_EVIDENCE_ITEM_QUERY } from "@/lib/sanity/queries";
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

const CATEGORY_LABELS: Record<string, string> = {
  patents: "Patents",
  "clinical-summary": "Clinical Summary",
  publication: "Publication",
  "white-paper": "White Paper",
};

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

  const categoryLabel = CATEGORY_LABELS[doc.category] ?? doc.category;

  return (
    <>
      {/* ── Hero — matches clinical-evidence/page.tsx style ─────────── */}
      <section
        className="hero-new"
        style={{ minHeight: "360px" }}
        aria-labelledby="ce-item-heading"
      >
        <div
          className="hero-overlay-new"
          style={{
            background:
              "linear-gradient(105deg, rgba(37, 59, 128, 0.95) 0%, rgba(0, 71, 171, 0.8) 100%)",
          }}
        />
        <div className="hero-inner-new" style={{ padding: "100px 40px 80px" }}>
          <div className="hero-content-new">
            <span
              className="section-label-new"
              style={{ color: "var(--secondary)", marginBottom: "12px", display: "block" }}
            >
              {categoryLabel}
            </span>
            <h1
              id="ce-item-heading"
              style={{ color: "white", marginBottom: "16px", maxWidth: "760px" }}
            >
              {doc.title}
            </h1>
            {doc.journal && (
              <p
                className="hero-sub-new"
                style={{ fontStyle: "italic", maxWidth: "560px", marginBottom: "8px" }}
              >
                {doc.journal}
                {doc.publishedAt && ` · ${new Date(doc.publishedAt).getFullYear()}`}
              </p>
            )}
            {doc.authors && doc.authors.length > 0 && (
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "13px", marginTop: "6px" }}>
                {doc.authors.join(", ")}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── Summary callout ──────────────────────────────────────────── */}
      {doc.summary && (
        <section
          style={{
            background: "#F8FAFC",
            borderBottom: "1px solid #E8ECF0",
            padding: "40px",
          }}
        >
          <div
            className="section-inner-new"
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "flex-start",
              padding: "24px 32px",
              background: "white",
              borderRadius: "16px",
              borderLeft: "4px solid var(--secondary)",
              boxShadow: "0 2px 16px rgba(0,71,171,0.06)",
            }}
          >
            {/* Quote icon */}
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="var(--secondary)"
              aria-hidden="true"
              style={{ flexShrink: 0, marginTop: "2px", opacity: 0.6 }}
            >
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
              <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
            </svg>
            <p
              style={{
                fontSize: "16px",
                lineHeight: "1.7",
                color: "var(--gray-700)",
                margin: 0,
              }}
            >
              {doc.summary}
            </p>
          </div>
        </section>
      )}

      {/* ── PDF Files — same why-card-new card style as listing page ── */}
      {doc.files && doc.files.length > 0 && (
        <section className="section-new" aria-labelledby="ce-files-heading">
          <div className="section-inner-new">
            <div style={{ marginBottom: "40px" }}>
              <span className="section-label-new">Documents</span>
              <h2 className="section-title-new" id="ce-files-heading">
                {doc.files.length} PDF File{doc.files.length !== 1 ? "s" : ""} Available
              </h2>
            </div>

            <div className="why-grid-new" style={{ marginTop: "0" }}>
              {doc.files.map((f, i) => (
                <a
                  key={i}
                  href={f.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="why-card-new"
                  id={`ce-file-card-${i}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="why-card-body-new">
                    {/* Category badge — same as listing page */}
                    <span
                      className="product-status-new"
                      style={{
                        background: "#F1F5F9",
                        color: "var(--primary)",
                        marginBottom: "16px",
                      }}
                    >
                      {categoryLabel}
                    </span>

                    <h3>{f.title || doc.title}</h3>

                    {doc.summary && (
                      <p>{doc.summary.substring(0, 140)}…</p>
                    )}

                    {/* Footer row — date + CTA */}
                    <div
                      style={{
                        marginTop: "auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "12px",
                          color: "var(--gray-300)",
                          fontFamily: "var(--headline)",
                        }}
                      >
                        {doc.publishedAt
                          ? new Date(doc.publishedAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                            })
                          : "N/A"}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--headline)",
                          fontSize: "13px",
                          fontWeight: 700,
                          color: "var(--primary)",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        Open PDF
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          aria-hidden="true"
                        >
                          <path d="M2 7h10M8 3l4 4-4 4" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Portable text body (if present) ─────────────────────────── */}
      {doc.body && (
        <section className="section-new" style={{ background: "#F8FAFC" }}>
          <div className="section-inner-new" style={{ maxWidth: "760px", margin: "0 auto" }}>
            <div className="portable-text-container">
              <PortableText value={doc.body} />
            </div>
          </div>
        </section>
      )}

      {/* ── Related products ─────────────────────────────────────────── */}
      {doc.relatedProducts && doc.relatedProducts.length > 0 && (
        <section className="section-new" aria-labelledby="ce-related-heading">
          <div className="section-inner-new">
            <span className="section-label-new">Related</span>
            <h2 className="section-title-new" id="ce-related-heading" style={{ marginBottom: "24px" }}>
              Related Products
            </h2>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              {doc.relatedProducts.map((p) => (
                <Link
                  key={p._id}
                  href={`/products/${p.slug}`}
                  className="btn-secondary-new"
                  id={`ce-related-${p.slug}`}
                >
                  {p.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Back button ─────────────────────────────────────────────── */}
      <section style={{ background: "#F8FAFC", padding: "40px" }}>
        <div className="section-inner-new">
          <Link href="/clinical-evidence" className="btn-secondary-new" id="ce-back">
            ← Back to Clinical Evidence
          </Link>
        </div>
      </section>
    </>
  );
}
