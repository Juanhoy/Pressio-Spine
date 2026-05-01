import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Pressio Spine Cookie Policy regarding the use of cookies and tracking technologies.",
};

export default function CookiePolicyPage() {
  return (
    <>
      <section className="hero-new" style={{ minHeight: "300px" }} aria-labelledby="cookie-heading">
        <div className="hero-overlay-new" style={{ background: "linear-gradient(105deg, rgba(37, 59, 128, 0.95) 0%, rgba(0, 71, 171, 0.8) 100%)" }} />
        <div className="hero-inner-new" style={{ padding: "80px 40px" }}>
          <div className="hero-content-new">
            <h1 id="cookie-heading" style={{ color: "white", marginBottom: "20px" }}>
              Cookie Policy
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
              This Cookie Policy explains how Pressio Spine ("we," "our," or "us") uses cookies and similar tracking technologies on our website (pressiospine.com). This policy should be read alongside our Privacy Policy.
            </p>

            <h3 style={{ fontFamily: "var(--headline)", fontSize: "20px", color: "var(--gray-900)", marginBottom: "16px", marginTop: "32px" }}>1. What Are Cookies?</h3>
            <p style={{ marginBottom: "24px" }}>
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently, provide a better user experience, and supply analytical information to the site owners.
            </p>

            <h3 style={{ fontFamily: "var(--headline)", fontSize: "20px", color: "var(--gray-900)", marginBottom: "16px", marginTop: "32px" }}>2. Types of Cookies We Use</h3>
            
            <div style={{ marginBottom: "24px" }}>
              <h4 style={{ fontFamily: "var(--headline)", fontSize: "16px", color: "var(--primary)", marginBottom: "8px" }}>Strictly Necessary Cookies</h4>
              <p style={{ marginBottom: "16px" }}>
                These cookies are essential for the website to function properly. They enable core functionalities such as security, network management, and accessibility. You cannot opt out of these cookies.
              </p>

              <h4 style={{ fontFamily: "var(--headline)", fontSize: "16px", color: "var(--primary)", marginBottom: "8px" }}>Analytics and Performance Cookies (Optional)</h4>
              <p style={{ marginBottom: "16px" }}>
                These cookies allow us to recognize and count the number of visitors and see how visitors move around our website. This helps us improve the way our website works, for example, by ensuring that users are finding what they are looking for easily.
              </p>

              <h4 style={{ fontFamily: "var(--headline)", fontSize: "16px", color: "var(--primary)", marginBottom: "8px" }}>Marketing and Functional Cookies (Optional)</h4>
              <p style={{ marginBottom: "0" }}>
                These cookies are used to track visitors across websites to display relevant advertisements or to remember choices you make (such as your preferred language) to provide enhanced, more personalized features.
              </p>
            </div>

            <h3 style={{ fontFamily: "var(--headline)", fontSize: "20px", color: "var(--gray-900)", marginBottom: "16px", marginTop: "32px" }}>3. Managing Your Cookie Preferences</h3>
            <p style={{ marginBottom: "24px" }}>
              When you first visit our site, you are presented with a cookie consent banner. By clicking "Accept All", you agree to the use of all cookies. By clicking "Decline Optional", only Strictly Necessary Cookies will be placed on your device.
            </p>
            <p style={{ marginBottom: "24px" }}>
              Additionally, most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set and how to manage and delete them, visit <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)", textDecoration: "underline" }}>aboutcookies.org</a>.
            </p>

            <h3 style={{ fontFamily: "var(--headline)", fontSize: "20px", color: "var(--gray-900)", marginBottom: "16px", marginTop: "32px" }}>4. Contact Us</h3>
            <p style={{ marginBottom: "24px" }}>
              If you have any questions about our use of cookies, please contact us at privacy@pressiospine.com.
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
