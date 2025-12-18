/**
 * Generate canonical URL for a page
 */
export function generateCanonicalUrl(
	path: string,
	baseUrl: string = "https://serudda.com"
): string {
	// Remove trailing slash
	const cleanPath =
		path.endsWith("/") && path !== "/" ? path.slice(0, -1) : path;
	return `${baseUrl}${cleanPath}`;
}

/**
 * Generate OpenGraph image URL
 */
export function generateOgImageUrl(
	baseUrl: string = "https://serudda.com"
): string {
	// For now, return default OG image
	// In the future, this could generate dynamic OG images
	return `${baseUrl}/og-image.jpg`;
}

/**
 * Validate meta description length
 */
export function validateMetaDescription(description: string): boolean {
	// Meta descriptions should be between 120-160 characters
	return description.length >= 120 && description.length <= 160;
}

/**
 * Truncate description if too long
 */
export function truncateDescription(
	description: string,
	maxLength: number = 160
): string {
	if (description.length <= maxLength) return description;

	return description.slice(0, maxLength - 3) + "...";
}
