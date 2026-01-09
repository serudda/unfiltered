# 🚀 Unfiltered

A minimal, read-friendly personal blog built with **Astro 5 + MDX**.

## ✨ Tech Stack

- **Astro 5** — Static site generator
- **MDX** — Markdown + JSX for rich posts
- **React** — Interactive islands
- **TailwindCSS 4** — Styling

## 📦 Getting Started

```bash
# Clone
git clone https://github.com/serudda/unfiltered.git
cd unfiltered

# Install dependencies
pnpm install

# Run locally
pnpm dev
```

Open [http://localhost:4321](http://localhost:4321) to view it.

## 📁 Project Structure

```
src/
├── content/
│   └── posts/           # Your MDX posts go here
├── components/
│   └── site/            # Header, Footer, PostFooter
├── layouts/
│   ├── Layout.astro     # Base layout
│   └── PostLayout.astro # Post-specific layout
└── pages/
    └── [lang]/          # Route-based i18n (/en/, /es/)
        ├── index.astro  # Home page
        └── posts/
            └── [slug].astro
```

## ✍️ Creating a New Post

1. Create a new `.mdx` file in `src/content/posts/`
2. Add the frontmatter at the top:

```yaml
---
title: "Your Post Title"
description: "A brief description"
date: 2026-01-15
tags: ["tag1", "tag2"]
draft: false
readingTime: 3
lang: en
ref: your-post-id
---
```

3. Write your content below the frontmatter (Markdown + JSX supported)
4. Your post will appear at `/{lang}/posts/{filename}`

### Frontmatter Fields

| Field         | Required | Description                             |
| :------------ | :------- | :-------------------------------------- |
| `title`       | ✅       | Post title                              |
| `description` | ❌       | Short description for SEO               |
| `date`        | ✅       | Publication date (YYYY-MM-DD)           |
| `tags`        | ❌       | Array of tags                           |
| `draft`       | ❌       | Set to `true` to hide in production     |
| `readingTime` | ❌       | Estimated reading time in minutes       |
| `lang`        | ✅       | Language code (`en` or `es`)            |
| `ref`         | ❌       | Shared ID to link translations together |

## 🌐 Translations

To create a translation of a post:

1. Create another `.mdx` file with a different name
2. Use the **same `ref`** value (this links them together)
3. Use a **different `lang`** value (`en` or `es`)

Example:

- `the-pocket-writer.mdx` → `lang: en`, `ref: pocket-writer`
- `escritor-de-bolsillo.mdx` → `lang: es`, `ref: pocket-writer`

The site will automatically generate hreflang tags for SEO.

## 🖼️ Adding Images

Place images in `public/media/posts/{post-name}/` and reference them:

```md
![Alt text](/media/posts/your-post/image.jpg "Optional caption")
```

## 🧞 Commands

| Command        | Action                                      |
| :------------- | :------------------------------------------ |
| `pnpm install` | Installs dependencies                       |
| `pnpm dev`     | Starts local dev server at `localhost:4321` |
| `pnpm build`   | Build production site to `./dist/`          |
| `pnpm preview` | Preview build locally before deploying      |

## 🚀 Deployment

The site is deployed to **Netlify**. Push to `main` to trigger a deploy.

---

Made with ❤️ by [@serudda](https://x.com/serudda)
