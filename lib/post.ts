import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import { BlogPostTableInterface, AllPostDataTableInterface, BlogPostInterface } from '@/interface/PostData';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { unified } from "unified"
import rehypePrettyCode from "rehype-pretty-code";
import remarkParse from "remark-parse"
import remarkFrontmatter from "remark-frontmatter"
import remarkParseFrontmatter from "remark-parse-frontmatter"
import remarkRehype from "remark-rehype"
import rehypeRaw from "rehype-raw"
import rehypeStringify from "rehype-stringify"
import { transformerCopyButton } from '@rehype-pretty/transformers'

const postsDirectory = path.join(process.cwd(), '_posts');



export function getSortedPostsData(): AllPostDataTableInterface {
    // Check if the directory exists
    if (!fs.existsSync(postsDirectory)) {
        console.error(`Directory not found: ${postsDirectory}`);
        return [];
    }

    const dirNames = fs.readdirSync(postsDirectory, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    console.log("File names in _posts directory:", dirNames);

    const allPostsData: AllPostDataTableInterface = dirNames.map((dirName) => {
        const slug = dirName;

        // Find the markdown file in the directory
        const dirPath = path.join(postsDirectory, dirName);
        const mdFile = fs.readdirSync(dirPath).find(file => file.endsWith('.md'));

        if (!mdFile) {
            console.warn(`No markdown file found in directory: ${dirPath}`);
            return null;
        }

        const fullPath = path.join(dirPath, mdFile);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);

        return {
            slug,
            title: matterResult.data.title,
            date: matterResult.data.date ? new Date(matterResult.data.date) : undefined,
            category: matterResult.data.category
        } as BlogPostTableInterface;
    }).filter((post): post is BlogPostTableInterface => post !== null);

    // console.log("All Post Data: ", allPostsData);

    return allPostsData.sort((a, b) => {
        return a.date && b.date && a.date < b.date ? 1 : -1;
    });
}

export async function getPostData(slug: string): Promise<BlogPostInterface | null> {
    const dirPath = path.join(postsDirectory, slug);
    const mdFile = fs.readdirSync(dirPath).find(file => file.endsWith('.md'));
    if (!mdFile) {
        console.warn(`No markdown file found in directory: ${dirPath}`);
        return null;
    }

    const fullPath = path.join(dirPath, mdFile);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);


    const result = await unified()
        // Take Markdown as input and turn it into MD syntax tree
        .use(remarkParse)
        // Add support for frontmatter in Markdown
        .use(remarkFrontmatter, ["yaml"])
        // Prase and validate Markdown frontmatter (YAML)
        .use(remarkParseFrontmatter)
        // Switch from MD syntax tree to HTML syntax tree (remakr -> rehype)
        .use(remarkRehype, {
            // Necessary for support HTML embeds (see next plugin)
            allowDangerousHtml: true,
        })
        .use(remarkMath)
        .use(rehypeKatex)
        // .use(rehypeHighlight)
        .use(rehypePrettyCode, {
            theme: "one-dark-pro",
            transformers: [
                transformerCopyButton({
                    visibility: 'always',
                    feedbackDuration: 3_000,
                }),
            ],
        })
        // Support HTML embedded inside markdown
        .use(rehypeRaw)
        // Improve code highlighting
        // Serialize syntax tree to HTML
        .use(rehypeStringify)
        // And finally, process the input
        .process(matterResult.content)


    return {
        slug,
        mdFile,
        fullPath,
        title: matterResult.data.title,
        date: matterResult.data.date ? new Date(matterResult.data.date) : undefined,
        contentHtml: result.toString(),
    } as BlogPostInterface;
}