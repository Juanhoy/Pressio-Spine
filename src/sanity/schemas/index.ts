// ─── Schema registry ──────────────────────────────────────────────────────────
import { product } from "./product";
import { clinicalEvidence } from "./clinicalEvidence";
import { newsPost } from "./newsPost";
import { homePage, companyPage, solutionsPage, teamMember, solutionSection } from "./singletons";

export const schemaTypes = [
  // Documents
  product,
  clinicalEvidence,
  newsPost,
  homePage,
  companyPage,
  solutionsPage,
  // Object types
  teamMember,
  solutionSection,
];
