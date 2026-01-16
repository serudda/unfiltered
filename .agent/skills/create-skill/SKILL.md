---
name: create-skill
description: Creates new Antigravity skills with proper structure and format. Use when the user wants to create a new skill, automate a workflow, or add agent capabilities to a project. Guides through information gathering, creates SKILL.md with correct frontmatter, and optionally sets up scripts/examples folders.
---

# Create Antigravity Skill

## When to Use This Skill

- User wants to create a new skill for Antigravity
- User says "create a skill that...", "make a skill for...", "add a skill to..."
- User wants to automate a specific workflow or task
- User wants to teach the agent a new capability

---

## Information Gathering

Before creating the skill, ASK the user for this information:

### Required Information

1. **Skill Name**
   - Ask: "What should this skill be called? (use lowercase with hyphens, e.g., `deploy-to-prod`)"
   - If user gives a phrase, convert to kebab-case

2. **Description**
   - Ask: "Describe what this skill does in 2-4 sentences. Be specific about WHEN and WHY to use it."
   - The description is critical - it's how the agent decides to use the skill

3. **Trigger Phrases**
   - Ask: "What phrases or keywords should trigger this skill? (e.g., 'deploy', 'push to production', 'release')"

4. **Core Instructions**
   - Ask: "Walk me through the step-by-step process this skill should follow. What are the main actions?"

### Optional Information

5. **Prerequisites**
   - Ask: "Are there any prerequisites or setup required before running this skill?"

6. **Examples**
   - Ask: "Can you give me an example of how you'd use this skill?"

7. **Scope**
   - Ask: "Should this skill be project-specific (`.agent/skills/`) or global (`~/.gemini/antigravity/skills/`)?"
   - Default: project-specific

8. **Additional Resources**
   - Ask: "Does this skill need helper scripts, examples, or templates?"

---

## Skill Creation Process

### Step 1: Create the Skill Directory

```bash
# Project-specific
mkdir -p .agent/skills/<skill-name>

# OR Global
mkdir -p ~/.gemini/antigravity/skills/<skill-name>
```

---

### Step 2: Create SKILL.md

Use this template structure:

```markdown
---
name: <skill-name>
description: <One or two sentences. Third person. Include keywords for when to use.>
---

# <Skill Title>

## When to Use This Skill

- <Trigger scenario 1>
- <Trigger scenario 2>
- <Keywords that should activate this skill>

---

## Prerequisites (if any)

- <Requirement 1>
- <Requirement 2>

---

## Step-by-Step Process

### Step 1: <First Action>

<Instructions for step 1>

### Step 2: <Second Action>

<Instructions for step 2>

(Continue for all steps...)

---

## Examples

### Example: <Scenario Name>

<Show a concrete example of using the skill>

---

## Troubleshooting (optional)

### <Problem 1>

<Solution>

### <Problem 2>

<Solution>
```

---

### Step 3: Add Optional Resources (if needed)

If the skill needs additional resources:

```bash
# Helper scripts
mkdir -p .agent/skills/<skill-name>/scripts
# Add executable scripts here

# Examples
mkdir -p .agent/skills/<skill-name>/examples
# Add reference implementations

# Resources/templates
mkdir -p .agent/skills/<skill-name>/resources
# Add templates, configs, etc.
```

---

### Step 4: Verify the Skill

After creation, verify:

1. SKILL.md has valid YAML frontmatter
2. Description is clear and includes trigger keywords
3. Steps are actionable and specific
4. File is in the correct location

---

## Best Practices for Writing Skills

### Description Guidelines

✅ **Good descriptions:**

- "Deploys the application to production. Use when releasing a new version or pushing updates to live servers."
- "Creates React components following project conventions. Use when adding new UI components."

❌ **Bad descriptions:**

- "Helps with deployment" (too vague)
- "Does stuff with components" (no keywords)

### Content Guidelines

1. **Be Specific**: Include exact commands, file paths, and code snippets
2. **Be Concise**: The agent reads the whole skill, so avoid unnecessary text
3. **Be Complete**: Don't assume the agent knows project-specific conventions
4. **Include Examples**: Real-world usage examples help the agent understand context

### Structural Guidelines

1. **One Skill = One Purpose**: Don't create "catch-all" skills
2. **Clear Triggers**: List specific phrases/scenarios in "When to Use"
3. **Numbered Steps**: Makes it easy to follow and verify
4. **Troubleshooting**: Anticipate common issues

---

## Example: Creating a "Deploy to Production" Skill

### User provides:

- **Name**: deploy-prod
- **Description**: Deploys the application to production servers
- **Triggers**: "deploy", "push to prod", "release to production"
- **Steps**: Build → Test → Deploy → Verify

### Agent creates:

**File**: `.agent/skills/deploy-prod/SKILL.md`

```markdown
---
name: deploy-prod
description: Deploys the application to production servers. Use when releasing new versions, pushing updates, or when user says "deploy to prod" or "release".
---

# Deploy to Production

## When to Use This Skill

- User wants to deploy to production
- User says "push to prod", "release", "deploy"
- User mentions "production deployment"

---

## Prerequisites

- All tests must pass
- User must have production credentials configured
- Current branch should be `main` or `release/*`

---

## Step-by-Step Process

### Step 1: Run Tests

\`\`\`bash
npm run test
\`\`\`

Verify all tests pass before proceeding.

### Step 2: Build for Production

\`\`\`bash
npm run build
\`\`\`

### Step 3: Deploy

\`\`\`bash
npm run deploy:prod
\`\`\`

### Step 4: Verify Deployment

- Check the production URL
- Verify key functionality works
- Monitor logs for errors

---

## Troubleshooting

### Build fails

Check for TypeScript errors: \`npm run type-check\`

### Deploy fails

Verify credentials: \`npm run verify-credentials\`
```

---

## Conversation Flow Template

When the user triggers this skill, follow this flow:

```
Agent: I'll help you create a new Antigravity skill. Let me gather some info:

1. What should this skill be called? (lowercase with hyphens)
User: <name>

Agent: What does this skill do? (1-2 sentences, be specific)
User: <description>

Agent: What phrases should trigger this skill?
User: <triggers>

Agent: Walk me through the steps this skill should follow:
User: <steps>

Agent: Got it! Should this be project-specific or global?
User: <scope>

Agent: [Creates the skill file]

Done! I've created your skill at `.agent/skills/<name>/SKILL.md`.
You can now use it by asking me to <trigger phrase>.
```

---

## Post-Creation Checklist

After creating the skill, remind the user:

- [ ] Review the generated SKILL.md
- [ ] Test the skill by triggering it
- [ ] Add to version control if project-specific
- [ ] Share with team if applicable
