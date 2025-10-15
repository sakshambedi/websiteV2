import "./../../globals.css";
import { BlogPostInterface } from "@/interface/PostData";
import { getPostData } from "@/lib/post";
import React from "react";
import { notFound } from "next/navigation";
import "katex/dist/katex.min.css"; // Import KaTeX CSS
import Link from "next/link";

// import 'katex/dist/katex.min.css';

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const blogPost: BlogPostInterface | null = await getPostData(slug);

  if (!blogPost) {
    notFound();
  }

  return (
    <div className="pb-[4rem]  phone:pt-10 min-w-full flex justify-center prose dark:prose-invert prose-p:font-mono prose-li:font-mono prose-p:text-base prose-h3:text-2xl prose-h2:text-3xl prose-h4:text-lg  prose-a:text-base prose-h2:font-rebondG prose-h3:font-rebondG dark:prose-a:text-blue-300 prose-a:text-blue-600  prose-ol:m-0 prose-li:m-0.5 prose-img:mx-auto prose-pre:font-hackNF prose-img:w-full prose-img:max-w-xl phone:prose-img:max-w-full phone:prose-h1:text-lg phone:prose-ol:text-sm phone:text-sm phone:prose-p:text-sm phone:prose-h3:mt-3 phone:prose-h3:text-lg phone:prose-h2:mt-3">
      <article className="flex flex-col flex-nowrap w-full  items-center phone:prose-figure:w-full ">
        <div className="flex flex-col w-full items-center bg-sky-700 dark:bg-sky-400 h-72 justify-end ">
          <div className="flex flex-col w-6/12  phone:w-9/12 md:w-3/4 ">
            <Link
              href="/?tab=blog"
              className="font-mono text-sm text-gray-200 dark:text-gray-800 pb-3 hover:underline phone:text-xs phone:pb-2"
            >
              ← back to blog
            </Link>
            <h1 className="flex font-rebondG  text-4xl justify-start mb-0 pt-14 pb-3  text-white dark:text-black phone:text-lg phone:pt-6 phone:pb-2">
              {blogPost.title}
            </h1>
            <p className="flex font-mono text-base justify-start my-0 pb-10 text-gray-200 dark:text-gray-800">
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
