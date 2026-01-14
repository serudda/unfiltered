# CLAUDE.md - Unfiltered Digital Garden

## Project Concept

This project is a **Digital Garden** hosted at `serudda.com`. It's not just a blog—it's a hub where multiple sections coexist, each one promotable as an independent "product."

### Garden Structure

```
serudda.com/
├── / (HOME)
│   └── Personal brand landing
│       → Who I am, what I do
│       → Cards/links to blog and skills
│
├── /blog (posts EN/ES)
│   └── Bilingual content with translation system
│
└── /skills
    ├── / (catalog)
    │   └── List of all Claude Code skills
    │
    └── /[skill-slug]
        └── Individual landing for each skill
```

---

## Garden Sections

### 1. HOME (`/`)

Personal brand landing page. Introduces who I am and provides access to the different garden sections.

- **Language**: English only
- **Purpose**: First impression, navigation hub

### 2. BLOG (`/[lang]/posts/`)

Traditional blog with posts in English and Spanish.

- **Languages**: EN and ES (translation system using `ref` field)
- **Routes**: `/en/posts/[slug]`, `/es/posts/[slug]`
- **Content**: MDX posts with rich components

### 3. SKILLS (`/skills/`)

Catalog of Claude Code skills I've created. Each skill has its own promotable landing page.

- **Language**: English only
- **Routes**: `/skills/` (catalog), `/skills/[slug]` (individual landing)
- **Branding**: Semi-independent (each skill can have its own accent color)

---

## Technical Architecture

### Stack

- **Framework**: Astro 5 (Static Site Generation)
- **Content**: MDX (Markdown + JSX)
- **Interactivity**: React (islands architecture)
- **Styles**: TailwindCSS 4
- **Typing**: TypeScript

### File Structure

```
src/
├── content/
│   ├── posts/              # Blog posts (EN/ES)
│   │   └── *.mdx
│   └── skills/             # Claude Code skills (EN only)
│       └── *.mdx
│
├── pages/
│   ├── index.astro         # HOME - Personal landing
│   ├── [lang]/
│   │   ├── index.astro     # Blog home by language
│   │   └── posts/[slug].astro
│   └── skills/
│       ├── index.astro     # Skills catalog
│       └── [slug].astro    # Individual skill landing
│
├── layouts/
│   ├── Layout.astro        # Shared base
│   ├── PostLayout.astro    # For blog posts
│   └── SkillLayout.astro   # For skill landings
│
├── components/
│   ├── site/               # Header, Footer, navigation
│   └── mdx/                # Components for MDX content
│
└── styles/
    └── global.css          # Theme, colors, typography
```

---

## Schema: Skills

Each skill is an `.mdx` file in `src/content/skills/`. The filename becomes the URL slug (e.g., `fragments.mdx` → `/skills/fragments/`).

```yaml
---
# Identity
name: "Fragments"
tagline: "Save, organize, and search knowledge fragments"
description: "A personal vault for quotes, tweets, articles..."

# Visual (semi-independent branding)
icon: "archive"           # icon name or path to SVG
accentColor: "purple"     # blue, purple, green, amber, red, cyan

# Metadata
version: "1.0.0"
lastUpdated: 2025-01-14

# Features (for the landing page)
features:
  - "Save fragments from any source"
  - "Search by tags and content"
  - "Automatic organization"

# Installation
installCommand: "/fragments"
draft: false              # set to true to hide from production
---

[MDX content: detailed explanation, usage examples, skill code]
```

### Current/Planned Skills

- **fragments**: Save and search knowledge fragments
- **tweet**: Create optimized tweets
- **linkedin**: Publish to LinkedIn
- **hackernews**: Name and describe posts for HN
- _(more to come)_

---

## Schema: Posts (Blog)

```yaml
---
title: "Post title"
description: "SEO description"
date: 2025-01-14
tags: ["tag1", "tag2"]
draft: false
readingTime: 5
lang: "en"              # "en" or "es"
ref: "post-id"          # Shared ID for translations
---
```

---

## Conventions

### Languages

- **HOME**: English
- **Blog**: Bilingual (EN/ES) with translations linked by `ref`
- **Skills**: English only

### Routes

- Use lowercase slugs with hyphens: `my-skill`, `my-post`
- Skills have no language prefix: `/skills/fragments`
- Posts always have prefix: `/en/posts/...`, `/es/posts/...`

### Branding by Section

| Section | Colors | Identity |
|---------|--------|----------|
| HOME | Primary (purple/blue) | Personal brand |
| Blog | Primary | Consistent with home |
| Skills | Each skill defines `accentColor` | Semi-independent |

### Available MDX Components

- `Figure` - Images with caption
- `Video` - YouTube, Vimeo, local
- `Audio` - Audio player
- `Callout` - Notes, warnings, tips
- `Quote` - Quotes with author
- `Divider` - Visual separator

---

## Commands

```bash
pnpm dev      # Local development
pnpm build    # Production build
pnpm preview  # Preview build
```

---

## Deployment

- **Platform**: Netlify
- **Domain**: serudda.com
- **Branch**: main
- **Build**: Automatic on push

---

## Notes for Claude Code

1. **When creating a new skill**: Add file in `src/content/skills/` following the schema
2. **When creating a post**: Add in `src/content/posts/`, remember the `lang` field
3. **For translations**: Use the same `ref` in both languages
4. **Styles**: Use Tailwind classes, respect the dark theme
5. **Components**: Prefer existing MDX components before creating new ones
