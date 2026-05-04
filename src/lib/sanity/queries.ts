// ─── GROQ queries for every section of the site ───────────────────────────────

// Home page
export const HOME_QUERY = `coalesce(*[_type == "homePage"][0], {}) {
  heroHeadline,
  heroSubheadline,
  heroVideoUrl,
  heroCtaLabel,
  heroCtaHref,
  heroBadge,
  "productsTeaser": select(
    count(productsTeaser) > 0 => productsTeaser[]->{_id, name, tagline, status, "slug": slug.current, heroImage},
    true => *[_type == "product"] | order(order asc)[0...4]{_id, name, tagline, status, "slug": slug.current, heroImage}
  ),
  clinicalEvidenceTeaser,
  solutionsTeaserLabel,
  "newsTeaser": *[_type == "newsPost"] | order(publishedAt desc)[0...3]{_id, title, "slug": slug.current, publishedAt, excerpt, heroImage}
}`;

// Products list
export const PRODUCTS_QUERY = `*[_type == "product"] | order(order asc){
  _id,
  name,
  tagline,
  status,
  "slug": slug.current,
  heroImage,
  category,
  surgicalTechnique[]{ title, "url": file.asset->url },
  "brochure": brochure.asset->url
}`;

// Single product
export const PRODUCT_QUERY = `*[_type == "product" && slug.current == $slug][0]{
  _id,
  name,
  tagline,
  status,
  heroImage,
  gallery[],
  description,
  keyFeatures[],
  indications[],
  surgicalTechnique[]{ title, "url": file.asset->url, coverImage },
  clinicalEvidence[]->{_id, title, "slug": slug.current, heroImage},
  "ifu": ifu.asset->url,
  "ifuImage": ifu.coverImage,
  "brochure": brochure.asset->url,
  "brochureImage": brochure.coverImage
}`;

// Clinical Evidence list
export const CLINICAL_EVIDENCE_QUERY = `*[_type == "clinicalEvidence"] | order(_createdAt desc){
  _id,
  title,
  "slug": slug.current,
  category,
  summary,
  publishedAt,
  journal,
  heroImage,
  "fileUrl": files[0].file.asset->url
}`;

// Single clinical evidence doc
export const CLINICAL_EVIDENCE_ITEM_QUERY = `*[_type == "clinicalEvidence" && slug.current == $slug][0]{
  _id,
  title,
  category,
  summary,
  body,
  publishedAt,
  journal,
  authors[],
  heroImage,
  files[]{ title, "url": file.asset->url },
  relatedProducts[]->{_id, name, "slug": slug.current}
}`;

// News list
export const NEWS_QUERY = `*[_type == "newsPost"] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  category,
  excerpt,
  heroImage
}`;

// Single news post
export const NEWS_POST_QUERY = `*[_type == "newsPost" && slug.current == $slug][0]{
  _id,
  title,
  publishedAt,
  category,
  body,
  heroImage,
  author
}`;

// Company / About page
export const COMPANY_QUERY = `*[_type == "companyPage"][0]{
  mission,
  leadershipTeam[]{name, role, bio, photo},
  board[]{name, role, bio, photo},
  advisors[]{name, role, bio, photo},
  pressReleases[]{title, date, url}
}`;

// Solutions overview
export const SOLUTIONS_QUERY = `*[_type == "solutionsPage"][0]{
  forSurgeons{ headline, body, ctaLabel, ctaHref },
  forASCs{ headline, body, ctaLabel, ctaHref },
  forPartners{ headline, body, ctaLabel, ctaHref }
}`;
