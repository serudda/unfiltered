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
	icon: z.string().default("terminal"),
	accentColor: z.enum(["blue", "purple", "green", "amber", "red", "cyan"]).default("purple"),
	version: z.string().default("1.0.0"),
	lastUpdated: z.coerce.date(),
	features: z.array(z.string()).default([]),
	installCommand: z.string(),
	draft: z.boolean().default(false),
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
};
