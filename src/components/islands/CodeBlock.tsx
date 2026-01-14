"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
	/** Raw code content */
	code: string;
	/** Additional CSS classes */
	className?: string;
}

/**
 * Interactive code block with copy-to-clipboard functionality
 * Designed for use in MDX content as an Astro island
 */
export default function CodeBlock({ code, className = "" }: CodeBlockProps) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(code);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy:", err);
		}
	};

	return (
		<div className={`relative group ${className}`}>
			{/* Copy Button - Always visible */}
			<button
				type="button"
				onClick={handleCopy}
				className="absolute top-3 right-3 p-2 rounded-md bg-slate-700/50 hover:bg-slate-600/50 transition-colors z-10 border border-slate-600/50"
				aria-label={copied ? "Copied!" : "Copy code"}
			>
				{copied ? (
					<Check className="w-4 h-4 text-emerald-400" />
				) : (
					<Copy className="w-4 h-4 text-slate-300" />
				)}
			</button>

			{/* Code Block - Plain text only */}
			<pre className="my-0 p-4 pr-16 rounded-lg overflow-x-auto text-sm leading-relaxed bg-slate-900 text-slate-100">
				<code className="font-mono">{code}</code>
			</pre>
		</div>
	);
}
