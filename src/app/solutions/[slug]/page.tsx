import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { sanityFetch } from "@/lib/sanity/client";
import { SOLUTIONS_QUERY, PRODUCTS_QUERY } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import type { SolutionsPage, Product } from "@/types/sanity";
import styles from "./hub.module.css";

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

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.heroTitle}>{section?.headline ?? `For ${slug.charAt(0).toUpperCase() + slug.slice(1)}`}</h1>
          <p className={styles.heroSubtitle}>
            {section?.body ?? "Nitinol based implant systems that guarantee quality and consistency on your procedures"}
          </p>
        </div>
      </section>

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
    </div>
  );
}
