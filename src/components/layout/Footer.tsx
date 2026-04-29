import Link from "next/link";

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
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer__grid">
          {/* Brand column */}
          <div>
            <p className="footer__brand-name">Pressio Spine™</p>
            <p className="footer__tagline">
              Advanced spinal implant systems backed by clinical evidence.
              Engineered for surgeons, designed for patients.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <p className="footer__col-title">{title}</p>
              <ul className="footer__links" role="list">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="footer__link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} Pressio Spine™. All rights reserved.</p>
          <div style={{ display: "flex", gap: "var(--space-6)" }}>
            <Link href="/privacy-policy" className="footer__link">Privacy Policy</Link>
            <Link href="/terms"          className="footer__link">Terms of Use</Link>
            <Link href="/sitemap.xml"    className="footer__link">Sitemap</Link>
          </div>
          <p style={{ fontSize: "var(--text-xs)", opacity: 0.5 }}>
            510(k) Pending — Not for sale in the US until clearance received.
          </p>
        </div>
      </div>
    </footer>
  );
}
