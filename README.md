This is the readme for this project

This website is built using nextjs + tailwindcs + react + determination and ambition (I am not a front end developer)

## Prototyping

I did some prototyping using figma. Check out the basic desing that I made here. [View the design on Figma](https://www.figma.com/proto/410Ouu5c369LS4SDUs9COp/Website?node-id=0-1&t=TdAx4BHHASegScUF-1)

## Getting Started

First, run the development server:

```bash
pnpm dev
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

1. **remarkMath & rehypeKatex**: Handle mathematical expressions in your markdown. remarkMath parses the math syntax, while rehypeKatex renders it using KaTeX.
2. **remarkGfm**: Adds GitHub Flavored Markdown support, giving you features like tables, strikethrough, task lists, and more.
3. **stringWidth**: A utility library that properly calculates string widths, considering Unicode characters and emoji.
4. **unified**: The core processor that ties everything together. It's like a pipeline manager for your markdown transformation.
5. **rehypePrettyCode**: Makes your code blocks beautiful with syntax highlighting and theme support.
6. **remarkParse**: The foundation - it reads your markdown and turns it into a format that can be processed.
7. **remarkFrontmatter**: Handles the metadata section at the top of markdown files (like title, date, author).
8. **rehypeSanitize**: Security guard for your HTML - it removes potentially dangerous content.
9. **remarkRehype**: The bridge between markdown and HTML processing - converts markdown structure to HTML structure.
10. **rehypeRaw**: Allows you to mix raw HTML within your markdown content.
11. **rehypeStringify**: The final step - turns everything back into HTML that browsers can display.
12. **transformerCopyButton**: Adds a nice "copy" button to code blocks for better user experience.

This combination of tools creates a powerful markdown processing pipeline that can handle everything from math equations to syntax-highlighted code blocks, while keeping content secure and well-structured.

## TODO:

[x] Add a loading component when the blog is getting rendered
[x] Fix the basic dark and light theme.
[x] Add Markdown Table support for blog

- Add Open Graph preview for social media
- Caching
