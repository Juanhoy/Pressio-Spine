// ─── Sanity Schema: Singleton pages ───────────────────────────────────────────
import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({ name: "heroHeadline",            title: "Hero Headline",             type: "string" }),
    defineField({ name: "heroSubheadline",          title: "Hero Sub-headline",         type: "text" }),
    defineField({ name: "heroVideoUrl",             title: "Hero Video URL (Cloudinary)",type: "url" }),
    defineField({ name: "heroCtaLabel",             title: "Hero CTA Label",            type: "string" }),
    defineField({ name: "heroCtaHref",              title: "Hero CTA URL",              type: "string" }),
    defineField({ name: "productsTeaser",           title: "Products Teaser (3 max)",   type: "array", of: [{ type: "reference", to: [{ type: "product" }] }], validation: (R) => R.max(3) }),
    defineField({ name: "clinicalEvidenceTeaser",   title: "Clinical Evidence Teaser",  type: "text" }),
    defineField({ name: "solutionsTeaserLabel",     title: "Solutions Teaser Headline", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "Home Page" }) },
});

export const companyPage = defineType({
  name: "companyPage",
  title: "Company Page",
  type: "document",
  fields: [
    defineField({ name: "mission", title: "Mission Statement", type: "text" }),
    defineField({ name: "leadershipTeam", title: "Leadership Team", type: "array", of: [{ type: "teamMember" }] }),
    defineField({ name: "board",          title: "Board of Directors", type: "array", of: [{ type: "teamMember" }] }),
    defineField({ name: "advisors",       title: "Scientific Advisors", type: "array", of: [{ type: "teamMember" }] }),
    defineField({ name: "pressReleases",  title: "Press Releases", type: "array", of: [{ type: "object", fields: [{ name: "title", type: "string", title: "Title" }, { name: "date", type: "string", title: "Date" }, { name: "url", type: "url", title: "URL" }] }] }),
  ],
  preview: { prepare: () => ({ title: "Company Page" }) },
});

export const solutionsPage = defineType({
  name: "solutionsPage",
  title: "Solutions Page",
  type: "document",
  fields: [
    defineField({ name: "forSurgeons", title: "For Surgeons",  type: "solutionSection" }),
    defineField({ name: "forASCs",     title: "For ASCs",      type: "solutionSection" }),
    defineField({ name: "forPartners", title: "For Partners",  type: "solutionSection" }),
  ],
  preview: { prepare: () => ({ title: "Solutions Page" }) },
});

export const teamMember = defineType({
  name: "teamMember",
  title: "Team Member",
  type: "object",
  fields: [
    defineField({ name: "name",  title: "Name",  type: "string" }),
    defineField({ name: "role",  title: "Role",  type: "string" }),
    defineField({ name: "bio",   title: "Bio",   type: "text" }),
    defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true } }),
  ],
  preview: { select: { title: "name", subtitle: "role" } },
});

export const solutionSection = defineType({
  name: "solutionSection",
  title: "Solution Section",
  type: "object",
  fields: [
    defineField({ name: "headline", title: "Headline", type: "string" }),
    defineField({ name: "body",     title: "Body",     type: "text" }),
    defineField({ name: "ctaLabel", title: "CTA Label",type: "string" }),
    defineField({ name: "ctaHref",  title: "CTA URL",  type: "string" }),
  ],
});
