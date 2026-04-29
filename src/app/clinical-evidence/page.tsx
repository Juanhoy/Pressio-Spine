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
      {/* Page hero */}
      <section className="page-hero" aria-labelledby="ce-page-heading">
        <div className="container">
          <p className="overline">Data-Driven Surgery</p>
          <h1 id="ce-page-heading" className="heading-xl" style={{ color: "var(--color-white)", marginTop: "var(--space-3)" }}>
            Clinical Evidence
          </h1>
          <p className="body-lg" style={{ color: "rgba(255,255,255,0.7)", marginTop: "var(--space-4)", maxWidth: 560 }}>
            Every Pressio Spine™ product is validated by peer-reviewed research,
            cadaveric studies, and real-world surgical outcomes.
          </p>
        </div>
      </section>

      {/* Filter tabs */}
      <div style={{ borderBottom: "1px solid var(--color-gray-100)", background: "var(--color-white)", position: "sticky", top: "var(--header-height)", zIndex: 50 }}>
        <div className="container" style={{ display: "flex", gap: "var(--space-4)", paddingBlock: "var(--space-4)", overflowX: "auto" }}>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.value}
              href={cat.value === "all" ? "/clinical-evidence" : `/clinical-evidence?type=${cat.value}`}
              id={`ce-filter-${cat.value}`}
              style={{
                padding: "var(--space-2) var(--space-4)",
                borderRadius: "var(--radius-full)",
                fontWeight: 600,
                fontSize: "var(--text-sm)",
                whiteSpace: "nowrap",
                background: (type ?? "all") === cat.value ? "var(--color-sky)" : "var(--color-gray-100)",
                color: (type ?? "all") === cat.value ? "var(--color-white)" : "var(--color-gray-700)",
                transition: "all var(--transition-fast)",
              }}
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Docs grid */}
      <section className="section" aria-labelledby="ce-docs-heading">
        <div className="container">
          <h2 id="ce-docs-heading" className="heading-md" style={{ marginBottom: "var(--space-8)" }}>
            {docs.length} Document{docs.length !== 1 ? "s" : ""}
          </h2>

          {docs.length > 0 ? (
            <div className="grid-3">
              {docs.map((doc) => (
                <Link key={doc._id} href={`/clinical-evidence/${doc.slug}`} className="card" id={`ce-card-${doc._id}`} style={{ padding: "var(--space-6)" }}>
                  <span className="badge badge--clinical" style={{ marginBottom: "var(--space-3)" }}>
                    {CATEGORIES.find((c) => c.value === doc.category)?.label ?? doc.category}
                  </span>
                  <p className="heading-sm" style={{ marginBottom: "var(--space-2)" }}>{doc.title}</p>
                  {doc.journal && (
                    <p className="body-sm" style={{ color: "var(--color-gray-500)", fontStyle: "italic", marginBottom: "var(--space-2)" }}>
                      {doc.journal}
                    </p>
                  )}
                  {doc.summary && (
                    <p className="body-sm" style={{ color: "var(--color-gray-700)" }}>
                      {doc.summary.substring(0, 120)}…
                    </p>
                  )}
                  {doc.publishedAt && (
                    <p className="body-sm" style={{ color: "var(--color-gray-300)", marginTop: "var(--space-4)" }}>
                      {new Date(doc.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long" })}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <p className="body-lg" style={{ color: "var(--color-gray-500)" }}>
              No documents found. Content will appear here once added in Sanity.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
