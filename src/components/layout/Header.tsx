"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Products",          href: "/products" },
  { label: "Clinical Evidence", href: "/clinical-evidence" },
  { label: "Solutions",         href: "/solutions" },
  { label: "Company",           href: "/company" },
  { label: "News",              href: "/news" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <header
      className={`site-header${scrolled ? " site-header--scrolled" : ""}`}
      role="banner"
    >
      <div className="container">
        <nav className="nav" aria-label="Main navigation">
          {/* Logo */}
          <Link href="/" className="nav__logo" aria-label="Pressio Spine home">
            Pressio Spine™
          </Link>

          {/* Desktop links */}
          <ul className="nav__links" role="list">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`nav__link${pathname.startsWith(item.href) ? " nav__link--active" : ""}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="nav__cta">
            <Link href="/contact" className="btn btn--accent">
              Contact Us
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-toggle"
            className="nav__hamburger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            style={{ display: "none" }}
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
      </div>
    </header>
  );
}
