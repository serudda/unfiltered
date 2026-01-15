import type React from "react";
import Figure from "@/components/mdx/Figure.astro";
import Video from "@/components/mdx/Video.astro";
import SmartLink from "@/components/mdx/SmartLink.astro";
import Callout from "@/components/mdx/Callout.astro";
import Divider from "@/components/mdx/Divider.astro";
import Quote from "@/components/mdx/Quote.astro";
import Audio from "@/components/mdx/Audio.astro";

/**
 * MDX Component Registry for Skills & Vaults
 * Typography optimized for technical documentation with sans-serif fonts and smaller text
 */
export const skillsComponents = {
	/*******************************************
	 * Native HTML tags
	 ******************************************/
	img: Figure,
	a: SmartLink,
	p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
		<p className="my-4 text-foreground text-base" {...props} />
	),

	h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h1 className="mt-14 mb-4 text-3xl font-bold text-balance" {...props} />
	),

	h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h2
			className="mt-10 mb-4 scroll-mt-18 text-foreground hover:text-foreground/90 text-2xl font-bold text-balance"
			id={props.id}
			{...props}
		/>
	),

	h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h3
			className="mt-8 mb-4 scroll-m-28 text-lg text-foreground hover:text-foreground/90 font-bold [&+p]:!mt-4 *:[code]:text-xl"
			id={props.id}
			{...props}
		/>
	),

	h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h4
			className="mt-6 mb-4 scroll-m-28 text-base text-foreground hover:text-foreground/90 font-bold [&+p]:!mt-4 *:[code]:text-xl"
			id={props.id}
			{...props}
		/>
	),

	strong: (props: React.HTMLAttributes<HTMLElement>) => (
		<strong className="font-semibold text-foreground" {...props} />
	),

	em: (props: React.HTMLAttributes<HTMLElement>) => (
		<em className="text-muted-foreground not-italic" {...props} />
	),

	ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
		<ul
			className="my-6 ml-6 list-disc ps-4 marker:text-primary-600 text-base"
			{...props}
		/>
	),

	ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
		<ol
			className="list-decimal list-outside pl-6 mb-8 space-y-2 text-foreground text-base leading-relaxed"
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

	/*******************************************
	 * Custom MDX components
	 ******************************************/
	Video,
	Callout,
	Divider,
	Audio,
};
