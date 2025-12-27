import "./../../globals.css";
import { BlogPostInterface } from "@/interface/PostData";
import { getPostData, getAllPostSlugs } from "@/lib/post";
import React from "react";
import { notFound } from "next/navigation";
import "katex/dist/katex.min.css";
import Link from "next/link";

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
    <div className="pb-[4rem] phone:pt-10 min-w-full flex justify-center prose dark:prose-invert prose-p:font-mono prose-li:font-mono prose-h2:font-rebondG prose-h3:font-rebondG dark:prose-a:text-blue-300 prose-a:text-blue-600 prose-ol:m-0 prose-li:m-0.5 prose-img:mx-auto prose-pre:font-hackNF prose-img:w-full prose-img:max-w-xl phone:prose-img:max-w-full phone:prose-h3:mt-3 phone:prose-h2:mt-3">
      <article className="flex flex-col flex-nowrap w-full items-center phone:prose-figure:w-full">
        <div className="flex flex-col w-full items-center bg-sky-700 dark:bg-sky-400 h-72 justify-end">
          <div className="flex flex-col w-6/12 phone:w-9/12 md:w-3/4">
            <Link
              href="/?tab=blog"
              className="inline-flex items-center gap-2 font-mono text-fluid-base font-medium text-white dark:text-gray-900 bg-black/20 dark:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full mb-4 hover:bg-black/30 dark:hover:bg-white/40 transition-all duration-200 hover:-translate-x-1 phone:mb-2"
            >
              <span aria-hidden="true">←</span>
              <span>back to blog</span>
            </Link>
            <h1 className="flex font-rebondG text-fluid-4xl justify-start mb-0 pt-14 pb-3 text-white dark:text-black phone:pt-6 phone:pb-2">
              {blogPost.title}
            </h1>
            <p className="flex font-mono text-fluid-base justify-start my-0 pb-10 text-gray-200 dark:text-gray-800">
              Published Date: {blogPost.date?.toLocaleDateString()}
            </p>
          </div>
        </div>

        <div
          id="content"
          className="flex flex-col w-6/12 phone:w-9/12 md:w-3/4 "
        >
          <div
            className="w-full pt-2 phone:pt-5"
            dangerouslySetInnerHTML={{ __html: blogPost.contentHtml }}
          />

          <p className="flex justify-center w-full sans-mono pb-10 phone:pb-5">
            <a href="https://www.linkedin.com/in/sakshambedi/">
              © Saksham Bedi
            </a>
          </p>
        </div>
      </article>
    </div>
  );
}
