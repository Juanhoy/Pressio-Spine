// ─── Sanity Schema: News Post ──────────────────────────────────────────────────
import { defineField, defineType } from "sanity";

export const newsPost = defineType({
  name: "newsPost",
  title: "News Post",
  type: "document",
  fields: [
    defineField({ name: "title",       title: "Title",       type: "string",   validation: (R) => R.required() }),
    defineField({ name: "slug",        title: "Slug",        type: "slug",     options: { source: "title" }, validation: (R) => R.required() }),
    defineField({ name: "publishedAt", title: "Published At",type: "datetime", validation: (R) => R.required() }),
    defineField({ name: "category",    title: "Category",    type: "string",   options: { list: ["Announcement", "Press Release", "Event", "Clinical Update"] } }),
    defineField({ name: "author",      title: "Author",      type: "string" }),
    defineField({ name: "excerpt",     title: "Excerpt",     type: "text" }),
    defineField({ name: "body",        title: "Body",        type: "array",    of: [{ type: "block" }, { type: "image", options: { hotspot: true } }] }),
    defineField({ name: "heroImage",   title: "Hero Image",  type: "image",    options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string", title: "Alt text" })] }),
  ],
  preview: { select: { title: "title", subtitle: "publishedAt", media: "heroImage" } },
  orderings: [{ title: "Newest First", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
});
