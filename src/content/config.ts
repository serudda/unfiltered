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

// Collections
export const collections = {
	posts: defineCollection({
		type: "content",
		schema: postSchema,
	}),
};
