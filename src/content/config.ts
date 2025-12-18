import { defineCollection, z } from "astro:content";

// Base schema for all posts and notes
const contentSchema = z.object({
	title: z.string(),
	description: z.string().optional(),
	date: z.coerce.date(),
	updated: z.coerce.date().optional(),
	tags: z.array(z.string()).default([]),
	draft: z.boolean().default(false),

	// Bilingual support
	lang: z.enum(["es", "en"]),
	translationKey: z.string().optional(), // same value across translations

	// Future: audio narration
	audio: z
		.object({
			es: z.string().url().optional(),
			en: z.string().url().optional(),
		})
		.optional(),
});

// Collections
export const collections = {
	// Posts — main blog content
	posts_es: defineCollection({
		type: "content",
		schema: contentSchema.extend({
			lang: z.literal("es"),
		}),
	}),

	posts_en: defineCollection({
		type: "content",
		schema: contentSchema.extend({
			lang: z.literal("en"),
		}),
	}),

	// Notes — short thoughts (optional, can add later)
	notes_es: defineCollection({
		type: "content",
		schema: contentSchema.extend({
			lang: z.literal("es"),
		}),
	}),

	notes_en: defineCollection({
		type: "content",
		schema: contentSchema.extend({
			lang: z.literal("en"),
		}),
	}),
};
