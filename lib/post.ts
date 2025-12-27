import fs from "fs";
import matter from "gray-matter";
import path from "path";

import {
  AllPostDataTableInterface,
  BlogPostInterface,
  BlogPostTableInterface,
} from "@/interface/PostData";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import stringWidth from "string-width";

import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import remarkFrontmatter from "remark-frontmatter";
import remarkParse from "remark-parse";
import { unified } from "unified";
// import remarkParseFrontmatter from "remark-parse-frontmatter"
import { transformerCopyButton } from "@rehype-pretty/transformers";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import remarkRehype from "remark-rehype";

const postsDirectory = path.join(process.cwd(), "_posts");

export function getSortedPostsData(): AllPostDataTableInterface {
  // Check if the directory exists
  if (!fs.existsSync(postsDirectory)) {
    console.error(`Directory not found: ${postsDirectory}`);
    return [];
  }

  const dirNames = fs
    .readdirSync(postsDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  // console.log("File names in _posts directory:", dirNames);

  const allPostsData: AllPostDataTableInterface = dirNames
    .map((dirName) => {
      const slug = dirName;

      // Find the markdown file in the directory
      const dirPath = path.join(postsDirectory, dirName);
      const mdFile = fs
        .readdirSync(dirPath)
        .find((file) => file.endsWith(".md"));

      if (!mdFile) {
        console.warn(`No markdown file found in directory: ${dirPath}`);
        return null;
      }

      const fullPath = path.join(dirPath, mdFile);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const matterResult = matter(fileContents);

      return {
        slug,
        title: matterResult.data.title,
        date: matterResult.data.date
          ? new Date(matterResult.data.date)
          : undefined,
        category: matterResult.data.category,
      } as BlogPostTableInterface;
    })
    .filter((post): post is BlogPostTableInterface => post !== null);

  // console.log("All Post Data: ", allPostsData);

  return allPostsData.sort((a, b) => {
    return a.date && b.date && a.date < b.date ? 1 : -1;
  });
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs
    .readdirSync(postsDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}

export async function getPostData(
  slug: string,
): Promise<BlogPostInterface | null> {
  const dirPath = path.join(postsDirectory, slug);
  const mdFile = fs.readdirSync(dirPath).find((file) => file.endsWith(".md"));
  if (!mdFile) {
    console.warn(`No markdown file found in directory: ${dirPath}`);
    return null;
  }

  const fullPath = path.join(dirPath, mdFile);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  const result = await unified()
    // Parse Markdown into syntax tree
    .use(remarkParse)
    // Parse frontmatter (YAML)
    .use(remarkFrontmatter, ["yaml"])
    // Process frontmatter if necessary
    // Parse Math into syntax tree
    .use(remarkMath)
    // Add GitHub Flavored Markdown support
    .use(remarkGfm, { stringLength: stringWidth })
    // Convert MD syntax tree to HTML syntax tree
    .use(remarkRehype, { allowDangerousHtml: true }) // Set to true
    .use(rehypeSanitize, {
      ...defaultSchema,
      attributes: {
        ...defaultSchema.attributes,
        // The `language-*` regex is allowed by default.
        code: [["className", /^language-./, "math-inline", "math-display"]],
      },
    })
    // Process raw HTML in Markdown
    .use(rehypeRaw)
    .use(rehypeKatex)
    .use(rehypePrettyCode, {
      theme: "one-dark-pro",
      transformers: [
        transformerCopyButton({
          visibility: "always",
          feedbackDuration: 3000,
        }),
      ],
    })
    // Serialize syntax tree to HTML
    .use(rehypeStringify)
    // Process the input
    .process(matterResult.content);

  return {
    slug,
    mdFile,
    fullPath,
    title: matterResult.data.title,
    date: matterResult.data.date ? new Date(matterResult.data.date) : undefined,
    contentHtml: result.toString(),
  } as BlogPostInterface;
}
