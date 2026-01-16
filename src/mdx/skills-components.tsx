import type React from "react";
import Figure from "@/components/mdx/Figure.astro";
import Video from "@/components/mdx/Video.astro";
import SmartLink from "@/components/mdx/SmartLink.astro";
import Callout from "@/components/mdx/Callout.astro";
import Divider from "@/components/mdx/Divider.astro";
import Quote from "@/components/mdx/Quote.astro";
import Audio from "@/components/mdx/Audio.astro";
import InstallationCard from "@/components/skills/InstallationCard.astro";

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
		<p className="my-5 text-foreground text-lg" {...props} />
	),

	h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h1 className="mt-15 mb-4 text-4xl font-bold text-balance" {...props} />
	),

	h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h2
			className="mt-11 mb-4 scroll-mt-18 text-foreground hover:text-foreground/90 text-3xl font-bold text-balance"
			id={props.id}
			{...props}
		/>
	),

	h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h3
			className="mt-9 mb-4 scroll-m-28 text-2xl text-foreground hover:text-foreground/90 font-bold [&+p]:!mt-4 *:[code]:text-xl"
			id={props.id}
			{...props}
		/>
	),

	h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h4
			className="mt-6 mb-4 scroll-m-28 text-xl text-foreground hover:text-foreground/90 font-bold [&+p]:!mt-4 *:[code]:text-xl"
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
			className="my-7 ml-5 list-disc ps-4 marker:text-primary-600 text-lg"
			{...props}
		/>
	),

	ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
		<ol
			className="list-decimal list-outside pl-5 mb-8 space-y-2 text-foreground text-lg leading-relaxed"
			{...props}
		/>
	),

	li: (props: React.HTMLAttributes<HTMLLIElement>) => (
		<li className="mb-1 [&>p]:mb-2" {...props} />
	),

	hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
		<hr className="border-dashed-x my-10" {...props} />
	),

	blockquote: Quote,

	/*******************************************
	 * Custom MDX components
	 ******************************************/
	Video,
	Callout,
	Divider,
	Audio,
	InstallationCard,
};
