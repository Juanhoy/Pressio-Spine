import type { Metadata } from "next";
import Link from "next/link";
import { sanityFetch } from "@/lib/sanity/client";
import { SOLUTIONS_QUERY } from "@/lib/sanity/queries";
import type { SolutionsPage } from "@/types/sanity";
import styles from "./solutions.module.css";

export const revalidate = 30;

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Pressio Spine™ solutions for surgeons, ASCs, and distribution partners.",
};

const AUDIENCES = [
  { 
    id: "surgeons", 
    key: "forSurgeons" as const, 
    label: "For Surgeons",  
    img: "https://res.cloudinary.com/dvm7fjhxs/image/upload/v1777652069/Surgeons_o3nldt.png" 
  },
  { 
    id: "ascs",     
    key: "forASCs"     as const, 
    label: "For ASCs",      
    img: "https://res.cloudinary.com/dvm7fjhxs/image/upload/v1777652068/ASCs_nmgfof.png" 
  },
  { 
    id: "partners", 
    key: "forPartners" as const, 
    label: "For Partners",  
    img: "https://res.cloudinary.com/dvm7fjhxs/image/upload/v1777652069/Partners_l5xfjj.png" 
  },
];

export default async function SolutionsPage() {
  const data = await sanityFetch<SolutionsPage>(SOLUTIONS_QUERY).catch(() => null);

  return (
    <div className={styles.container}>
      {AUDIENCES.map(({ id, key, label, img }) => {
        const section = data?.[key];
        return (
          <div key={id} className={styles.column}>
            <div className={styles.bg} style={{ backgroundImage: `url(${img})` }} />
            <div className={styles.overlay} />
            
            <div className={styles.content}>
              <h2 className={styles.title}>{label}</h2>
              <p className={styles.text}>
                {section?.body ?? "Nitinol based implant systems that guarantee quality and consistency on your procedures"}
              </p>
              
              <div className={styles.actions}>
                <Link href={`/solutions/${id}`} className={styles.btnPrimary}>
                  More Details
                </Link>
                <Link href="/contact" className={styles.btnSecondary}>
                  Contact
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
