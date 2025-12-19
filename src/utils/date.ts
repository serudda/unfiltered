/**
 * Formats a date as relative time (e.g., "4 years ago", "hace 1 día")
 * Uses native Intl.RelativeTimeFormat
 */
export function getRelativeTime(
	date: Date,
	locale: "es" | "en" = "en"
): string {
	const now = new Date();
	const diffInMs = now.getTime() - date.getTime();
	const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

	const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "always" });

	// Determine the best unit
	if (diffInDays >= 365) {
		const years = Math.floor(diffInDays / 365);
		return rtf.format(-years, "year");
	} else if (diffInDays >= 30) {
		const months = Math.floor(diffInDays / 30);
		return rtf.format(-months, "month");
	} else if (diffInDays >= 1) {
		return rtf.format(-diffInDays, "day");
	} else {
		return locale === "es" ? "hoy" : "today";
	}
}
