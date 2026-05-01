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
    <>
      {/* Page hero */}
      <section className="hero-new" style={{ minHeight: "400px" }} aria-labelledby="contact-page-heading">
        <div className="hero-overlay-new" style={{ background: "linear-gradient(105deg, rgba(37, 59, 128, 0.95) 0%, rgba(0, 71, 171, 0.8) 100%)" }} />
        <div className="hero-inner-new" style={{ padding: "100px 40px" }}>
          <div className="hero-content-new">
            <span className="section-label-new" style={{ color: "var(--secondary)" }}>Get in Touch</span>
            <h1 id="contact-page-heading" style={{ color: "white", marginBottom: "20px" }}>
              Contact Us
            </h1>
            <p className="hero-sub-new" style={{ maxWidth: "520px" }}>
              Request product samples, surgical support, or distributor information.
            </p>
          </div>
        </div>
      </section>

      <section className="section-new" aria-labelledby="contact-form-heading" style={{ background: "var(--neutral)" }}>
        <div className="section-inner-new" style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h2 id="contact-form-heading" className="section-title-new" style={{ marginBottom: "16px" }}>
              Send Us a Message
            </h2>
            <p className="section-sub-new" style={{ margin: "0 auto" }}>Fill out the form below and our team will get back to you promptly.</p>
          </div>

          {state === "success" ? (
            <div style={{ padding: "48px", background: "rgba(126, 215, 245, 0.1)", border: "1px solid rgba(126, 215, 245, 0.3)", borderRadius: "var(--radius-xl)", textAlign: "center" }}>
              <p style={{ fontSize: "3rem", marginBottom: "16px" }}>✅</p>
              <h3 className="section-title-new" style={{ fontSize: "24px", marginBottom: "8px" }}>Thank you!</h3>
              <p className="section-sub-new" style={{ margin: "0 auto" }}>We'll be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} id="hubspot-contact-form" noValidate style={{ background: "white", padding: "40px", borderRadius: "var(--radius-xl)", border: "1px solid var(--gray-100)", boxShadow: "var(--shadow-sm)" }}>
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
                  <p style={{ color: "#E11D48", marginBottom: "16px", fontSize: "14px", fontWeight: 600, textAlign: "center" }}>
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}
                <button
                  type="submit"
                  id="contact-submit"
                  className="btn-primary-new"
                  disabled={state === "submitting"}
                  style={{ width: "100%", justifyContent: "center", padding: "16px" }}
                >
                  {state === "submitting" ? "Sending…" : "Send Message"}
                </button>
                <p style={{ color: "var(--gray-500)", marginTop: "16px", textAlign: "center", fontSize: "12px" }}>
                  Your data is processed securely via HubSpot CRM.
                </p>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--headline)",
  fontWeight: 700,
  fontSize: "13px",
  color: "var(--gray-900)",
  marginBottom: "8px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  border: "1px solid var(--gray-200)",
  borderRadius: "var(--radius)",
  fontSize: "15px",
  fontFamily: "var(--body)",
  color: "var(--gray-900)",
  background: "var(--white)",
  outline: "none",
  transition: "border-color var(--transition), box-shadow var(--transition)",
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
