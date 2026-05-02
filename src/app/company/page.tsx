import type { Metadata } from "next";
import Image from "next/image";
import { sanityFetch } from "@/lib/sanity/client";
import { COMPANY_QUERY } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import type { CompanyPage, TeamMember } from "@/types/sanity";

export const revalidate = 30;

export const metadata: Metadata = {
  title: "Company",
  description:
    "Meet the Pressio Spine™ team — our mission, leadership, board of directors, and scientific advisors.",
};

export default async function CompanyPageRoute() {
  const data = await sanityFetch<CompanyPage>(COMPANY_QUERY)
    .catch(() => null);

  return (
    <>
      <section className="hero-new" style={{ minHeight: "500px" }} aria-labelledby="company-mission-heading">
        <div className="hero-overlay-new" style={{ background: "linear-gradient(105deg, rgba(37, 59, 128, 0.95) 0%, rgba(0, 71, 171, 0.8) 100%)" }} />
        <div className="hero-inner-new" style={{ padding: "120px 40px" }}>
          <div className="hero-content-new" style={{ maxWidth: "760px" }}>
            <span className="section-label-new" style={{ color: "var(--secondary)" }}>Our Mission</span>
            <h1 id="company-mission-heading" style={{ color: "white", marginBottom: "24px" }}>
              Advancing Spine Surgery, One Patient at a Time
            </h1>
            <p className="hero-sub-new">
              {data?.mission ??
                "Pressio Spine™ was founded to close the gap between surgical innovation and clinical outcomes — delivering implants that surgeons trust and patients deserve."}
            </p>
          </div>
        </div>
      </section>

      <TeamSection
        id="leadership"
        title="Leadership Team"
        members={data?.leadershipTeam}
      />

      <TeamSection
        id="board"
        title="Board of Directors"
        members={data?.board}
        dark
      />

      <TeamSection
        id="advisors"
        title="Scientific Advisory Board"
        members={data?.advisors}
      />

      {data?.pressReleases && data.pressReleases.length > 0 && (
        <section className="section-new" style={{ background: "var(--neutral)" }} aria-labelledby="company-press-heading">
          <div className="section-inner-new">
            <span className="section-label-new">Archive</span>
            <h2 id="company-press-heading" className="section-title-new" style={{ marginBottom: "40px" }}>
              Press Releases
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {data.pressReleases.map((pr, i) => (
                <a
                  key={i}
                  href={pr.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="why-card-new"
                  id={`company-press-${i}`}
                  style={{ 
                    display: "flex", 
                    flexDirection: "row",
                    alignItems: "center", 
                    justifyContent: "space-between", 
                    padding: "20px 32px",
                    textDecoration: "none"
                  }}
                >
                  <span style={{ fontFamily: "var(--headline)", fontWeight: 700, color: "var(--primary)" }}>{pr.title}</span>
                  <span style={{ fontSize: "13px", color: "var(--gray-400)", fontFamily: "var(--headline)" }}>{pr.date}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function TeamSection({
  id,
  title,
  members,
  dark,
}: {
  id: string;
  title: string;
  members?: TeamMember[];
  dark?: boolean;
}) {
  return (
    <section
      id={id}
      className="section-new"
      style={dark ? { background: "var(--navy)", color: "white" } : {}}
      aria-labelledby={`company-${id}-heading`}
    >
      <div className="section-inner-new">
        <span className="section-label-new" style={dark ? { color: "var(--secondary)" } : {}}>Governance</span>
        <h2
          id={`company-${id}-heading`}
          className="section-title-new"
          style={{ marginBottom: "56px", color: dark ? "white" : undefined }}
        >
          {title}
        </h2>

        {members && members.length > 0 ? (
          <div className="why-grid-new" style={{ marginTop: "0" }}>
            {members.map((member, i) => (
              <div key={i} className="why-card-new" style={dark ? { background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)" } : {}}>
                <div className="why-card-body-new" style={{ textAlign: "center", alignItems: "center" }}>
                  {member.photo ? (
                    <div style={{ width: 100, height: 100, borderRadius: "50%", overflow: "hidden", marginBottom: "20px", border: "3px solid var(--secondary)" }}>
                      <Image
                        src={urlFor(member.photo).width(200).height(200).url()}
                        alt={member.name}
                        width={100}
                        height={100}
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  ) : (
                    <div style={{ width: 100, height: 100, borderRadius: "50%", background: dark ? "rgba(255,255,255,0.1)" : "#F1F5F9", marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", color: dark ? "white" : "var(--gray-300)" }}>
                      {member.name.charAt(0)}
                    </div>
                  )}
                  <h3 style={{ color: dark ? "white" : undefined, fontSize: "17px", marginBottom: "4px" }}>{member.name}</h3>
                  <p style={{ color: dark ? "var(--secondary)" : "var(--primary)", fontWeight: 700, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "16px" }}>
                    {member.role}
                  </p>
                  {member.bio && (
                    <p style={{ color: dark ? "rgba(255,255,255,0.6)" : undefined, fontSize: "13px", lineHeight: "1.6" }}>
                      {member.bio}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="section-sub-new" style={{ color: dark ? "rgba(255,255,255,0.5)" : undefined }}>
            Team information will appear here once added in Sanity.
          </p>
        )}
      </div>
    </section>
  );
}
