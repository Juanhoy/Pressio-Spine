import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Pressio Spine Privacy Policy regarding the collection and use of personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="hero-new" style={{ minHeight: "300px" }} aria-labelledby="privacy-heading">
        <div className="hero-overlay-new" style={{ background: "linear-gradient(105deg, rgba(37, 59, 128, 0.95) 0%, rgba(0, 71, 171, 0.8) 100%)" }} />
        <div className="hero-inner-new" style={{ padding: "80px 40px" }}>
          <div className="hero-content-new">
            <h1 id="privacy-heading" style={{ color: "white", marginBottom: "20px" }}>
              Privacy Policy
            </h1>
            <p className="hero-sub-new" style={{ maxWidth: "600px" }}>
              Effective Date: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>
          </div>
        </div>
      </section>

      <section className="section-new" style={{ background: "var(--neutral)" }}>
        <div className="section-inner-new" style={{ maxWidth: 800, margin: "0 auto", background: "white", padding: "60px", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-sm)" }}>
          
          <div style={{ fontFamily: "var(--body)", color: "var(--gray-800)", lineHeight: "1.7" }}>
            <p style={{ marginBottom: "24px" }}>
              At Pressio Spine ("we," "our," or "us"), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share information when you visit our website (pressiospine.com) or interact with our digital marketing communications. 
            </p>
            
            <div style={{ padding: "16px", background: "rgba(37, 59, 128, 0.05)", borderRadius: "var(--radius-md)", borderLeft: "4px solid var(--primary)", marginBottom: "32px" }}>
              <p style={{ margin: 0, fontWeight: 600, color: "var(--primary)" }}>Medical Disclaimer</p>
              <p style={{ margin: "8px 0 0 0", fontSize: "14px" }}>
                This website is intended for healthcare professionals, partners, and investors. We do not collect Protected Health Information (PHI) through this website. Patients should not submit personal health information via our contact forms.
              </p>
            </div>

            <h3 style={{ fontFamily: "var(--headline)", fontSize: "20px", color: "var(--gray-900)", marginBottom: "16px", marginTop: "32px" }}>1. Information We Collect</h3>
            <p style={{ marginBottom: "16px" }}>
              We may collect the following types of information:
            </p>
            <ul style={{ paddingLeft: "24px", marginBottom: "24px" }}>
              <li style={{ marginBottom: "8px" }}><strong>Information You Provide to Us:</strong> When you fill out a contact form (e.g., requesting surgical support or distributor information), we collect your name, email address, company/hospital name, role, and any message you submit.</li>
              <li style={{ marginBottom: "8px" }}><strong>Automatically Collected Information:</strong> We use cookies and similar technologies to automatically collect technical data such as your IP address, browser type, operating system, and browsing behavior on our site.</li>
            </ul>

            <h3 style={{ fontFamily: "var(--headline)", fontSize: "20px", color: "var(--gray-900)", marginBottom: "16px", marginTop: "32px" }}>2. How We Use Your Information</h3>
            <p style={{ marginBottom: "16px" }}>
              We use the collected information to:
            </p>
            <ul style={{ paddingLeft: "24px", marginBottom: "24px" }}>
              <li style={{ marginBottom: "8px" }}>Respond to your inquiries and fulfill requests submitted via our contact forms.</li>
              <li style={{ marginBottom: "8px" }}>Analyze website usage to improve our digital content and user experience.</li>
              <li style={{ marginBottom: "8px" }}>Communicate with you regarding our products, clinical data, and corporate news (only if you have opted in).</li>
            </ul>

            <h3 style={{ fontFamily: "var(--headline)", fontSize: "20px", color: "var(--gray-900)", marginBottom: "16px", marginTop: "32px" }}>3. Third-Party Services</h3>
            <p style={{ marginBottom: "24px" }}>
              We do not sell your personal data. We may share your information with trusted third-party service providers who assist us in operating our website and conducting our business. For example, form submissions are securely processed and stored using HubSpot CRM. These providers are bound by strict confidentiality obligations.
            </p>

            <h3 style={{ fontFamily: "var(--headline)", fontSize: "20px", color: "var(--gray-900)", marginBottom: "16px", marginTop: "32px" }}>4. Your Privacy Rights</h3>
            <p style={{ marginBottom: "24px" }}>
              Depending on your location (e.g., under the GDPR in Europe or the CCPA in California), you may have the right to request access to, correction of, or deletion of your personal data. To exercise these rights, please contact us using the details below.
            </p>

            <h3 style={{ fontFamily: "var(--headline)", fontSize: "20px", color: "var(--gray-900)", marginBottom: "16px", marginTop: "32px" }}>5. Contact Us</h3>
            <p style={{ marginBottom: "24px" }}>
              If you have any questions or concerns about this Privacy Policy, please contact us at:<br/>
              <strong>Email:</strong> privacy@pressiospine.com<br/>
              <strong>Address:</strong> [Company Address Placeholder]
            </p>

            <p style={{ fontSize: "13px", color: "var(--gray-500)", marginTop: "48px", borderTop: "1px solid var(--gray-200)", paddingTop: "24px" }}>
              This policy is a provisional draft created for demonstration purposes and should be reviewed by legal counsel before being considered a binding legal document.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
