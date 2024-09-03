import "./../globals.css"
import { BlogPostInterface } from "@/interface/PostData";
import { getPostData } from "@/lib/post";
import React from "react";
import { notFound } from "next/navigation";
import 'katex/dist/katex.min.css';
// import 'highlight.js/styles/atom-one-dark.css';



export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const blogPost: BlogPostInterface | null = await getPostData(slug);


    if (!blogPost) {
        notFound();
    }


    return (
        <div className='min-w-full flex justify-center prose dark:prose-invert prose-p:font-mono prose-li:font-mono prose-p:text-base prose-h2:font-serif prose-h2:text-xl prose-h1:text-3xl prose-a:text-sm prose-h1:font-normal prose-h2:font-normal prose-h3:font-normal dark:prose-a:text-blue-300 prose-a:text-blue-600  prose-ol:m-0 prose-li:m-0.5 prose-img:mx-auto prose-img:w-full prose-img:max-w-md '>
            <article className="min-w-full flex flex-col items-center">
                <h1 className="font-serif text-3xl mb-0 pt-14 pb-3 ">{blogPost.title}</h1>
                <p className='font-mono text-base my-0'>Published Date: {blogPost.date?.toLocaleDateString()}</p>
                <div className="w-1/2 pt-10" dangerouslySetInnerHTML={{ __html: blogPost.contentHtml }} />
            </article>
        </div>
    );
}