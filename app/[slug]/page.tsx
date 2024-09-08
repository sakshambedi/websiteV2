import "./../globals.css"
import { BlogPostInterface } from "@/interface/PostData";
import { getPostData } from "@/lib/post";
import React from "react";
import { notFound } from "next/navigation";

// import 'katex/dist/katex.min.css';

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const blogPost: BlogPostInterface | null = await getPostData(slug);

    if (!blogPost) {
        notFound();
    }

    return (
        <div className='min-w-full flex justify-center prose dark:prose-invert prose-p:font-mono prose-li:font-mono prose-p:text-base prose-h2:font-serif prose-h2:text-2xl prose-h3:text-xl prose-h3:font-serif prose-h1:text-3xl  prose-a:text-sm prose-h1:font-normal prose-h2:font-normal prose-h3:font-normal dark:prose-a:text-blue-300 prose-a:text-blue-600  prose-ol:m-0 prose-li:m-0.5 prose-img:mx-auto prose-img:w-full prose-img:max-w-xl phone:prose-img:max-w-full phone:prose-h1:text-lg phone:prose-ol:text-sm phone:text-sm phone:prose-p:text-sm phone:prose-h3:mt-3 phone:prose-h3:text-lg phone:prose-h2:mt-3'>
            <article className="w-6/12 phone:w-9/12 md:w-3/4 flex flex-col flex-nowrap  phone:prose-figure:w-full ">
                <h1 className="flex font-serif justify-center text-3xl mb-0 pt-14 pb-3 phone:text-lg phone:pt-6 phone:pb-2">{blogPost.title}</h1>
                <p className='font-mono text-base my-0'>Published Date: {blogPost.date?.toLocaleDateString()}</p>
                <div className="w-full pt-10 phone:pt-5" dangerouslySetInnerHTML={{ __html: blogPost.contentHtml }} />
            </article>
        </div>
    );
}