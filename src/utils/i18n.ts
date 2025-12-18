import { getCollection } from "astro:content";

type TranslationMap = Map<string, { es?: string; en?: string }>;

/**
 * Build a map of translation keys to their URLs
 * This runs at build time (SSG)
 */
export async function buildTranslationMap(): Promise<TranslationMap> {
	const map: TranslationMap = new Map();

	// Get all posts
	const postsEs = await getCollection("posts_es");
	const postsEn = await getCollection("posts_en");

	// Map Spanish posts
	for (const post of postsEs) {
		if (post.data.translationKey) {
			const existing = map.get(post.data.translationKey) || {};
			map.set(post.data.translationKey, {
				...existing,
				es: `/es/posts/${post.slug}`,
			});
		}
	}

	// Map English posts
	for (const post of postsEn) {
		if (post.data.translationKey) {
			const existing = map.get(post.data.translationKey) || {};
			map.set(post.data.translationKey, {
				...existing,
				en: `/en/posts/${post.slug}`,
			});
		}
	}

	return map;
}

/**
 * Find the translation URL for a given translation key
 */
export async function findTranslationUrl(
	translationKey: string | undefined,
	targetLang: "es" | "en"
): Promise<string | undefined> {
	if (!translationKey) return undefined;

	const map = await buildTranslationMap();
	const urls = map.get(translationKey);

	return urls?.[targetLang];
}

/**
 * Get language labels
 */
export function getLanguageLabel(lang: "es" | "en"): string {
	return lang === "es" ? "Español" : "English";
}
