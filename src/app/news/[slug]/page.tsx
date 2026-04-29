import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { sanityFetch } from "@/lib/sanity/client";
import { NEWS_POST_QUERY } from "@/lib/sanity/queries";
import type { NewsPost } from "@/types/sanity";

export async function generateStaticParams() {
  const posts = await sanityFetch<Pick<NewsPost, "slug">[]>(
    `*[_type == "newsPost"]{ "slug": slug.current }`
  ).catch(() => []);
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityFetch<NewsPost>(NEWS_POST_QUERY, { slug }).catch(() => null);
  if (!post) return { title: "Post Not Found" };
  return { title: post.title, description: post.excerpt };
}

export default async function NewsPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await sanityFetch<NewsPost>(NEWS_POST_QUERY, { slug }).catch(() => null);

  if (!post) notFound();

  return (
    <>
      <section className="page-hero" aria-labelledby="news-post-heading">
        <div className="container" style={{ maxWidth: 760 }}>
          {post.category && (
            <span className="badge badge--clinical" style={{ marginBottom: "var(--space-4)" }}>
              {post.category}
            </span>
          )}
          <h1 id="news-post-heading" className="heading-xl" style={{ color: "var(--color-white)", marginBottom: "var(--space-4)" }}>
            {post.title}
          </h1>
          {post.publishedAt && (
            <p className="body-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              {new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              {post.author && ` · ${post.author}`}
            </p>
          )}
        </div>
      </section>

      <article className="section">
        <div className="container" style={{ maxWidth: 760 }}>
          {/* TODO: render <PortableText value={post.body} /> */}
          {!post.body && (
            <p className="body-lg" style={{ color: "var(--color-gray-500)" }}>
              Full article content coming soon.
            </p>
          )}
          <div style={{ marginTop: "var(--space-12)" }}>
            <Link href="/news" className="btn btn--primary" id="news-post-back">
              ← Back to News
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
