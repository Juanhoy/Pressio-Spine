import type { Metadata } from "next";
import Link from "next/link";
import { sanityFetch } from "@/lib/sanity/client";
import { CLINICAL_EVIDENCE_QUERY } from "@/lib/sanity/queries";
import type { ClinicalEvidence } from "@/types/sanity";

export const metadata: Metadata = {
  title: "Clinical Evidence",
  description:
    "Peer-reviewed publications, clinical summaries, and white papers validating Pressio Spine™ implant systems.",
};

const CATEGORIES = [
  { value: "all",              label: "All" },
  { value: "clinical-summary", label: "Clinical Summaries" },
  { value: "publication",      label: "Publications" },
  { value: "white-paper",      label: "White Papers" },
];

export default async function ClinicalEvidencePage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;

  const allDocs = await sanityFetch<ClinicalEvidence[]>(CLINICAL_EVIDENCE_QUERY)
    .catch(() => [] as ClinicalEvidence[]);

  const docs = type && type !== "all"
    ? allDocs.filter((d) => d.category === type)
    : allDocs;

  return (
    <>
      <section className="hero-new" style={{ minHeight: "400px" }} aria-labelledby="ce-page-heading">
        <div className="hero-overlay-new" style={{ background: "linear-gradient(105deg, rgba(37, 59, 128, 0.95) 0%, rgba(0, 71, 171, 0.8) 100%)" }} />
        <div className="hero-inner-new" style={{ padding: "100px 40px" }}>
          <div className="hero-content-new">
            <span className="section-label-new" style={{ color: "var(--secondary)" }}>Data-Driven Surgery</span>
            <h1 id="ce-page-heading" style={{ color: "white", marginBottom: "20px" }}>Clinical Evidence</h1>
            <p className="hero-sub-new" style={{ maxWidth: "560px" }}>
              Every Pressio Spine™ product is validated by peer-reviewed research, cadaveric studies, and real-world surgical outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* Filter tabs */}
      <div style={{ borderBottom: "1px solid #E8ECF0", background: "white", position: "sticky", top: "var(--header-height)", zIndex: 50 }}>
        <div className="section-inner-new" style={{ display: "flex", gap: "12px", padding: "16px 40px", overflowX: "auto" }}>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.value}
              href={cat.value === "all" ? "/clinical-evidence" : `/clinical-evidence?type=${cat.value}`}
              id={`ce-filter-${cat.value}`}
              style={{
                padding: "8px 20px",
                borderRadius: "100px",
                fontWeight: 600,
                fontSize: "13px",
                fontFamily: "var(--headline)",
                whiteSpace: "nowrap",
                background: (type ?? "all") === cat.value ? "var(--primary)" : "#F1F5F9",
                color: (type ?? "all") === cat.value ? "white" : "var(--gray-700)",
                transition: "all var(--transition)",
                textDecoration: "none"
              }}
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>

      <section className="section-new" aria-labelledby="ce-docs-heading">
        <div className="section-inner-new">
          <div style={{ marginBottom: "40px" }}>
            <span className="section-label-new">Resources</span>
            <h2 className="section-title-new" id="ce-docs-heading">
              {docs.length} Document{docs.length !== 1 ? "s" : ""} Found
            </h2>
          </div>

          {docs.length > 0 ? (
            <div className="why-grid-new" style={{ marginTop: "0" }}>
              {docs.map((doc) => (
                <Link key={doc._id} href={`/clinical-evidence/${doc.slug}`} className="why-card-new" id={`ce-card-${doc._id}`} style={{ textDecoration: "none" }}>
                  <div className="why-card-body-new">
                    <span className="product-status-new" style={{ background: "#F1F5F9", color: "var(--primary)", marginBottom: "16px" }}>
                      {CATEGORIES.find((c) => c.value === doc.category)?.label ?? doc.category}
                    </span>
                    <h3>{doc.title}</h3>
                    {doc.journal && (
                      <p style={{ fontStyle: "italic", marginBottom: "12px", color: "var(--gray-400)" }}>
                        {doc.journal}
                      </p>
                    )}
                    {doc.summary && (
                      <p>
                        {doc.summary.substring(0, 140)}…
                      </p>
                    )}
                    <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: "12px", color: "var(--gray-300)", fontFamily: "var(--headline)" }}>
                        {doc.publishedAt ? new Date(doc.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "short" }) : "N/A"}
                      </span>
                      <span style={{ fontFamily: "var(--headline)", fontSize: "13px", fontWeight: 700, color: "var(--primary)", display: "flex", alignItems: "center", gap: "6px" }}>
                        Read Case Study
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path d="M2 7h10M8 3l4 4-4 4" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div style={{ padding: "80px 0", textAlign: "center", background: "#F8FAFC", borderRadius: "24px" }}>
              <p className="section-sub-new" style={{ margin: "0 auto" }}>
                No documents found for this category. Content will appear here once added in Sanity.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
