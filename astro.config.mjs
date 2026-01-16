// @ts-check
import { defineConfig } from "astro/config";
import expressiveCode from "astro-expressive-code";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
	integrations: [
		expressiveCode({
			themes: ["everforest-light"],
			defaultProps: {
				wrap: true,
			},
			styleOverrides: {
				frames: {
					inlineButtonBorderOpacity: "0",
				},
			},
		}),
		mdx(),
		react(),
	],
	output: "static",
	vite: {
		plugins: [tailwindcss()],
	},
});
