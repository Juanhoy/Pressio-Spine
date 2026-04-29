import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { sanityFetch } from "@/lib/sanity/client";
import { NEWS_QUERY } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import type { NewsPost } from "@/types/sanity";

export const metadata: Metadata = {
  title: "News",
  description:
    "Latest news, announcements, and press releases from Pressio Spine™.",
};

export default async function NewsPage() {
  const posts = await sanityFetch<NewsPost[]>(NEWS_QUERY)
    .catch(() => [] as NewsPost[]);

  return (
    <>
      <section className="page-hero" aria-labelledby="news-page-heading">
        <div className="container">
          <p className="overline">Latest Updates</p>
          <h1 id="news-page-heading" className="heading-xl" style={{ color: "var(--color-white)", marginTop: "var(--space-3)" }}>
            News & Announcements
          </h1>
        </div>
      </section>

      <section className="section" aria-label="News articles">
        <div className="container">
          {posts.length > 0 ? (
            <div className="grid-3">
              {posts.map((post) => (
                <Link
                  key={post._id}
                  href={`/news/${post.slug}`}
                  className="card"
                  id={`news-card-${post._id}`}
                >
                  {post.heroImage && (
                    <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
                      <Image
                        src={urlFor(post.heroImage).width(640).height(360).url()}
                        alt={post.heroImage.alt ?? post.title}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                    </div>
                  )}
                  <div style={{ padding: "var(--space-6)" }}>
                    {post.category && (
                      <span className="badge badge--clinical" style={{ marginBottom: "var(--space-3)" }}>
                        {post.category}
                      </span>
                    )}
                    <p className="heading-sm" style={{ marginBottom: "var(--space-2)" }}>{post.title}</p>
                    {post.excerpt && (
                      <p className="body-sm" style={{ color: "var(--color-gray-500)" }}>{post.excerpt}</p>
                    )}
                    {post.publishedAt && (
                      <p className="body-sm" style={{ color: "var(--color-gray-300)", marginTop: "var(--space-4)" }}>
                        {new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="body-lg" style={{ color: "var(--color-gray-500)" }}>
              No news articles yet. Check back soon.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
