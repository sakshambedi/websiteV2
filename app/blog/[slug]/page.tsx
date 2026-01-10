import "./../../globals.css";
import { BlogPostInterface } from "@/interface/PostData";
import { getPostData, getAllPostSlugs } from "@/lib/post";
import React from "react";
import { notFound } from "next/navigation";
import "katex/dist/katex.min.css";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import BlogPostClient from "./BlogPostClient";
import type { Metadata } from "next";
import SiteConfig from "@/config/site";

// ISR: Revalidate every 24 hours
export const revalidate = 86400;

// Pre-build all blog posts at build time
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate dynamic metadata for each blog post
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blogPost = await getPostData(slug);

  if (!blogPost) {
    return {
      title: "Post Not Found",
    };
  }

  // Generate description from content (strip HTML and get first 160 characters)
  const plainText = blogPost.contentHtml
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
  const description =
    plainText.length > 160
      ? plainText.substring(0, 160) + "..."
      : plainText || SiteConfig.description;

  const postUrl = `${SiteConfig.url}/blog/${slug}`;

  return {
    title: blogPost.title,
    description,
    openGraph: {
      type: "article",
      url: postUrl,
      title: blogPost.title,
      description,
      publishedTime: blogPost.date?.toISOString(),
      authors: ["Saksham Bedi"],
      siteName: SiteConfig.siteName,
      images: [
        {
          url: SiteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: blogPost.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blogPost.title,
      description,
      images: [SiteConfig.ogImage],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blogPost: BlogPostInterface | null = await getPostData(slug);

  if (!blogPost) {
    notFound();
  }

  return (
    <div className="min-w-full flex flex-col items-center bg-background">
      {/* Reading progress bar */}
      <BlogPostClient />

      <article className="relative z-10 flex flex-col w-full max-w-none items-center prose dark:prose-invert prose-p:font-mono prose-li:font-mono prose-h2:font-serif prose-h3:font-serif prose-a:text-foreground prose-a:underline-offset-4 hover:prose-a:text-coral prose-ol:m-0 prose-li:m-0.5 prose-img:mx-auto prose-pre:font-hackNF prose-img:w-full prose-img:max-w-xl phone:prose-img:max-w-full phone:prose-h3:mt-3 phone:prose-h2:mt-3">
        {/* Document Header */}
        <header className="relative flex flex-col w-full items-center border-b border-border bg-background">
          {/* Top Banner */}
          <div className="w-full border-b border-border px-4 py-2 lg:px-8">
            <div className="mx-auto flex max-w-5xl items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                DOCUMENT — TECHNICAL ARTICLE
              </span>
            </div>
          </div>

          {/* Main Header Content */}
          <div className="w-full max-w-5xl mx-auto px-8 phone:px-6 py-12 phone:py-8">
            {/* Back button */}
            <Link
              href="/?tab=resources"
              className="not-prose group inline-flex items-center gap-2 font-mono text-fluid-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200 mb-8 phone:mb-6 w-fit"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
              <span>BACK TO ARCHIVE</span>
            </Link>

            {/* Title */}
            <h1 className="font-serif text-fluid-5xl tracking-tight text-foreground mb-6 phone:mb-4 leading-[1.1]">
              {blogPost.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 font-mono text-fluid-xs uppercase tracking-widest text-muted-foreground">
              <span>AUTHOR: SAKSHAM BEDI</span>
              <span className="text-coral">•</span>
              <time dateTime={blogPost.date?.toISOString()}>
                PUBLISHED: {blogPost.date?.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }).toUpperCase()}
              </time>
            </div>
          </div>
        </header>

        {/* Content */}
        <div
          id="content"
          className="flex flex-col w-full max-w-5xl mx-auto px-8 phone:px-6 pt-12 phone:pt-8"
        >
          <div
            className="w-full prose-headings:tracking-tight prose-headings:text-foreground prose-p:text-foreground/80 prose-p:leading-relaxed prose-li:text-foreground/80 prose-code:text-coral prose-code:before:content-none prose-code:after:content-none"
            dangerouslySetInnerHTML={{ __html: blogPost.contentHtml }}
          />

          {/* Footer */}
          <footer className="mt-20 pt-8 border-t border-border">
            <div className="flex flex-col gap-8">
              {/* Author Info */}
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <span className="font-mono text-fluid-xs uppercase tracking-widest text-muted-foreground block">
                    WRITTEN BY
                  </span>
                  <a
                    href="https://www.linkedin.com/in/sakshambedi/"
                    className="not-prose group inline-flex items-center gap-2 font-serif text-fluid-xl text-foreground hover:text-coral transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Saksham Bedi
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>

                <Link
                  href="/?tab=resources"
                  className="not-prose atlas-btn-secondary text-fluid-xs py-3 px-5"
                >
                  VIEW ALL POSTS
                </Link>
              </div>

              {/* Bottom Document Info */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-border font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <span>BLOG : {slug.slice(0, 14).toUpperCase()}</span>
                <span>SAKSHAM BEDI — WINNIPEG, MB</span>
              </div>
            </div>
          </footer>

          {/* Bottom spacing */}
          <div className="h-16 phone:h-10" />
        </div>
      </article>
    </div>
  );
}
