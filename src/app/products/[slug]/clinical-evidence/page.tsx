import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { sanityFetch } from "@/lib/sanity/client";
import { PRODUCT_CLINICAL_EVIDENCE_QUERY } from "@/lib/sanity/queries";
import type { ProductClinicalEvidence } from "@/types/sanity";

// Always fresh in dev, 30 s ISR in production
export const revalidate = 30;
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await sanityFetch<ProductClinicalEvidence>(
    PRODUCT_CLINICAL_EVIDENCE_QUERY,
    { slug }
  ).catch(() => null);
  if (!product) return { title: "Clinical Evidence" };
  return {
    title: `Clinical Evidence – ${product.name}`,
    description: `Peer-reviewed publications, patents, and clinical data supporting ${product.name}.`,
  };
}

const CATEGORY_LABELS: Record<string, string> = {
  patents: "Patents",
  "clinical-summary": "Clinical Summary",
  publication: "Publication",
  "white-paper": "White Paper",
};

export default async function ProductClinicalEvidencePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await sanityFetch<ProductClinicalEvidence>(
    PRODUCT_CLINICAL_EVIDENCE_QUERY,
    { slug }
  ).catch(() => null);

  if (!product) notFound();

  const docs = (product.clinicalEvidence ?? []).filter((d) => 
    !d.title?.includes("97.5") && 
    !d.summary?.includes("97.5")
  );

  return (
    <>
      {/* ── Hero — identical style to /clinical-evidence ─────────────── */}
      <section
        className="hero-new"
        style={{ minHeight: "400px" }}
        aria-labelledby="pce-heading"
      >
        <div
          className="hero-overlay-new"
          style={{
            background:
              "linear-gradient(105deg, rgba(37, 59, 128, 0.95) 0%, rgba(0, 71, 171, 0.8) 100%)",
          }}
        />
        <div className="hero-inner-new" style={{ padding: "100px 40px" }}>
          <div className="hero-content-new">
            <span
              className="section-label-new"
              style={{ color: "var(--secondary)" }}
            >
              {product.name}
            </span>
            <h1
              id="pce-heading"
              style={{ color: "white", marginBottom: "20px" }}
            >
              Clinical Evidence
            </h1>
            <p className="hero-sub-new" style={{ maxWidth: "560px" }}>
              Peer-reviewed data, patents, and clinical publications supporting{" "}
              {product.name}.
            </p>
          </div>
        </div>
      </section>

      {/* ── Documents grid ───────────────────────────────────────────── */}
      <section className="section-new" aria-labelledby="pce-docs-heading">
        <div className="section-inner-new">
          <div style={{ marginBottom: "40px" }}>
            <span className="section-label-new">Resources</span>
            <h2 className="section-title-new" id="pce-docs-heading">
              {docs.length > 0
                ? `${docs.length} Document${docs.length !== 1 ? "s" : ""} Available`
                : "Clinical Evidence"}
            </h2>
          </div>

          {docs.length > 0 ? (
            <div className="why-grid-new" style={{ marginTop: "0" }}>
              {docs.map((doc) => {
                const categoryLabel =
                  CATEGORY_LABELS[doc.category] ?? doc.category;
                // Use the first file URL or fall back to the detail page slug
                const href = doc.allFiles?.[0]?.url ?? doc.fileUrl ?? `/clinical-evidence/${doc.slug}`;
                const isExternal = href.startsWith("http");

                return (
                  <a
                    key={doc._id}
                    href={href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="why-card-new"
                    id={`pce-card-${doc._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="why-card-body-new">
                      {/* Category badge */}
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

                      <h3>{doc.title}</h3>

                      {doc.journal && (
                        <p
                          style={{
                            fontStyle: "italic",
                            marginBottom: "12px",
                            color: "var(--gray-400)",
                          }}
                        >
                          {doc.journal}
                        </p>
                      )}

                      {doc.summary && (
                        <p>{doc.summary.substring(0, 140)}…</p>
                      )}

                      {/* If multiple files, list them as sub-links */}
                      {doc.allFiles && doc.allFiles.length > 1 && (
                        <div
                          style={{
                            marginTop: "8px",
                            marginBottom: "16px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "6px",
                          }}
                        >
                          {doc.allFiles.map((f, i) => (
                            <span
                              key={i}
                              style={{
                                fontSize: "12px",
                                color: "var(--gray-500)",
                                fontFamily: "var(--headline)",
                              }}
                            >
                              📄 {f.title || `File ${i + 1}`}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Footer row */}
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
                            ? new Date(doc.publishedAt).toLocaleDateString(
                                "en-US",
                                { year: "numeric", month: "short" }
                              )
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
                          See PDF
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
                );
              })}
            </div>
          ) : (
            <div
              style={{
                padding: "80px 0",
                textAlign: "center",
                background: "#F8FAFC",
                borderRadius: "24px",
              }}
            >
              <p className="section-sub-new" style={{ margin: "0 auto" }}>
                Clinical evidence documents for {product.name} will appear here
                once added in Sanity.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── Back button ─────────────────────────────────────────────── */}
      <section style={{ background: "#F8FAFC", padding: "40px" }}>
        <div className="section-inner-new">
          <Link
            href={`/products/${product.slug}`}
            className="btn-secondary-new"
            id="pce-back"
          >
            ← Back to {product.name}
          </Link>
        </div>
      </section>
    </>
  );
}
