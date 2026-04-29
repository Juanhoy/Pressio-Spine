// ─── Sanity Schema: Clinical Evidence ─────────────────────────────────────────
import { defineField, defineType } from "sanity";

export const clinicalEvidence = defineType({
  name: "clinicalEvidence",
  title: "Clinical Evidence",
  type: "document",
  fields: [
    defineField({ name: "title",       title: "Title",       type: "string",   validation: (R) => R.required() }),
    defineField({ name: "slug",        title: "Slug",        type: "slug",     options: { source: "title" }, validation: (R) => R.required() }),
    defineField({ name: "category",    title: "Category",    type: "string",   options: { list: [{ title: "Clinical Summary", value: "clinical-summary" }, { title: "Publication", value: "publication" }, { title: "White Paper", value: "white-paper" }] }, validation: (R) => R.required() }),
    defineField({ name: "summary",     title: "Summary",     type: "text",     validation: (R) => R.required() }),
    defineField({ name: "body",        title: "Body",        type: "array",    of: [{ type: "block" }] }),
    defineField({ name: "publishedAt", title: "Published At",type: "date" }),
    defineField({ name: "journal",     title: "Journal",     type: "string" }),
    defineField({ name: "authors",     title: "Authors",     type: "array",    of: [{ type: "string" }] }),
    defineField({ name: "heroImage",   title: "Hero Image",  type: "image",    options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string", title: "Alt text" })] }),
    defineField({ name: "relatedProducts", title: "Related Products", type: "array", of: [{ type: "reference", to: [{ type: "product" }] }] }),
  ],
  preview: { select: { title: "title", subtitle: "category" } },
});
