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
  "https://res.cloudinary.com/dvm7fjhxs/video/upload/f_auto,q_auto/v1776828558/Hero_Video_gvfgli.mp4";

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
          preload="auto"
          poster={heroVideoUrl.replace(".mp4", ".jpg")}
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
              icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
              path2: "M9 12l2 2 4-4",
              title: "FDA 510(k) Cleared",
              subtitle: "Anterior Cervical Fixation C3 to C7"
            },
            {
              icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z",
              path2: "M14 2v6h6 M12 18h.01 M12 14h.01 M12 10h.01",
              title: "17 Patents",
              subtitle: "8 Granted, 9 Pending"
            },
            {
              icon: "M15 4V2a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v2",
              path2: "M12 9v6 M9 12h6",
              title: "Single-Use Sterile Kit",
              subtitle: "Zero trays, zero reprocessing",
              rect: true
            },
            {
              icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2",
              path2: "M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M19 3.13a4 4 0 0 1 0 7.75",
              title: "100+ Years Combined Experience",
              subtitle: "Clinical & Industry Expertise"
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
                desc: "Harnessing nitinol's superelastic properties for continuous dynamic compression, designed to support long-term fusion biology.",
                href: "/clinical-evidence",
                label: "Clinical Evidence",
                img: "https://res.cloudinary.com/dvm7fjhxs/image/upload/f_auto,q_auto/v1777651397/Precision-Engineering-Clinical-Mechanism_m8nein.jpg"
              },
              {
                title: "Workflow Simplicity",
                desc: "Reduced tray burden with single-use sterile instrumentation, specifically engineered for the ASC economic model.",
                href: "/solutions",
                label: "Solution Overview",
                img: "https://res.cloudinary.com/dvm7fjhxs/image/upload/f_auto,q_auto/v1777651395/Precision-Engineering-WorkflowSimplicity_gatklc.jpg"
              },
              {
                title: "Platform Potential",
                desc: "Our cervical technology is the foundation for a broader nitinol-based spinal fixation platform currently in development.",
                href: "/products",
                label: "Roadmap",
                img: "https://res.cloudinary.com/dvm7fjhxs/image/upload/f_auto,q_auto/v1777651408/Precision-Engineering-Platform-Potential_vxhga9.jpg"
              }
            ].map((card, i) => (
              <div className="why-card-new" key={i}>
                <div className="why-card-img-new" style={{ overflow: "hidden", padding: 0 }}>
                  <Image
                    src={card.img}
                    alt={card.title}
                    width={600}
                    height={340}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    unoptimized
                  />
                </div>
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
              { title: "OR Time",          impact: "20–30 min saved/case",          label1: "Traditional Model", val1: "15‥25 min count",           label2: "Pressio Continuum", val2: "Open and insert" },
              { title: "Instrument Trays", impact: "100% tray elimination",          label1: "Traditional Model", val1: "3–4 multi-tray sets",         label2: "Pressio Continuum", val2: "Single-use sterile kit" },
              { title: "Sterilization",   impact: "$300–600+ saved/case",           label1: "Traditional Model", val1: "On-site reprocessing",          label2: "Pressio Continuum", val2: "Pre-sterilized" },
              { title: "Rep Logistics",   impact: "Rep-independent",                 label1: "Traditional Model", val1: "Rep coordination required",     label2: "Pressio Continuum", val2: "Kit ships direct to site" },
              { title: "RVU",             impact: "Higher margin per case",           label1: "Traditional Model", val1: "Standard ACDF reimbursement",   label2: "Pressio Continuum", val2: "Same RVU, lower cost" },
              { title: "Inventory",       impact: "Near-zero inventory burden",       label1: "Traditional Model", val1: "Consignment at facility",        label2: "Pressio Continuum", val2: "Kit direct, no consignment" },
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
            <Link href="/news" style={{ color: "var(--primary)", fontWeight: 700, fontSize: 14, textDecoration: "none", display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: "100px", border: "1px solid rgba(37, 59, 128, 0.2)", transition: "all 0.2s" }} className="hover-bg-primary-light">
              All Press Releases
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M2 7h10M8 3l4 4-4 4" />
              </svg>
            </Link>
          </div>

          <div className="why-grid-new">
            {(data?.newsTeaser ?? []).map((post) => (
              <article className="product-card-new" key={post._id}>
                <div className="product-card-img-new" style={{ backgroundColor: "#F1F5F9", height: 180, position: "relative", overflow: "hidden" }}>
                  {post.heroImage && (
                    <Image
                      src={urlFor(post.heroImage).width(600).height(400).url()}
                      alt={post.title}
                      fill
                      style={{ objectFit: "cover" }}
                      unoptimized
                    />
                  )}
                </div>
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
