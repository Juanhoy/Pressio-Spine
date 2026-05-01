import type { Metadata } from "next";
import Link from "next/link";
import { sanityFetch } from "@/lib/sanity/client";
import { HOME_QUERY } from "@/lib/sanity/queries";
import type { HomePage } from "@/types/sanity";
import { urlFor } from "@/lib/sanity/image";
import Image from "next/image";
import ProductCard from "@/components/products/ProductCard";



// ── Hero video – served from Cloudinary ────────────────────────────────────────
// Update this URL in Sanity (homePage.heroVideoUrl) or change the constant below.
const HERO_VIDEO_URL =
  "https://res.cloudinary.com/dvm7fjhxs/video/upload/v1776828558/Hero_Video_gvfgli.mp4";

export const metadata: Metadata = {
  title: "Pressio Spine™ | Advanced Spinal Implant Solutions",
  description:
    "Pressio Spine™ develops innovative spinal implant systems backed by clinical evidence — engineered for surgeons, designed for patients.",
};

export default async function HomePage() {
  const data = await sanityFetch<HomePage>(HOME_QUERY).catch(() => null);

  // Use Sanity value when available, fall back to the hardcoded Cloudinary URL
  const heroVideoUrl = data?.heroVideoUrl ?? HERO_VIDEO_URL;

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="hero-new" aria-label="Hero">
        <video
          className="hero-video-new"
          src={heroVideoUrl}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="hero-overlay-new" aria-hidden="true" />
        <div className="hero-inner-new">
          <div className="hero-content-new">
            <div className="hero-badge-new" aria-label="FDA 510(k) Cleared">
              {data?.heroBadge ?? "FDA 510(k) Cleared"}
            </div>
            <h1>{data?.heroHeadline ?? "Nitinol-Based Continuous Compression for Anterior Cervical Fusion"}</h1>
            <p className="hero-sub-new">
              {data?.heroSubheadline ??
                "Pressio Spine is advancing a nitinol fixation platform designed to support fusion biology, simplify procedural workflow, and fit the ambulatory surgery center model across cervical and future spine applications."}
            </p>
            <div className="hero-actions-new">
              <Link
                href={data?.heroCtaHref ?? "/products"}
                className="btn-primary-new"
                id="hero-cta-primary"
              >
                {data?.heroCtaLabel ?? "View Products"}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
              <Link
                href="/clinical-evidence"
                className="btn-ghost-new"
                id="hero-cta-secondary"
              >
                View Clinical Evidence
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Proof Bar ────────────────────────────────────────────────── */}
      <div className="proof-bar-new" role="complementary" aria-label="Key product facts">
        <div className="proof-inner-new">
          {[
            {
              icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
              title: "FDA 510(k) Cleared",
              subtitle: "Anterior Cervical Fixation"
            },
            {
              icon: "M12 6v6l4 2",
              title: "Nitinol Continuous Compression",
              subtitle: "Shape memory fixation design",
              circle: true
            },
            {
              icon: "M8 2v4M16 2v4M2 10h20",
              title: "Single-Use Sterile Kit",
              subtitle: "Workflow-optimized for ASCs",
              rect: true
            },
            {
              icon: "M7 16l4-4 4 4 5-5",
              title: "Platform Expansion Underway",
              subtitle: "Cervical today. Broader spine in development.",
              path2: "M3 3v18h18"
            }
          ].map((item, i) => (
            <div className="proof-item-new" key={i}>
              <div className="proof-icon-new" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  {item.rect && <rect x="2" y="4" width="20" height="16" rx="2" />}
                  {item.circle && <circle cx="12" cy="12" r="10" />}
                  <path d={item.icon} />
                  {item.path2 && <path d={item.path2} />}
                </svg>
              </div>
              <div className="proof-text-new">
                <strong>{item.title}</strong>
                <span>{item.subtitle}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Precision Engineering ───────────────────────────────────── */}
      <section className="section-new" aria-labelledby="why-heading">
        <div className="section-inner-new">
          <h2 className="section-title-new" id="why-heading">Precision Engineering</h2>
          <p className="section-sub-new">Reimagining spinal fixation through the unique properties of shape memory alloys.</p>

          <div className="why-grid-new">
            {[
              {
                title: "Clinical Mechanism",
                desc: "Harnessing nitinol's superelastic properties for continuous dynamic compression, optimized for long-term fusion biology.",
                href: "/clinical-evidence",
                label: "Clinical Evidence"
              },
              {
                title: "Workflow Simplicity",
                desc: "Reduced tray burden with single-use sterile instrumentation, specifically engineered for the ASC economic model.",
                href: "/solutions",
                label: "Solution Overview"
              },
              {
                title: "Platform Potential",
                desc: "Our cervical technology is the foundation for a broader nitinol-based spinal fixation platform currently in development.",
                href: "/products",
                label: "Roadmap"
              }
            ].map((card, i) => (
              <div className="why-card-new" key={i}>
                <div className="why-card-img-new" style={{ backgroundColor: "#F1F5F9" }} />
                <div className="why-card-body-new">
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                  <Link href={card.href}>
                    {card.label}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M2 7h10M8 3l4 4-4 4" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Products ────────────────────────────────────────────────── */}
      <section className="section-new products-section-new" aria-labelledby="products-heading">
        <div className="section-inner-new">
          <span className="section-label-new">Portfolio</span>
          <h2 className="section-title-new" id="products-heading">Products</h2>

          <div className="portfolio-bucket-new">
            <div className="bucket-header-new">
              <span className="bucket-label-new available">Available Now — FDA Cleared & Commercially Distributed</span>
              <div className="bucket-hr-new" aria-hidden="true"></div>
            </div>

            <div className="pc-list">
              {(data?.productsTeaser ?? []).length > 0 ? (
                data?.productsTeaser?.map((product, i) => (
                  <ProductCard key={product._id} product={product} index={i} />
                ))
              ) : (
                <p className="section-sub-new" style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px 0" }}>
                  No products available at the moment.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Clinical Evidence ───────────────────────────────────────── */}
      <section className="evidence-section-new" aria-labelledby="evidence-heading">
        <div className="evidence-inner-new">
          <div className="evidence-left-new">
            <span className="section-label-new" style={{ color: "var(--secondary)" }}>Clinical Rationale</span>
            <h2 className="section-title-new" id="evidence-heading">Evidence-Based Fixation</h2>
            <p className="section-sub-new">
              {data?.clinicalEvidenceTeaser ??
                "Explore the clinical and technical rationale behind Pressio's continuous compression approach, including study results, imaging, and supporting evidence."}
            </p>
            <div className="evidence-disclaimer-new">
              <strong>Data qualification note:</strong> All clinical data presented on this site includes study design, sample size, and applicable limitations.
            </div>
            <Link href="/clinical-evidence" className="btn-evidence-new">
              View All Clinical Evidence
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M2 7h10M8 3l4 4-4 4" />
              </svg>
            </Link>
          </div>

          <div className="evidence-cards-new">
            <div className="evidence-card-new">
              <div className="evidence-tag-new">Key Performance Metric</div>
              <div className="evidence-stat-new">98%</div>
              <p className="evidence-desc-new">Fusion rate observed in an initial retrospective cohort study of CONTINUUM-treated procedures.</p>
              <div className="evidence-qual-new">Retrospective study; n=120; CT-confirmed radiographic fusion.</div>
            </div>
            <div className="evidence-card-new">
              <div className="evidence-tag-new">Workflow Analysis</div>
              <div className="evidence-stat-new">40%</div>
              <p className="evidence-desc-new">Reduction in OR set-up time measured using the single-use sterile kit format.</p>
              <div className="evidence-qual-new">Comparative workflow analysis; n=45; results may vary.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Built for the ASC Era ───────────────────────────────────── */}
      <section className="section-new asc-section-new" aria-labelledby="asc-heading">
        <div className="section-inner-new">
          <div style={{ textAlign: "center", maxWidth: 580, margin: "0 auto 56px" }}>
            <span className="section-label-new">Site of Care</span>
            <h2 className="section-title-new" id="asc-heading">Built for the ASC Era</h2>
            <p className="section-sub-new" style={{ margin: "0 auto" }}>
              The CONTINUUM System is designed for the operational and economic realities of ambulatory spine surgery.
            </p>
          </div>

          <div className="asc-grid-new">
            {[
              { title: "OR Time", impact: "20–30 min saved/case", label1: "Traditional Model", val1: "15—25 min count", label2: "Pressio Continuum", val2: "Open and insert" },
              { title: "Instrument Trays", impact: "100% tray elimination", label1: "Traditional Model", val1: "3—4 multi-tray sets", label2: "Pressio Continuum", val2: "Single-use sterile kit" },
              { title: "Sterilization", impact: "$300-600+ saved/case", label1: "Traditional Model", val1: "On-site reprocessing", label2: "Pressio Continuum", val2: "Pre-sterilized" },
            ].map((item, i) => (
              <div className="asc-card-new" key={i}>
                <div className="title-new">{item.title}</div>
                <div className="model-group-new">
                  <span className="model-label-new">{item.label1}</span>
                  <span className="model-val-new">{item.val1}</span>
                </div>
                <hr />
                <div className="model-group-new pressio-group-new">
                  <span className="model-label-new">{item.label2}</span>
                  <span className="model-val-new">{item.val2}</span>
                </div>
                <div className="net-impact-box-new">
                  <span className="impact-label-new">Net Impact</span>
                  <span className="impact-val-new">{item.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Latest News ─────────────────────────────────────────────── */}
      <section className="section-new" aria-labelledby="news-heading">
        <div className="section-inner-new">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 44 }}>
            <div>
              <span className="section-label-new">Newsroom</span>
              <h2 className="section-title-new" id="news-heading">Latest News</h2>
            </div>
            <Link href="/news" className="why-card-new a" style={{ color: "var(--primary)", fontWeight: 700, fontSize: 13, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
              All Press Releases
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M2 7h10M8 3l4 4-4 4" />
              </svg>
            </Link>
          </div>

          <div className="why-grid-new">
            {(data?.newsTeaser ?? []).map((post) => (
              <article className="product-card-new" key={post._id}>
                <div className="product-card-img-new" style={{ backgroundColor: "#F1F5F9", height: 180 }} />
                <div className="product-card-body-new">
                  <div style={{ fontFamily: "var(--headline)", fontSize: 11, fontWeight: 600, color: "var(--tertiary)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>
                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Recent"}
                  </div>
                  <h4 style={{ fontFamily: "var(--headline)", fontSize: 15, fontWeight: 700, color: "var(--primary)", lineHeight: 1.4, marginBottom: 8 }}>
                    {post.title}
                  </h4>
                  <p style={{ fontSize: 13, color: "var(--gray-500)", lineHeight: 1.6 }}>{post.excerpt}</p>
                  <Link href={`/news/${post.slug}`} className="product-card-link-new" style={{ marginTop: "auto" }}>
                    Read More
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M2 7h10M8 3l4 4-4 4" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
