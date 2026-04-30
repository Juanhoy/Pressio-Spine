"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const FOOTER_LINKS = {
  Products: [
    { label: "Available Products", href: "/products#available" },
    { label: "In Development",     href: "/products#development" },
    { label: "Product Detail",     href: "/products" },
  ],
  "Clinical Evidence": [
    { label: "Clinical Summary",   href: "/clinical-evidence" },
    { label: "Publications",       href: "/clinical-evidence?type=publication" },
    { label: "White Papers",       href: "/clinical-evidence?type=white-paper" },
  ],
  Solutions: [
    { label: "For Surgeons",       href: "/solutions#surgeons" },
    { label: "For ASCs",           href: "/solutions#ascs" },
    { label: "For Partners",       href: "/solutions#partners" },
  ],
  Company: [
    { label: "Mission",            href: "/company#mission" },
    { label: "Leadership",         href: "/company#leadership" },
    { label: "News",               href: "/news" },
    { label: "Contact",            href: "/contact" },
  ],
};

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/studio")) return null;
  return (
    <>
      <div className="reg-bar-new" role="note">
        <p>
          <strong>Regulatory notice:</strong> Pipeline products shown on this site are In Development and have not received
          FDA clearance. They are not available for commercial sale. Clinical data presented on this site is provided with
          full study qualification, including design, sample size, and applicable limitations. For complete prescribing and
          indication information, refer to the applicable Instructions for Use (IFU). Rx only. For use by trained healthcare
          professionals only.
        </p>
      </div>

      <footer className="site-footer-new">
        <div className="footer-main-new">
          <div className="footer-brand-new">
            <Link href="/" className="logo-footer-new" aria-label="Pressio Spine home">
              <img src="/img/Brand/PressioSpineLogoWhite.png" alt="Pressio Spine Logo" style={{ height: 50, marginBottom: 16 }} />
            </Link>
            <p>Precision nitinol-based fixation for anterior cervical fusion. Built for the ASC era.</p>
            <div className="footer-fda-new">
              CONTINUUM ACDF Nitinol Fixation System: FDA 510(k) Cleared for anterior cervical fixation. For full
              indications, contraindications, and warnings, see product IFU.
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title} className="footer-col-new">
              <h6>{title}</h6>
              <ul>
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom-new">
          <span>© {new Date().getFullYear()} Pressio Spine. All rights reserved. Content subject to regulatory review.</span>
          <div className="footer-bottom-links-new">
            <Link href="/privacy-policy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/cookie-policy">Cookies</Link>
            <Link href="/sitemap.xml">Sitemap</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
