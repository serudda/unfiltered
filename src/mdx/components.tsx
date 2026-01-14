import type React from "react";
import Figure from "@/components/mdx/Figure.astro";
import Video from "@/components/mdx/Video.astro";
import SmartLink from "@/components/mdx/SmartLink.astro";
import Callout from "@/components/mdx/Callout.astro";
import Divider from "@/components/mdx/Divider.astro";
import Quote from "@/components/mdx/Quote.astro";
import Audio from "@/components/mdx/Audio.astro";
import CodeBlock from "@/components/mdx/CodeBlock.astro";

// Optional: React islands (only hydrate when needed)
// import CodeTabs from '@/components/islands/CodeTabs';

/**
 * MDX Component Registry
 * This is the single source of truth for all MDX components used in posts
 */
export const mdxComponents = {
	/*******************************************
	 * Native HTML tags
	 ******************************************/
	img: Figure,
	a: SmartLink,
	p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
		<p className="leading-relaxed mb-8" {...props} />
	),

	h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h1
			className="text-[2.75rem] font-bold leading-tight mt-0 mb-6"
			{...props}
		/>
	),

	h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h2
			className="text-[2rem] font-semibold leading-snug mt-12 mb-4"
			{...props}
		/>
	),

	h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h3
			className="text-[2rem] font-semibold leading-snug mt-10 mb-3"
			{...props}
		/>
	),

	strong: (props: React.HTMLAttributes<HTMLElement>) => (
		<strong className="font-semibold text-foreground" {...props} />
	),

	// Note: 'code' is intentionally not mapped here to avoid conflicts with CodeBlock
	// Inline code styling is handled via global CSS or can be added as a custom component

	ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
		<ul
			className="my-6 ml-6 list-disc ps-4 marker:text-primary-600 text-xl"
			{...props}
		/>
	),

	ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
		<ol
			className="list-decimal list-outside pl-6 mb-8 space-y-2 text-foreground font-serif text-xl leading-relaxed"
			{...props}
		/>
	),

	li: (props: React.HTMLAttributes<HTMLLIElement>) => (
		<li className="mb-1 [&>p]:mb-2" {...props} />
	),

	hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
		<hr className="border-0 h-px bg-border my-12 mx-auto w-16" {...props} />
	),

	blockquote: Quote,
	pre: CodeBlock,

	/*******************************************
	 * Custom MDX components
	 ******************************************/
	Video,
	Callout,
	Divider,
	Audio,

	/*******************************************
	 * Islands (uncomment when needed)
	 ******************************************/
	// CodeTabs,
};
