import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { sanityFetch } from "@/lib/sanity/client";
import { SOLUTIONS_QUERY, PRODUCTS_QUERY } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import type { SolutionsPage, Product } from "@/types/sanity";
import styles from "./hub.module.css";
import { MoveRight, Building2, Stethoscope, Handshake, TrendingUp } from "lucide-react";

const VALUE_EQUATION_DATA = [
  {
    stakeholder: "Hospital & ASC",
    icon: Building2,
    img: "https://res.cloudinary.com/dvm7fjhxs/image/upload/v1777652068/ASCs_nmgfof.png",
    proposition: "Pre-sterilized / Ready-to-use. No reprocessing or tray storage delays. Save $300–$600+ per case in sterilization costs."
  },
  {
    stakeholder: "The Surgeon",
    icon: Stethoscope,
    img: "https://res.cloudinary.com/dvm7fjhxs/image/upload/v1777652069/Surgeons_o3nldt.png",
    proposition: "Reproducible Results. 41.19 RVU valuation with a simplified 3-step technique. Self-sufficient by case three."
  },
  {
    stakeholder: "Sales Channel",
    icon: Handshake,
    img: "https://res.cloudinary.com/dvm7fjhxs/image/upload/v1777652069/Partners_l5xfjj.png", // Placeholder/fallback for now
    proposition: "Zero Tray Capital. Higher commissions and reduced delivery complexity without consignment inventory."
  },
  {
    stakeholder: "Strategic Acquirer",
    icon: TrendingUp,
    img: "https://res.cloudinary.com/dvm7fjhxs/image/upload/v1777652069/Partners_l5xfjj.png",
    proposition: "High Scalability. Simple commercial integration with near-zero capital instrument investment and high gross margins."
  }
];

const COMPARISON_DATA = [
  { feature: "OR Time",          legacy: "15–25 min instrument count",   pressio: "Open and insert",            impact: "20–30 min saved per case" },
  { feature: "Instrument Trays", legacy: "3–4 multi-tray sets",          pressio: "Single-use sterile kit",     impact: "100% tray elimination" },
  { feature: "Sterilization",    legacy: "On-site reprocessing",          pressio: "Pre-sterilized",            impact: "$300–$600+ saved per case" },
  { feature: "Rep Logistics",    legacy: "Rep coordination required",     pressio: "Kit ships direct to site",   impact: "Rep-independent" },
  { feature: "RVU",              legacy: "Standard ACDF reimbursement",   pressio: "Same RVU, lower cost",       impact: "Higher margin per case" },
  { feature: "Inventory",        legacy: "Consignment held at facility",  pressio: "Kit direct, no consignment", impact: "Near-zero inventory burden" },
];

// Dynamic parameters
export const revalidate = 30;

export async function generateStaticParams() {
  return [
    { slug: "surgeons" },
    { slug: "ascs" },
    { slug: "partners" },
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const titles: Record<string, string> = {
    surgeons: "For Surgeons | Pressio Spine",
    ascs: "For ASCs | Pressio Spine",
    partners: "For Partners | Pressio Spine",
  };
  return { title: titles[slug] ?? "Solutions" };
}

export default async function HubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  if (!["surgeons", "ascs", "partners"].includes(slug)) {
    notFound();
  }

  const [solutionsData, productsData] = await Promise.all([
    sanityFetch<SolutionsPage>(SOLUTIONS_QUERY).catch(() => null),
    sanityFetch<Product[]>(PRODUCTS_QUERY).catch(() => [])
  ]);

  const targetKey = slug === "surgeons" ? "forSurgeons" : slug === "ascs" ? "forASCs" : "forPartners";
  const section = solutionsData?.[targetKey];

  const heroTitle = slug === "ascs" ? "A new paradigm for ASCs" : (section?.headline ?? `For ${slug.charAt(0).toUpperCase() + slug.slice(1)}`);
  const heroSubtitle = slug === "ascs" ? "The ASC-era question is different: which system delivers safe clinical outcomes with the lowest total cost and lowest operational friction per case?" : (section?.body ?? "Nitinol based implant systems that guarantee quality and consistency on your procedures");

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.heroTitle}>{heroTitle}</h1>
          <p className={styles.heroSubtitle}>{heroSubtitle}</p>
        </div>
      </section>

      {/* Value Equation (ASCs only) */}
      {slug === "ascs" && (
        <section className={styles.valueEquation}>
          <div className={styles.container}>
            <div className={styles.valueEquationHeader}>
              <span className={styles.valueEquationLabel}>The Platform for Growth</span>
              <h2 className={styles.valueEquationTitle}>The Value Equation</h2>
              <p className={styles.valueEquationSubtitle}>
                Pressio isn't just a device; it’s a platform for growth that addresses the four primary stakeholders in the ASC environment.
              </p>
            </div>
            <div className={styles.valueGrid}>
              {VALUE_EQUATION_DATA.map((item) => (
                <div key={item.stakeholder} className={styles.valueCard}>
                  <div className={styles.valueCardImageWrap}>
                    <Image 
                      src={item.img} 
                      alt={item.stakeholder} 
                      fill 
                      style={{ objectFit: "cover" }}
                      unoptimized
                    />
                  </div>
                  <div className={styles.valueCardBody}>
                    <h3 className={styles.stakeholderTitle}>
                      <item.icon size={18} className={styles.stakeholderIcon} />
                      {item.stakeholder}
                    </h3>
                    <p className={styles.propositionText}>{item.proposition}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className={styles.main}>
        <div className={styles.bucketHeader}>
          <span className={styles.bucketLabel}>Available Now — FDA Cleared & Commercially Distributed</span>
        </div>

        <div className={styles.grid}>
          {productsData.map((product) => {
            const fileHref = slug === "surgeons" 
              ? product.surgicalTechnique?.[0]?.url 
              : product.brochure;
            
            const buttonLabel = slug === "surgeons" 
              ? "Surgical Technique" 
              : "Download Brochure";

            return (
              <div key={product._id} className={styles.card}>
                <div className={styles.cardImageWrap}>
                  {product.heroImage ? (
                    <Image
                      src={urlFor(product.heroImage).width(600).height(400).url()}
                      alt={product.name}
                      fill
                      style={{ objectFit: "contain", padding: "16px" }}
                      unoptimized
                    />
                  ) : (
                    <div className={styles.placeholder} />
                  )}
                </div>
                
                <div className={styles.cardBody}>
                  <span className={styles.badge}>
                    {product.status === "available" ? "FDA 510(k) Cleared" : "In Development"}
                  </span>
                  
                  <h3 className={styles.cardTitle}>{product.name}</h3>
                  
                  {product.tagline && (
                    <p className={styles.cardTagline}>{product.tagline}</p>
                  )}
                  
                  <div className={styles.cardActions}>
                    {fileHref ? (
                      <a href={fileHref} target="_blank" rel="noopener noreferrer" className={styles.btnSolid}>
                        {buttonLabel}
                      </a>
                    ) : (
                      <span className={styles.btnSolidDisabled}>
                        {buttonLabel}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Legacy vs Pressio Comparison (ASCs only) */}
      {slug === "ascs" && (
        <section className={styles.comparison}>
          <div className={styles.container}>
            <div className={styles.comparisonHeader}>
              <h2 className={styles.comparisonTitle}>Legacy Model vs. Pressio CONTINUUM</h2>
              <p className={styles.valueEquationSubtitle}>
                See exactly where Pressio eliminates cost and complexity at every step of the surgical workflow.
              </p>
            </div>

            {/* Mobile swipe hint */}
            <p className={styles.scrollHint}>← Swipe to explore →</p>

            {/* Scrollable outer wrapper */}
            <div className={styles.comparisonScrollOuter}>
              <div className={styles.comparisonTable}>
                {/* Header Row */}
                <div className={styles.comparisonRow + " " + styles.comparisonRowHeader}>
                  <div className={styles.comparisonCellFeature}>Feature</div>
                  <div className={styles.comparisonCellLegacy}>
                    <span className={styles.columnBadgeLegacy}>Traditional Model</span>
                  </div>
                  <div className={styles.comparisonCellPressio}>
                    <span className={styles.columnBadgePressio}>Pressio CONTINUUM</span>
                  </div>
                  <div className={styles.comparisonCellImpact}>
                    <span className={styles.columnBadgeImpact}>Net Impact</span>
                  </div>
                </div>

                {/* Data Rows */}
                {COMPARISON_DATA.map((row, i) => (
                  <div key={row.feature} className={styles.comparisonRow + (i % 2 === 0 ? " " + styles.comparisonRowEven : "")}>
                    <div className={styles.comparisonCellFeature}>
                      <strong>{row.feature}</strong>
                    </div>
                    <div className={styles.comparisonCellLegacy}>
                      <span className={styles.legacyValue}>{row.legacy}</span>
                    </div>
                    <div className={styles.comparisonCellPressio}>
                      <span className={styles.pressioValue}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{flexShrink: 0}}>
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {row.pressio}
                      </span>
                    </div>
                    <div className={styles.comparisonCellImpact}>
                      <span className={styles.impactValue}>{row.impact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
