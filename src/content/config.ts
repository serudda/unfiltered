import { defineCollection, z } from "astro:content";

// Schema for posts
const postSchema = z.object({
	title: z.string(),
	description: z.string().optional(),
	date: z.coerce.date(),
	updated: z.coerce.date().optional(),
	tags: z.array(z.string()).default([]),
	draft: z.boolean().default(false),
	readingTime: z.number().optional(), // Reading time in minutes
	lang: z.enum(["en", "es"]).default("en"), // Language of the post
	ref: z.string().optional(), // Shared reference ID for translations
});

// Schema for skills (Claude Code skills)
const skillSchema = z.object({
	name: z.string(),
	tagline: z.string(),
	description: z.string().optional(),
	version: z.string().default("1.0.0"),
	lastUpdated: z.coerce.date(),
	flow: z.array(z.string()).default([]),
	command: z.string(),
	// Optional vault reference - slug of parent vault (e.g., "fragments")
	vault: z.string().optional(),
	// Optional order for sorting skills within a vault (lower = first)
	order: z.number().optional(),
	// Draft flag for hiding skills in production
	draft: z.boolean().default(false),
});

// Schema for vaults (containers grouping related skills)
// Skills are fetched dynamically from the skills collection by matching vault slug
const vaultSchema = z.object({
	name: z.string(),
	tagline: z.string(),
	description: z.string().optional(),
	icon: z.string().default("Archive"),
	version: z.string().default("1.0.0"),
	lastUpdated: z.coerce.date(),
	// Draft flag for hiding vaults in production
	draft: z.boolean().default(false),
	// Submodule folder name in src/external/ (enables ZIP download)
	submodule: z.string().optional(),
});

// Collections
export const collections = {
	posts: defineCollection({
		type: "content",
		schema: postSchema,
	}),
	skills: defineCollection({
		type: "content",
		schema: skillSchema,
	}),
	vaults: defineCollection({
		type: "content",
		schema: vaultSchema,
	}),
};
