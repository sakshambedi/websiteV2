This is the readme for this project

This website is built using nextjs + tailwindcs + react + determination and ambition (I am not a front end developer)

## Prototyping

I did some prototyping using figma. Check out the basic desing that I made here. [View the design on Figma](https://www.figma.com/proto/410Ouu5c369LS4SDUs9COp/Website?node-id=0-1&t=TdAx4BHHASegScUF-1)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Structure

Most of the website is very basic TS.

The blog is generated from a markdown file. Markdown was the prefered file format due to its massive adoption, and has all the features that I require.

Alternative to this was using a headlessCMS with more features but that seemed unnecessary.

### Creating blog main page

The blog page reads all the all the folder name and stores location to the markdown file.
Each markdown file has metadata for the blog, example of metadata :

```bash
title: "My Data Analysis"
date: "2024-06-15"
category: "python"
```

The metadata for each blog is also read to render to render the main page for the blog. This helps me sort blogs based on the published data and I can make simple recommendation system based on category (maybe a later feature).

### Rendering Blog Page

When the use click on a blog, the contents of the markdown file are read, cleanesed and represented to the user.

These are the following react libs that I use to convert a markdown to a beautiful webpage :

1. **unified**: Core library that allows you to process content with plugins (e.g., Markdown to HTML).
2. **remarkParse**: Parses Markdown into an abstract syntax tree (AST) to be transformed or further processed.
3. **remarkFrontmatter**: Adds support for frontmatter (metadata) in Markdown files (e.g., YAML).
4. **remarkParseFrontmatter**: Parses and validates the frontmatter (YAML) in Markdown files.
5. **remarkRehype**: Converts the Markdown abstract syntax tree (AST) into an HTML syntax tree (rehype), enabling further processing.
6. **remarkMath**: Adds support for parsing and rendering math equations in Markdown (LaTeX-style syntax).
7. **rehypeKatex**: Renders mathematical notation using the KaTeX library, typically used with `remarkMath`.
8. **rehypePrettyCode**: Enhances code block syntax highlighting using the `shiki` highlighter with support for themes like "one-dark-pro."
9. **rehypeRaw**: Allows for embedding raw HTML within Markdown, making it possible to mix Markdown and HTML.
10. **rehypeStringify**: Converts the HTML syntax tree back into a string of HTML for output.
11. **transformerCopyButton**: Adds a copy button to code blocks to allow users to copy code snippets with ease.
12. **matterResult.content**: Contains the raw Markdown content including frontmatter, which is processed by the pipeline.

## TODO:

- Add caching for the server side rendering
- Add a loading component when the blog is getting rendered
- Fix the basic dark and light theme. The light theme is too light.
- Add Open Graph preview for social media
