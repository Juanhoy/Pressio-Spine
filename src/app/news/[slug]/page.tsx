import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { PortableText } from "next-sanity";
import { sanityFetch } from "@/lib/sanity/client";
import { NEWS_POST_QUERY } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
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
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.heroImage ? [urlFor(post.heroImage).width(1200).height(630).url()] : [],
    }
  };
}

export default async function NewsPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await sanityFetch<NewsPost>(NEWS_POST_QUERY, { slug }).catch(() => null);

  if (!post) notFound();

  const formattedDate = post.publishedAt 
    ? new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : null;

  return (
    <main>
      {/* Article Hero */}
      <section className="hero-new" style={{ minHeight: "500px" }} aria-labelledby="news-post-heading">
        {post.heroImage && (
          <Image
            src={urlFor(post.heroImage).width(1920).height(1080).url()}
            alt={post.heroImage.alt ?? post.title}
            fill
            className="hero-video-new"
            style={{ objectFit: "cover", opacity: 0.4 }}
            priority
            unoptimized
          />
        )}
        <div className="hero-overlay-new" style={{ 
          background: "linear-gradient(105deg, rgba(37, 59, 128, 0.95) 0%, rgba(0, 71, 171, 0.8) 100%)" 
        }} />
        
        <div className="hero-inner-new" style={{ padding: "120px 40px 80px" }}>
          <div className="hero-content-new" style={{ maxWidth: "800px" }}>
            <nav className="hero-badge-new" style={{ border: "none", background: "rgba(255,255,255,0.1)", color: "white", marginBottom: "32px", fontSize: "11px" }}>
              <Link href="/news" style={{ color: "var(--secondary)", fontWeight: 700 }}>NEWS</Link>
              <span style={{ opacity: 0.5, margin: "0 8px" }}>/</span>
              <span>{post.category || "PRESS RELEASE"}</span>
            </nav>
            
            <h1 id="news-post-heading" className="animate-fade-in-up" style={{ fontSize: "clamp(2.5rem, 5vw, 3.8rem)", marginBottom: "32px" }}>
              {post.title}
            </h1>

            <div className="animate-fade-in-up" style={{ animationDelay: "100ms", display: "flex", alignItems: "center", gap: "24px" }}>
              {formattedDate && (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--secondary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>Published</span>
                  <span style={{ color: "white", opacity: 0.9 }}>{formattedDate}</span>
                </div>
              )}
              {post.author && (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--secondary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>Author</span>
                  <span style={{ color: "white", opacity: 0.9 }}>{post.author}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="section-new" style={{ background: "white" }}>
        <div className="section-inner-new" style={{ maxWidth: "800px" }}>
          {post.body && (
            <div className="portable-text-container animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              <PortableText 
                value={post.body} 
                components={{
                  block: {
                    h2: ({children}) => <h2 className="section-title-new" style={{ marginTop: "2em", marginBottom: "1em", fontSize: "28px" }}>{children}</h2>,
                    h3: ({children}) => <h3 style={{ marginTop: "1.5em", marginBottom: "0.8em", fontSize: "22px", color: "var(--primary)", fontWeight: 700 }}>{children}</h3>,
                    normal: ({children}) => <p style={{ marginBottom: "1.5em", fontSize: "18px", lineHeight: "1.8", color: "var(--gray-700)" }}>{children}</p>,
                    blockquote: ({children}) => (
                      <blockquote style={{ 
                        margin: "2.5em 0", 
                        padding: "24px 32px", 
                        borderLeft: "4px solid var(--secondary)", 
                        background: "var(--neutral)",
                        borderRadius: "0 16px 16px 0",
                        fontSize: "20px",
                        fontStyle: "italic",
                        color: "var(--primary)"
                      }}>
                        {children}
                      </blockquote>
                    )
                  }
                }}
              />
            </div>
          )}

          {!post.body && (
            <div style={{ padding: "100px 0", textAlign: "center" }}>
              <p className="section-sub-new" style={{ margin: "0 auto" }}>
                Full article content coming soon.
              </p>
            </div>
          )}

          <hr style={{ margin: "60px 0", border: "none", borderTop: "1px solid var(--gray-100)" }} />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Link href="/news" className="btn-secondary-new">
              <svg width="18" height="18" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: "8px", transform: "rotate(180deg)" }}>
                <path d="M2 7h10M8 3l4 4-4 4" />
              </svg>
              Back to News
            </Link>

            <div style={{ display: "flex", gap: "12px" }}>
               {/* Could add share buttons here */}
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
