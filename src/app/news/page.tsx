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
      <section className="hero-new" style={{ minHeight: "400px" }} aria-labelledby="news-page-heading">
        <div className="hero-overlay-new" style={{ background: "linear-gradient(105deg, rgba(37, 59, 128, 0.95) 0%, rgba(0, 71, 171, 0.8) 100%)" }} />
        <div className="hero-inner-new" style={{ padding: "100px 40px" }}>
          <div className="hero-content-new">
            <span className="section-label-new" style={{ color: "var(--secondary)" }}>Latest Updates</span>
            <h1 id="news-page-heading" style={{ color: "white", marginBottom: "20px" }}>News & Announcements</h1>
            <p className="hero-sub-new" style={{ maxWidth: "520px" }}>
              Stay updated with the latest technological advancements, clinical milestones, and corporate developments from Pressio Spine.
            </p>
          </div>
        </div>
      </section>

      <section className="section-new" aria-label="News articles">
        <div className="section-inner-new">
          {posts.length > 0 ? (
            <div className="why-grid-new" style={{ marginTop: "0" }}>
              {posts.map((post) => (
                <article key={post._id} className="product-card-new">
                  <div className="product-card-img-new" style={{ height: 200, position: "relative" }}>
                    {post.heroImage ? (
                      <Image
                        src={urlFor(post.heroImage).width(800).height(450).url()}
                        alt={post.heroImage.alt ?? post.title}
                        fill
                        style={{ objectFit: "cover" }}
                        unoptimized
                      />
                    ) : (
                      <div style={{ width: "100%", height: "100%", background: "#EEF1F6" }} />
                    )}
                  </div>
                  <div className="product-card-body-new">
                    <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
                      {post.category && (
                        <span className="product-status-new" style={{ background: "#F1F5F9", color: "var(--primary)" }}>
                          {post.category}
                        </span>
                      )}
                      {post.publishedAt && (
                        <span style={{ fontSize: "12px", color: "var(--gray-300)", fontFamily: "var(--headline)", marginTop: "4px" }}>
                          {new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                        </span>
                      )}
                    </div>
                    <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>{post.title}</h3>
                    {post.excerpt && (
                      <p style={{ fontSize: "13px", lineHeight: "1.6" }}>{post.excerpt}</p>
                    )}
                    <Link href={`/news/${post.slug}`} className="product-card-link-new" style={{ marginTop: "auto" }}>
                      Read Article
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M2 7h10M8 3l4 4-4 4" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div style={{ padding: "80px 0", textAlign: "center", background: "#F8FAFC", borderRadius: "24px" }}>
              <p className="section-sub-new" style={{ margin: "0 auto" }}>
                No news articles found. Content will appear here once added in Sanity.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
