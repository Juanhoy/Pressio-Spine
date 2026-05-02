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

  if (pathname?.startsWith("/studio")) return null;

  return (
    <header id="site-header" className={`site-header-new${scrolled ? " scrolled" : ""}`}>
      <div className="nav-inner">
        <Link href="/" className="logo-new" aria-label="Pressio Spine home">
          <img src="/img/Brand/PressioSpineLogoMagenta.png" alt="Pressio Spine Logo" />
        </Link>

        <nav id="main-nav" className={`nav-new${menuOpen ? " open" : ""}`} role="navigation" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname.startsWith(item.href) ? "active" : ""}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/contact" className="nav-cta-new">
            Contact
          </Link>
        </nav>

        <button
          className="nav-toggle-new"
          id="navToggle"
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <line x1="3" y1="6" x2="19" y2="6" style={{ display: menuOpen ? "none" : "block" }} />
            <line x1="3" y1="11" x2="19" y2="11" />
            <line x1="3" y1="16" x2="19" y2="16" style={{ display: menuOpen ? "none" : "block" }} />
          </svg>
        </button>
      </div>
      
      {/* Invisible overlay to close menu when clicking outside */}
      {menuOpen && (
        <div 
          onClick={() => setMenuOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 98 }}
          aria-hidden="true"
        />
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 900px) {
          #main-nav.nav-new.open {
            background: rgba(255, 255, 255, 0.95) !important;
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            box-shadow: 0 16px 40px rgba(0,0,0,0.15);
            border-bottom-left-radius: 20px;
            border-bottom-right-radius: 20px;
            bottom: auto !important; 
            border: 1px solid rgba(255,255,255,0.4);
            border-top: none;
          }
        }
      `}} />
    </header>
  );
}
