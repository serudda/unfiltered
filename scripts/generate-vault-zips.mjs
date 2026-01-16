#!/usr/bin/env node

/**
 * generate-vault-zips.mjs
 *
 * Generates ZIP files for each vault that has a submodule configured.
 * Includes the entire submodule contents except .git and LICENSE.md
 *
 * To add a new vault with download support:
 * 1. Add the submodule: git submodule add <url> src/external/<name>
 * 2. In your vault's .mdx frontmatter, add:
 *    submodule: "<name>"  # folder name in src/external/
 */

import { execSync } from "child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync } from "fs";
import { join, dirname, basename } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, "..");
const VAULTS_DIR = join(ROOT_DIR, "src", "content", "vaults");
const EXTERNAL_DIR = join(ROOT_DIR, "src", "external");
const OUTPUT_DIR = join(ROOT_DIR, "public", "downloads");

// Files/folders to exclude from ZIP
const EXCLUDE_PATTERNS = [
	".git",
	".git/*",
	"LICENSE.md",
	"LICENSE",
	".DS_Store",
];

/**
 * Parse YAML frontmatter from MDX file
 */
function parseFrontmatter(content) {
	const match = content.match(/^---\n([\s\S]*?)\n---/);
	if (!match) return {};

	const yaml = match[1];
	const result = {};

	yaml.split("\n").forEach((line) => {
		const colonIndex = line.indexOf(":");
		if (colonIndex > 0) {
			const key = line.slice(0, colonIndex).trim();
			let value = line.slice(colonIndex + 1).trim();
			if (
				(value.startsWith('"') && value.endsWith('"')) ||
				(value.startsWith("'") && value.endsWith("'"))
			) {
				value = value.slice(1, -1);
			}
			result[key] = value;
		}
	});

	return result;
}

/**
 * Discover all vaults with submodule configuration
 */
function discoverVaults() {
	const vaults = [];

	if (!existsSync(VAULTS_DIR)) {
		console.warn("⚠️  Vaults directory not found:", VAULTS_DIR);
		return vaults;
	}

	const files = readdirSync(VAULTS_DIR).filter((f) => f.endsWith(".mdx"));

	for (const file of files) {
		const filePath = join(VAULTS_DIR, file);
		const content = readFileSync(filePath, "utf-8");
		const frontmatter = parseFrontmatter(content);

		if (frontmatter.submodule) {
			const slug = basename(file, ".mdx");
			vaults.push({
				slug,
				name: frontmatter.name || slug,
				submodule: frontmatter.submodule,
			});
		}
	}

	return vaults;
}

function ensureDir(dir) {
	if (!existsSync(dir)) {
		mkdirSync(dir, { recursive: true });
	}
}

function generateZip(vault) {
	const { slug, name, submodule } = vault;
	const submodulePath = join(EXTERNAL_DIR, submodule);
	const zipFileName = `${slug}-vault.zip`;
	const zipOutputPath = join(OUTPUT_DIR, zipFileName);

	// Check if submodule exists
	if (!existsSync(submodulePath)) {
		console.warn(`⚠️  Submodule not found: ${submodulePath}`);
		console.warn(`   Run: git submodule update --init --recursive`);
		return null;
	}

	console.log(`📦 Generating ZIP for "${name}" vault...`);
	console.log(`   Source: ${submodulePath}`);

	// Build exclude arguments for zip command
	const excludeArgs = EXCLUDE_PATTERNS.map((p) => `-x "${p}"`).join(" ");

	try {
		// Remove existing ZIP if present
		if (existsSync(zipOutputPath)) {
			execSync(`rm "${zipOutputPath}"`, { cwd: ROOT_DIR });
		}

		// Create ZIP from submodule directory, excluding .git and LICENSE
		execSync(
			`cd "${submodulePath}" && zip -r "${zipOutputPath}" . ${excludeArgs}`,
			{ cwd: ROOT_DIR, stdio: "pipe" }
		);

		console.log(`   ✓ Created: ${zipFileName}`);
		return zipFileName;
	} catch (error) {
		console.error(`   ✗ Failed to create ZIP: ${error.message}`);
		return null;
	}
}

function main() {
	console.log("\n🗜️  Vault ZIP Generator\n");

	ensureDir(OUTPUT_DIR);

	const vaults = discoverVaults();

	if (vaults.length === 0) {
		console.log("ℹ️  No vaults with submodule configuration found.");
		console.log(
			"   To enable ZIP downloads for a vault, add to its frontmatter:"
		);
		console.log('   submodule: "submodule-folder-name"');
		console.log("");
		return;
	}

	console.log(
		`Found ${vaults.length} vault(s) with submodule configuration:\n`
	);

	const results = [];

	for (const vault of vaults) {
		const zipFile = generateZip(vault);
		if (zipFile) {
			results.push({ vault: vault.slug, name: vault.name, file: zipFile });
		}
		console.log("");
	}

	console.log("📋 Summary:");
	if (results.length > 0) {
		results.forEach((r) => console.log(`   ✓ ${r.name}: /downloads/${r.file}`));
	} else {
		console.log("   No ZIP files generated.");
	}
	console.log("");
}

main();
