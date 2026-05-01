"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already consented
    const consent = localStorage.getItem("pressio_cookie_consent");
    if (!consent) {
      // Small delay so it animates in smoothly instead of blocking hydration
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (type: "all" | "essential") => {
    localStorage.setItem("pressio_cookie_consent", type);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        background: "#53C0E8", // matches the screenshot cyan blue
        zIndex: 9999,
        padding: "16px 24px",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.15)",
        fontFamily: "var(--font-inter), sans-serif",
        animation: "slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "32px",
        }}
        className="cookie-consent-inner"
      >
        <p style={{ margin: 0, fontSize: "14px", color: "#172554", lineHeight: "1.5" }}>
          We use cookies to understand how healthcare professionals and partners interact with our site. No personal
          health information is collected. See our <Link href="/privacy-policy" style={{ textDecoration: "underline", fontWeight: 600, color: "#172554" }}>Privacy Policy</Link> and <Link href="/cookie-policy" style={{ textDecoration: "underline", fontWeight: 600, color: "#172554" }}>Cookie Policy</Link> for details.
        </p>
        <div style={{ display: "flex", gap: "12px", flexShrink: 0 }}>
          <button
            onClick={() => handleConsent("essential")}
            style={{
              padding: "12px 20px",
              borderRadius: "100px",
              border: "1px solid rgba(23, 37, 84, 0.3)",
              background: "transparent",
              color: "#172554",
              fontFamily: "var(--font-hubot), sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 0.2s, border-color 0.2s",
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = "rgba(23, 37, 84, 0.05)"; e.currentTarget.style.borderColor = "rgba(23, 37, 84, 0.5)"; }}
            onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(23, 37, 84, 0.3)"; }}
          >
            Decline Optional
          </button>
          <button
            onClick={() => handleConsent("all")}
            style={{
              padding: "12px 28px",
              borderRadius: "100px",
              border: "none",
              background: "#253B80", // var(--primary) dark blue
              color: "white",
              fontFamily: "var(--font-hubot), sans-serif",
              fontSize: "14px",
              fontWeight: 700,
              cursor: "pointer",
              transition: "transform 0.2s, background 0.2s",
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.background = "#1D2F6B"; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.background = "#253B80"; }}
          >
            Accept All
          </button>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .cookie-consent-inner {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 20px !important;
          }
          .cookie-consent-inner > div {
            width: 100%;
            justify-content: flex-end;
          }
        }
        @media (max-width: 480px) {
          .cookie-consent-inner > div {
            flex-direction: column;
          }
          .cookie-consent-inner button {
            width: 100%;
          }
        }
      `}} />
    </div>
  );
}
