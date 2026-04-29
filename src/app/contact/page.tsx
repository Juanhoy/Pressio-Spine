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
      <section className="page-hero" aria-labelledby="contact-page-heading">
        <div className="container">
          <p className="overline">Get in Touch</p>
          <h1 id="contact-page-heading" className="heading-xl" style={{ color: "var(--color-white)", marginTop: "var(--space-3)" }}>
            Contact Us
          </h1>
          <p className="body-lg" style={{ color: "rgba(255,255,255,0.7)", marginTop: "var(--space-4)", maxWidth: 520 }}>
            Request product samples, surgical support, or distributor information.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="contact-form-heading">
        <div className="container" style={{ maxWidth: 680 }}>
          <h2 id="contact-form-heading" className="heading-md" style={{ marginBottom: "var(--space-8)" }}>
            Send Us a Message
          </h2>

          {state === "success" ? (
            <div style={{ padding: "var(--space-8)", background: "rgba(0,194,168,0.08)", border: "1px solid var(--color-accent)", borderRadius: "var(--radius-lg)", textAlign: "center" }}>
              <p style={{ fontSize: "2rem", marginBottom: "var(--space-4)" }}>✅</p>
              <p className="heading-sm">Thank you! We'll be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} id="hubspot-contact-form" noValidate>
              <div className="grid-2" style={{ gap: "var(--space-4)", marginBottom: "var(--space-4)" }}>
                <Field id="contact-firstname" name="firstname" label="First Name" required />
                <Field id="contact-lastname"  name="lastname"  label="Last Name"  required />
              </div>
              <Field id="contact-email"   name="email"   label="Email"   type="email"   required />
              <div style={{ marginBottom: "var(--space-4)" }} />
              <Field id="contact-company" name="company" label="Company / Hospital" />
              <div style={{ marginBottom: "var(--space-4)" }} />
              <RoleSelect />
              <div style={{ marginBottom: "var(--space-4)" }} />
              <label htmlFor="contact-message" style={labelStyle}>Message</label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                required
                placeholder="How can we help you?"
                style={{ ...inputStyle, resize: "vertical" }}
              />
              <div style={{ marginTop: "var(--space-6)" }}>
                {state === "error" && (
                  <p style={{ color: "var(--color-danger)", marginBottom: "var(--space-4)" }}>
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}
                <button
                  type="submit"
                  id="contact-submit"
                  className="btn btn--primary"
                  disabled={state === "submitting"}
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  {state === "submitting" ? "Sending…" : "Send Message"}
                </button>
                <p className="body-sm" style={{ color: "var(--color-gray-300)", marginTop: "var(--space-4)", textAlign: "center" }}>
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
  fontWeight: 600,
  fontSize: "var(--text-sm)",
  color: "var(--color-navy)",
  marginBottom: "var(--space-2)",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "var(--space-3) var(--space-4)",
  border: "1.5px solid var(--color-gray-100)",
  borderRadius: "var(--radius-md)",
  fontSize: "var(--text-base)",
  color: "var(--color-navy)",
  background: "var(--color-white)",
  outline: "none",
  transition: "border-color var(--transition-fast)",
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
      <select id="contact-role" name="role" style={inputStyle}>
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
