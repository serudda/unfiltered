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

## 🔗 Git Submodules (External Content)

This project uses **Git Submodules** to sync content from external repositories (like skills from other projects).

### Structure

```
src/external/
└── fragments-vault/          # Submodule: github.com/serudda/fragments-vault
    └── .claude/skills/
        └── save-fragment/
            └── SKILL.md      # ← This file is imported in MDX
```

### 📥 Cloning the Project (First Time)

```bash
# Clone the repo WITH submodules
git clone --recurse-submodules https://github.com/serudda/unfiltered.git

# Or if you already cloned without submodules:
git submodule update --init --recursive
```

### 🔄 Workflow: Update External Content

When you make changes in the external repo and want them reflected here:

```bash
# 1. In the EXTERNAL repo (fragments-vault), make your changes
cd ~/Documents/Projects/SHOWCASE/fragments-vault
# ... edit files ...
git add .
git commit -m "update: improve SKILL.md"
git push

# 2. In THIS project (unfiltered), pull the changes
cd ~/Documents/Projects/unfiltered
npm run sync:external    # Updates submodules

# 3. Commit the updated reference
git add src/external/fragments-vault
git commit -m "chore: sync fragments-vault submodule"
git push
```

### 📝 Adding a New Submodule

```bash
# Add an external repo
git submodule add https://github.com/USER/REPO.git src/external/REPO

# Example
git submodule add https://github.com/serudda/another-repo.git src/external/another-repo
```

### 🖼️ Importing Content in MDX

```mdx
import { Code } from "astro-expressive-code/components";
import skillCode from "../../external/fragments-vault/.claude/skills/save-fragment/SKILL.md?raw";

## Install This Skill

<Code code={skillCode} lang="markdown" title="SKILL.md" />
```

> ⚠️ **Important**: The `?raw` suffix is required to import as plain text.

### 🧞 Submodule Commands

| Command                         | Description                                   |
| :------------------------------ | :-------------------------------------------- |
| `npm run sync:external`         | Pull latest changes from all submodules       |
| `git submodule status`          | View submodule status                         |
| `git submodule update --init`   | Initialize submodules after cloning           |
| `git submodule update --remote` | Update to the latest version from remote repo |

### ☁️ Netlify

Netlify is configured to automatically initialize submodules on each build (see `netlify.toml`).

### 🔧 Troubleshooting

**Submodule is empty after cloning:**

```bash
git submodule update --init --recursive
```

**Changes not reflecting:**

1. Did you push in the external repo?
2. Did you run `npm run sync:external`?
3. Did you commit the submodule change in this repo?

---

Made with ❤️ by [@serudda](https://x.com/serudda)
