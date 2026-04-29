// ─── Sanity schema types (lightweight mirrors of the CMS schemas) ───────────────

export interface SanityImage {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  alt?: string;
}

export interface SanityFile {
  title?: string;
  url: string;
}

// ── Product ──────────────────────────────────────────────────────────────────
export interface Product {
  _id: string;
  name: string;
  tagline: string;
  status: "available" | "in-development";
  slug: string;
  heroImage?: SanityImage;
  gallery?: SanityImage[];
  description?: string;
  keyFeatures?: string[];
  indications?: string[];
  surgicalTechnique?: SanityFile[];
  clinicalEvidence?: ClinicalEvidenceStub[];
  ifu?: string; // URL
  brochure?: string; // URL
  category?: string;
}

export interface ClinicalEvidenceStub {
  _id: string;
  title: string;
  slug: string;
}

// ── Clinical Evidence ─────────────────────────────────────────────────────────
export interface ClinicalEvidence {
  _id: string;
  title: string;
  slug: string;
  category: "clinical-summary" | "white-paper" | "publication";
  summary: string;
  body?: unknown[]; // Portable Text
  publishedAt?: string;
  journal?: string;
  authors?: string[];
  heroImage?: SanityImage;
  files?: SanityFile[];
  relatedProducts?: { _id: string; name: string; slug: string }[];
}

// ── News ──────────────────────────────────────────────────────────────────────
export interface NewsPost {
  _id: string;
  title: string;
  slug: string;
  publishedAt?: string;
  category: string;
  excerpt?: string;
  body?: unknown[]; // Portable Text
  heroImage?: SanityImage;
  author?: string;
}

// ── Company ───────────────────────────────────────────────────────────────────
export interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  photo?: SanityImage;
}

export interface CompanyPage {
  mission?: string;
  leadershipTeam?: TeamMember[];
  board?: TeamMember[];
  advisors?: TeamMember[];
  pressReleases?: { title: string; date: string; url: string }[];
}

// ── Home ──────────────────────────────────────────────────────────────────────
export interface HomePage {
  heroHeadline?: string;
  heroSubheadline?: string;
  heroVideoUrl?: string;
  heroCtaLabel?: string;
  heroCtaHref?: string;
  productsTeaser?: Product[];
  clinicalEvidenceTeaser?: string;
  solutionsTeaserLabel?: string;
}

// ── Solutions ─────────────────────────────────────────────────────────────────
export interface SolutionSection {
  headline?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export interface SolutionsPage {
  forSurgeons?: SolutionSection;
  forASCs?: SolutionSection;
  forPartners?: SolutionSection;
}
