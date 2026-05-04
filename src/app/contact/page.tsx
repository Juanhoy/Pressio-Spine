"use client";

import { useState } from "react";
import type { FormEvent } from "react";

const HUBSPOT_PORTAL_ID  = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID!;
const HUBSPOT_FORM_ID    = process.env.NEXT_PUBLIC_HUBSPOT_CONTACT_FORM_ID!;

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  const [state, setState] = useState<FormState>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");

    const form = e.currentTarget;
    const data = {
      fields: [
        { name: "firstname", value: (form.elements.namedItem("firstname") as HTMLInputElement).value },
        { name: "lastname",  value: (form.elements.namedItem("lastname")  as HTMLInputElement).value },
        { name: "email",     value: (form.elements.namedItem("email")     as HTMLInputElement).value },
        { name: "company",   value: (form.elements.namedItem("company")   as HTMLInputElement).value },
        { name: "jobtitle",  value: (form.elements.namedItem("role")      as HTMLInputElement).value },
        { name: "message",   value: (form.elements.namedItem("message")   as HTMLTextAreaElement).value },
      ],
      context: { pageUri: window.location.href, pageName: "Contact" },
    };

    try {
      const res = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      setState(res.ok ? "success" : "error");
    } catch {
      setState("error");
    }
  }

  return (
    <div style={{ background: "var(--gradient, linear-gradient(90deg, #253B80 0%, #4FC4F1 100%))", minHeight: "100vh", paddingTop: "calc(80px + var(--header-height, 72px))", paddingBottom: "100px", paddingInline: "24px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ maxWidth: 640, width: "100%", margin: "0 auto", textAlign: "center", color: "white", marginBottom: "40px" }}>
        <span style={{ color: "#E0F2FE", fontWeight: 700, fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
          Get in Touch
        </span>
        <h1 style={{ color: "white", fontSize: "clamp(2.5rem, 4vw, 3.5rem)", fontWeight: 800, marginBottom: "16px", letterSpacing: "-0.03em" }}>
          Contact Us
        </h1>
        <p style={{ color: "rgba(255, 255, 255, 0.9)", fontSize: "1.1rem", lineHeight: 1.5 }}>
          Request product samples, surgical support, or distributor information.
        </p>
      </div>

      <div style={{ maxWidth: 640, width: "100%", margin: "0 auto" }}>
        {state === "success" ? (
          <div style={{ padding: "48px", background: "rgba(255, 255, 255, 0.15)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.3)", borderRadius: "var(--radius-xl)", textAlign: "center", color: "white" }}>
            <p style={{ fontSize: "3rem", marginBottom: "16px" }}>✅</p>
            <h3 style={{ fontSize: "24px", fontWeight: 800, marginBottom: "8px" }}>Thank you!</h3>
            <p style={{ margin: "0 auto", opacity: 0.9 }}>We'll be in touch shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} id="hubspot-contact-form" noValidate style={{ background: "rgba(255, 255, 255, 0.1)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.2)", padding: "40px", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-lg)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
              <Field id="contact-firstname" name="firstname" label="First Name" required />
              <Field id="contact-lastname"  name="lastname"  label="Last Name"  required />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <Field id="contact-email"   name="email"   label="Email"   type="email"   required />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <Field id="contact-company" name="company" label="Company / Hospital" />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <RoleSelect />
            </div>
            <div style={{ marginBottom: "24px" }}>
              <label htmlFor="contact-message" style={labelStyle}>Message *</label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                required
                placeholder="How can we help you?"
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </div>
            <div style={{ marginTop: "32px" }}>
              {state === "error" && (
                <p style={{ color: "#FCA5A5", marginBottom: "16px", fontSize: "14px", fontWeight: 600, textAlign: "center" }}>
                  Something went wrong. Please try again or email us directly.
                </p>
              )}
              <button
                type="submit"
                id="contact-submit"
                disabled={state === "submitting"}
                style={{
                  width: "100%",
                  justifyContent: "center",
                  padding: "14px",
                  background: "var(--white, #ffffff)",
                  color: "var(--primary, #253B80)",
                  border: "none",
                  borderRadius: "100px",
                  fontSize: "16px",
                  fontWeight: 700,
                  cursor: state === "submitting" ? "not-allowed" : "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                }}
              >
                {state === "submitting" ? "Sending…" : "Send Message"}
              </button>
              <p style={{ color: "rgba(255, 255, 255, 0.7)", marginTop: "16px", textAlign: "center", fontSize: "12px" }}>
                Your data is processed securely via HubSpot CRM.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--headline)",
  fontWeight: 700,
  fontSize: "13px",
  color: "#FFFFFF",
  marginBottom: "8px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: "100px",
  fontSize: "15px",
  fontFamily: "var(--body)",
  color: "#000000",
  background: "rgba(255, 255, 255, 0.75)",
  outline: "none",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
};

function Field({
  id,
  name,
  label,
  type = "text",
  required,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} style={labelStyle}>{label}{required && " *"}</label>
      <input id={id} name={name} type={type} required={required} style={inputStyle} />
    </div>
  );
}

function RoleSelect() {
  return (
    <div>
      <label htmlFor="contact-role" style={labelStyle}>Role</label>
      <select id="contact-role" name="role" style={{ ...inputStyle, appearance: "auto" }}>
        <option value="">Select your role…</option>
        <option value="Surgeon">Surgeon</option>
        <option value="OR Staff">OR Staff</option>
        <option value="ASC Administrator">ASC Administrator</option>
        <option value="Distributor">Distributor</option>
        <option value="Investor">Investor</option>
        <option value="Other">Other</option>
      </select>
    </div>
  );
}
