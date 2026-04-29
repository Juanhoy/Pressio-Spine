import type { Metadata } from "next";
import Image from "next/image";
import { sanityClient } from "@/lib/sanity/client";
import { COMPANY_QUERY } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import type { CompanyPage, TeamMember } from "@/types/sanity";

export const metadata: Metadata = {
  title: "Company",
  description:
    "Meet the Pressio Spine™ team — our mission, leadership, board of directors, and scientific advisors.",
};

export default async function CompanyPageRoute() {
  const data = await sanityClient
    .fetch<CompanyPage>(COMPANY_QUERY)
    .catch(() => null);

  return (
    <>
      {/* Mission */}
      <section className="page-hero" aria-labelledby="company-mission-heading">
        <div className="container" style={{ maxWidth: 760 }}>
          <p className="overline">Our Mission</p>
          <h1 id="company-mission-heading" className="heading-xl" style={{ color: "var(--color-white)", marginTop: "var(--space-3)" }}>
            Advancing Spine Surgery, One Patient at a Time
          </h1>
          <p className="body-lg" style={{ color: "rgba(255,255,255,0.75)", marginTop: "var(--space-6)" }}>
            {data?.mission ??
              "Pressio Spine™ was founded to close the gap between surgical innovation and clinical outcomes — delivering implants that surgeons trust and patients deserve."}
          </p>
        </div>
      </section>

      {/* Leadership */}
      <TeamSection
        id="leadership"
        title="Leadership Team"
        members={data?.leadershipTeam}
      />

      {/* Board */}
      <TeamSection
        id="board"
        title="Board of Directors"
        members={data?.board}
        dark
      />

      {/* Advisors */}
      <TeamSection
        id="advisors"
        title="Scientific Advisory Board"
        members={data?.advisors}
      />

      {/* Press releases */}
      {data?.pressReleases && data.pressReleases.length > 0 && (
        <section className="section section--gray" aria-labelledby="company-press-heading">
          <div className="container">
            <h2 id="company-press-heading" className="heading-md" style={{ marginBottom: "var(--space-8)" }}>
              Press Releases
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              {data.pressReleases.map((pr, i) => (
                <a
                  key={i}
                  href={pr.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={`company-press-${i}`}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "var(--space-4) var(--space-6)", background: "var(--color-white)", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-sm)" }}
                >
                  <span className="heading-sm">{pr.title}</span>
                  <span className="body-sm" style={{ color: "var(--color-gray-500)" }}>{pr.date}</span>
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
      className={`section${dark ? " section--dark" : ""}`}
      aria-labelledby={`company-${id}-heading`}
    >
      <div className="container">
        <h2
          id={`company-${id}-heading`}
          className="heading-md"
          style={{ marginBottom: "var(--space-12)", color: dark ? "var(--color-white)" : undefined }}
        >
          {title}
        </h2>

        {members && members.length > 0 ? (
          <div className="grid-4">
            {members.map((member, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                {member.photo ? (
                  <div style={{ width: 120, height: 120, borderRadius: "50%", overflow: "hidden", margin: "0 auto var(--space-4)" }}>
                    <Image
                      src={urlFor(member.photo).width(240).height(240).url()}
                      alt={member.name}
                      width={120}
                      height={120}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                ) : (
                  <div style={{ width: 120, height: 120, borderRadius: "50%", background: "var(--color-gray-100)", margin: "0 auto var(--space-4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", color: "var(--color-gray-300)" }}>
                    {member.name.charAt(0)}
                  </div>
                )}
                <p className="heading-sm" style={{ color: dark ? "var(--color-white)" : undefined }}>{member.name}</p>
                <p className="body-sm" style={{ color: dark ? "rgba(255,255,255,0.6)" : "var(--color-gray-500)", marginTop: "var(--space-1)" }}>{member.role}</p>
                {member.bio && (
                  <p className="body-sm" style={{ color: dark ? "rgba(255,255,255,0.5)" : "var(--color-gray-500)", marginTop: "var(--space-3)" }}>
                    {member.bio}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="body-lg" style={{ color: dark ? "rgba(255,255,255,0.5)" : "var(--color-gray-500)" }}>
            Team information will appear here once added in Sanity.
          </p>
        )}
      </div>
    </section>
  );
}
