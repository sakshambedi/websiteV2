# website-portfolio

A personal portfolio and blog built with Next.js, TypeScript, Tailwind CSS, and a powerful markdown-based blogging pipeline. Featuring math rendering, syntax-highlighted code blocks with copy buttons, dark/light theming, and optimized performance.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Markdown Blog Pipeline](#markdown-blog-pipeline)
- [Tech Stack](#tech-stack)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Features

- Next.js App Router (v15+) with hybrid SSR/SSG
- Tailwind CSS 3 for utility-first styling
- Light/dark theme toggling
- Blog generation from `_posts/` markdown files
- Math rendering via remark-math & rehype-katex
- GitHub Flavored Markdown (tables, task lists)
- Syntax-highlighted code blocks (Shiki) + copy button
- Open Graph support
- Simple recommendation by category (roadmap)
- Zero-config deployment (Vercel ready)

## Prerequisites

- Node.js v18+
- pnpm v8+

Install `pnpm` globally if you haven’t already:

```bash
npm install -g pnpm
```

## Getting Started

1. Clone the repo:

   ```bash
   gh repo clone sakshambedi/websiteV2
   cd sakshambedi/websiteV2
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Run the development server:

   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

Build for production:

```bash
pnpm build
pnpm start
```

## Available Scripts

- `pnpm dev` — Run Next.js in development mode
- `pnpm build` — Create an optimized production build
- `pnpm start` — Start the production server
- `pnpm lint` — Run ESLint
- `pnpm approve-builds` — Approve native build scripts (only required once on install)

## Project Structure

```
/
├── .next/                # Next.js build output
├── _posts/               # Markdown files for blog posts
├── app/                  # Next.js App Router pages
├── components/           # React components
├── config/               # Site-wide configuration (e.g., metadata)
├── interface/            # TypeScript interfaces & types
├── lib/                  # Utilities (markdown parsing, data fetching)
├── public/               # Static assets (images, icons, fonts)
├── styles/               # Global CSS & Tailwind config
├── next.config.mjs       # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── postcss.config.mjs    # PostCSS configuration
├── tsconfig.json         # TypeScript configuration
├── pnpm-lock.yaml        # pnpm lockfile
└── README.md             # This file
```

## Markdown Blog Pipeline

Each markdown file in `_posts/` contains frontmatter:

```yaml
---
title: "My Data Analysis"
date: 2024-06-15
category: python
---
```

Pipeline steps:

1. **remark-parse** & **remark-frontmatter** (packages: `remark-parse`, `remark-frontmatter`)
   Parse markdown and extract frontmatter metadata.

2. **remark-gfm** (package: `remark-gfm`)
   GitHub Flavored Markdown support (tables, task lists, strikethrough).

3. **remark-math** & **rehype-katex** (packages: `remark-math`, `rehype-katex`)
   Parse `$...$` math syntax and render with KaTeX.

4. **remark-rehype** & **rehype-raw** (packages: `remark-rehype`, `rehype-raw`)
   Convert markdown AST to HTML AST, preserving inline HTML.

5. **rehype-sanitize** (package: `rehype-sanitize`)
   Remove unsafe HTML for security.

6. **rehype-pretty-code** & **@rehype-pretty/transformers** (packages: `rehype-pretty-code`, `@rehype-pretty/transformers`)
   Syntax highlighting + customizable themes.

7. **@rehype-pretty/transformers transformerCopyButton** (package: `@rehype-pretty/transformers`)
   Add “Copy” button to code blocks for better UX.

8. **rehype-stringify** (package: `rehype-stringify`)
   Output HTML for rendering in React.

## Tech Stack

- **Framework**: Next.js App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Tailwind Animate
- **Linting**: ESLint (Next.js config)
- **Markdown**: remark & rehype ecosystem
- **Math**: remark-math + rehype-katex
- **Highlighting**: Shiki + rehype-pretty-code

## Configuration

- `next.config.mjs` — Custom webpack for CSS loaders & plugins
- `tailwind.config.ts` — Extend colors, animations, typography
- `postcss.config.mjs` — autoprefixer, Tailwind integration
- `tsconfig.json` — Path aliases & strict options

## Contributing

1. Fork this repository
2. Create a feature branch: `git checkout -b feature/my-change`
3. Commit your changes: `git commit -m "Add feature"`
4. Push to branch: `git push origin feature/my-change`
5. Open a pull request

Please adhere to existing code style and ensure TypeScript types are correct.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
