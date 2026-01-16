---
name: add-external-content
description: Configures Git submodules to sync external content from other GitHub repositories. Use when the user wants to import files from external repos into this project and display them in MDX/Astro pages. Handles submodule setup, Netlify configuration, and MDX imports with ?raw suffix.
---

# Add External Content via Git Submodule

## When to Use This Skill

- User wants to import content (like SKILL.md, README.md, etc.) from an external GitHub repository
- User needs to display external file contents in MDX pages that auto-update
- User wants to avoid manual copy-paste between repositories
- User mentions "sync", "external repo", "submodule", or "import from another repo"

---

## Prerequisites

Before starting, gather this information from the user:

1. **External repo URL** (e.g., `https://github.com/user/repo`)
2. **File path within that repo** (e.g., `.claude/skills/save-fragment/SKILL.md`)
3. **Target MDX file** where content will be displayed

---

## Step-by-Step Process

### Step 1: Add the Submodule

```bash
git submodule add <REPO_URL> src/external/<REPO_NAME>
```

**Example:**

```bash
git submodule add https://github.com/serudda/fragments-vault.git src/external/fragments-vault
```

> Place all external repos under `src/external/` for consistency.

---

### Step 2: Verify Submodule Content

After adding, verify the file exists:

```bash
ls src/external/<REPO_NAME>/<PATH_TO_FILE>
```

---

### Step 3: Update the MDX File

Add an import using the `?raw` suffix to get the file content as a string:

```mdx
import { Code } from "astro-expressive-code/components";
import externalContent from "../../external/<REPO_NAME>/<PATH_TO_FILE>?raw";

## Section Title

<Code code={externalContent} lang="markdown" title="FILENAME" />
```

**Key points:**

- Use relative path from the MDX file to the submodule
- The `?raw` suffix is REQUIRED - it tells Vite to import as plain text
- Use `lang="markdown"` for .md files, adjust for other file types

---

### Step 4: Add Sync Script to package.json

If not already present, add this script:

```json
{
	"scripts": {
		"sync:external": "git submodule update --remote --merge"
	}
}
```

---

### Step 5: Configure Netlify (if applicable)

Create or update `netlify.toml` to initialize submodules during build:

```toml
[build]
  command = "git submodule update --init --recursive && npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"
```

---

### Step 6: Commit the Changes

Submodule changes require committing:

- The `.gitmodules` file (created automatically)
- The submodule reference in git
- Any MDX file changes

```bash
git add .gitmodules src/external/<REPO_NAME> <MDX_FILE>
git commit -m "feat: add <REPO_NAME> as submodule for external content"
```

---

## User Workflow After Setup

Explain to the user their new workflow:

1. Make changes in the external repo, commit and push
2. In this project, run `npm run sync:external`
3. Commit the submodule update
4. Push to trigger Netlify rebuild

---

## Adding More Files from Same Repo

For additional files from an already-added submodule, just add new imports:

```mdx
import anotherFile from "../../external/<REPO_NAME>/path/to/other/file.md?raw";

<Code code={anotherFile} lang="markdown" title="other-file.md" />
```

---

## Adding Files from a Different Repo

Repeat Steps 1-3 with the new repository URL.

---

## Troubleshooting

### Submodule is empty after clone

Run:

```bash
git submodule update --init --recursive
```

### Content not updating

1. Ensure you ran `npm run sync:external`
2. Check if submodule commit was pushed
3. Verify Netlify build logs show submodule init

### Import error in MDX

- Check the relative path is correct
- Ensure the `?raw` suffix is present
- Verify the file exists in the submodule

---

## Example: Complete Setup

For a user wanting to import `SKILL.md` from `github.com/user/my-skills`:

```bash
# 1. Add submodule
git submodule add https://github.com/user/my-skills.git src/external/my-skills

# 2. Verify
ls src/external/my-skills/.claude/skills/example/SKILL.md
```

```mdx
// 3. In the MDX file
import { Code } from "astro-expressive-code/components";
import skillCode from "../../external/my-skills/.claude/skills/example/SKILL.md?raw";

## Install This Skill

<Code code={skillCode} lang="markdown" title="SKILL.md" />
```

```bash
# 4. Commit
git add .
git commit -m "feat: add my-skills submodule"
```
