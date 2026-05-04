// ─── Sanity Schema: Product ────────────────────────────────────────────────────
import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({ name: "name",     title: "Name",     type: "string",   validation: (R) => R.required() }),
    defineField({ name: "tagline",  title: "Tagline",  type: "string",   validation: (R) => R.required() }),
    defineField({ name: "slug",     title: "Slug",     type: "slug",     options: { source: "name" }, validation: (R) => R.required() }),
    defineField({ name: "status",   title: "Status",   type: "string",   options: { list: [{ title: "Available", value: "available" }, { title: "In Development", value: "in-development" }], layout: "radio" }, initialValue: "in-development" }),
    defineField({ name: "order",    title: "Sort Order", type: "number" }),
    defineField({ name: "category", title: "Category", type: "string" }),
    defineField({ name: "heroImage",title: "Hero Image",type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string", title: "Alt text" })] }),
    defineField({ name: "gallery",  title: "Gallery",  type: "array",    of: [{ type: "image", options: { hotspot: true } }] }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "keyFeatures", title: "Key Features", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "indications", title: "Indications", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "surgicalTechnique",
      title: "Surgical Technique Documents",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Document Title", type: "string" },
            { name: "file",  title: "PDF File",       type: "file", options: { accept: ".pdf" } },
            { name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true } }
          ]
        }
      ]
    }),
    defineField({ name: "clinicalEvidence", title: "Clinical Evidence", type: "array", of: [{ type: "reference", to: [{ type: "clinicalEvidence" }] }] }),
    defineField({
      name: "ifu",
      title: "Instructions for Use (IFU)",
      type: "file",
      options: { accept: ".pdf" },
      fields: [
        { name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true } }
      ]
    }),
    defineField({
      name: "brochure",
      title: "Product Brochure",
      type: "file",
      options: { accept: ".pdf" },
      fields: [
        { name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true } }
      ]
    }),
  ],
  preview: { select: { title: "name", subtitle: "status", media: "heroImage" } },
});
