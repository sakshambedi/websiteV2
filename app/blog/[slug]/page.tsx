import "./../../globals.css";
import { BlogPostInterface } from "@/interface/PostData";
import { getPostData, getAllPostSlugs } from "@/lib/post";
import React from "react";
import { notFound } from "next/navigation";
import "katex/dist/katex.min.css";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BlogPostClient from "./BlogPostClient";

// ISR: Revalidate every 24 hours
export const revalidate = 86400;

// Pre-build all blog posts at build time
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
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

      <article className="flex flex-col w-full items-center prose dark:prose-invert prose-p:font-mono prose-li:font-mono prose-h2:font-rebondG prose-h3:font-rebondG prose-a:text-foreground prose-a:underline-offset-4 hover:prose-a:text-muted-foreground prose-ol:m-0 prose-li:m-0.5 prose-img:mx-auto prose-pre:font-hackNF prose-img:w-full prose-img:max-w-xl phone:prose-img:max-w-full phone:prose-h3:mt-3 phone:prose-h2:mt-3">
        {/* Hero Section with gradient */}
        <header className="relative flex flex-col w-full items-center min-h-[20rem] justify-end overflow-hidden">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-muted via-muted/80 to-background" />

          {/* Subtle pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative flex flex-col w-full max-w-2xl px-8 phone:px-6 pb-12 phone:pb-8">
            {/* Back button */}
            <Link
              href="/?tab=blog"
              className="not-prose group inline-flex items-center gap-2 font-mono text-fluid-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 mb-8 phone:mb-6 w-fit"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
              <span>back to blog</span>
            </Link>

            {/* Title */}
            <h1 className="font-rebondG text-fluid-4xl tracking-heading text-foreground mb-4 phone:mb-3">
              {blogPost.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-3 font-mono text-fluid-sm text-muted-foreground">
              <time dateTime={blogPost.date?.toISOString()}>
                {blogPost.date?.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </div>
        </header>

        {/* Content */}
        <div
          id="content"
          className="flex flex-col w-full max-w-2xl px-8 phone:px-6 pt-8 phone:pt-6"
        >
          <div
            className="w-full prose-headings:tracking-heading prose-headings:text-foreground prose-p:text-foreground/80 prose-p:leading-relaxed prose-li:text-foreground/80"
            dangerouslySetInnerHTML={{ __html: blogPost.contentHtml }}
          />

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-border">
            <div className="flex flex-col items-center gap-4">
              <p className="font-mono text-fluid-sm text-muted-foreground">
                Written by{" "}
                <a
                  href="https://www.linkedin.com/in/sakshambedi/"
                  className="text-foreground hover:text-muted-foreground transition-colors no-underline hover-underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Saksham Bedi
                </a>
              </p>
              <Link
                href="/?tab=blog"
                className="not-prose group inline-flex items-center gap-2 font-mono text-fluid-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
                <span>View all posts</span>
              </Link>
            </div>
          </footer>

          {/* Bottom spacing */}
          <div className="h-16 phone:h-10" />
        </div>
      </article>
    </div>
  );
}
