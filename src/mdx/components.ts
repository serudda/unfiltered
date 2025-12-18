// MDX Component Registry
// This is the single source of truth for all MDX components used in posts

import Figure from "@/components/mdx/Figure.astro";
import Video from "@/components/mdx/Video.astro";
import SmartLink from "@/components/mdx/SmartLink.astro";
import Callout from "@/components/mdx/Callout.astro";
import Divider from "@/components/mdx/Divider.astro";
import Quote from "@/components/mdx/Quote.astro";
import Audio from "@/components/mdx/Audio.astro";

// Optional: React islands (only hydrate when needed)
// import CodeTabs from '@/components/islands/CodeTabs';

export const mdxComponents = {
	// Map native HTML tags to custom components
	img: Figure,
	a: SmartLink,

	// Custom MDX components
	Video,
	Callout,
	Divider,
	Quote,
	Audio,

	// Islands (uncomment when needed)
	// CodeTabs,
};
