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

2. **Description**
   - Ask: "Describe what this skill does in 2-4 sentences. Be specific about WHEN and WHY to use it."

3. **Role & Identity**
   - Ask: "What 'Role' should the agent adopt? (e.g., Senior Engineer, Investigative Journalist, QA Specialist)"
   - Ask: "What are the core Principles to follow? (e.g., 'Safety first', 'Be skeptical', 'Favor speed')"
   - **Proactive Assist**: If the user is unsure about principles, analyze their description/goal and suggest 3 strong principles (e.g., "Based on 'code review', I suggest: 1. Catch bugs early, 2. Be constructive, 3. Performance matters. Do these work?").

4. **Triggers**
   - Ask: "What phrases or keywords should trigger this skill? (e.g., 'deploy', 'push to production', 'release')"

5. **Inputs & Prerequisites**
   - Ask: "What information or state is required BEFORE starting? (e.g., API keys, specific files, user input)"

6. **The Workflow**
   - Ask: "Walk me through the step-by-step process. Be precise—treat it like code."

7. **Output Specification**
   - Ask: "What exactly should be delivered at the end? (A file? A confirmation message? A summary?)"

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

Use this **Master Template** structure. Exact adherence to this structure ensures the skill is deterministic and high-quality.

````markdown
---
name: <skill-name>
description: <Action verb> + <Context/When to use> + <Expected Result>.
---

# <Skill Title>

## Role & Objective

**Role**: <Define the persona/mindset, e.g., "You are a strict code reviewer" or "You are an investigative journalist">.
**Objective**: <One sentence on what success looks like>.

### Core Principles

1. **<Principle 1>** - <Brief explanation>
2. **<Principle 2>** - <Brief explanation>
3. **<Principle 3>** - <Brief explanation>

---

## When to Use This Skill

- <Trigger scenario 1>
- <Trigger scenario 2>
- <Keywords that should activate this skill>

---

## Prerequisites & Inputs

Before proceeding, ensure you have the following information or state:

| Variable/Input | Description   |
| -------------- | ------------- |
| `<VAR_NAME>`   | <What is it?> |
| `<VAR_NAME_2>` | <What is it?> |

---

## The Workflow

### Step 1: <First Action>

<Specific instructions, commands to run, or questions to ask>

```bash
# Example command if applicable
command here
```
````

### Step 2: <Second Action>

<Logic: If X happens, do Y>

### Step 3: <Third Action>

...

---

## Output Specification

The final deliverable must match this format:

- **Format**: <File type, Terminal output, or Text block>
- **Location**: <Where does it go?>
- **Template**:

```text
<Template of the final output>
```

---

## Troubleshooting

| Issue     | Solution |
| --------- | -------- |
| <Error 1> | <Fix>    |
| <Error 2> | <Fix>    |

````

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
````

---

### Step 4: Verify the Skill

After creation, verify:

1. **Frontmatter**: valid YAML `name` and `description`.
2. **Role & Principles**: Are they clear enough to guide decision making?
3. **Determinism**: Are the steps actionable (SOP style)?
4. **Output**: Is the definition of "Done" clear?

---

## Best Practices for Writing Skills

### 1. The "Workflow" Mindset

Don't just write a prompt; write a program in English. Use logic, standard operating procedures (SOPs), and clear conditions.

### 2. Define Inputs and Outputs

Treat the skill like a function. It takes arguments (Inputs) and returns a result (Output Specification).

### 3. Principles over Micro-management

Use the "Principles" section to handle edge cases. Instead of listing every possibility, give the agent a rule to decide (e.g., "Always favor speed over precision in this step").

---

## Example: Creating a "Deploy to Production" Skill

### User provides:

- **Name**: deploy-prod
- **Goal**: Safely deploy to Vercel
- **Principles**: Safety first, no downtime

### Agent creates:

````markdown
---
name: deploy-prod
description: Deploys the application to production via Vercel CLI. Use when the user says "deploy" or "go live". Returns the live URL.
---

# Deploy to Production

## Role & Objective

**Role**: You are a Release Manager.
**Objective**: Deploy code to production with zero downtime and verify basic health.

### Core Principles

1. **Safety First**: Verify tests before pushing.
2. **No Dirty States**: Never deploy uncommitted changes.
3. **Verify, Don't Assume**: Check the URL after deployment.

---

## When to Use This Skill

- User says "deploy to prod"
- User says "release this version"

---

## Prerequisites & Inputs

| Input          | Description                    |
| -------------- | ------------------------------ |
| `VERCEL_TOKEN` | Must be present in environment |
| `Branch`       | Must be on 'main'              |

---

## The Workflow

### Step 1: Pre-flight Check

Ensure workspace is clean and tests pass.

```bash
git status --porcelain
npm test
```
````

### Step 2: Deploy

Trigger the deployment.

```bash
vercel --prod
```

### Step 3: Validation

Ping the returned URL to ensure 200 OK.

---

## Output Specification

- **Deliverable**: Deployment Confirmation
- **Format**:
  > 🚀 **Deployment Successful**
  >
  > - URL: <url>
  > - Time: <timestamp>

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
```
