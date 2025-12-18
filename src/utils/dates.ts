/**
 * Format a date in a locale-friendly way
 */
export function formatDate(date: Date, lang: "es" | "en"): string {
	const formatter = new Intl.DateTimeFormat(lang === "es" ? "es-ES" : "en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return formatter.format(date);
}

/**
 * Format a date for datetime attribute
 */
export function formatDateISO(date: Date): string {
	return date.toISOString();
}

/**
 * Format a relative time (e.g., "2 days ago")
 */
export function formatRelativeTime(date: Date, lang: "es" | "en"): string {
	const now = new Date();
	const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

	const rtf = new Intl.RelativeTimeFormat(lang === "es" ? "es-ES" : "en-US", {
		numeric: "auto",
	});

	if (diffInSeconds < 60) {
		return rtf.format(-diffInSeconds, "second");
	} else if (diffInSeconds < 3600) {
		return rtf.format(-Math.floor(diffInSeconds / 60), "minute");
	} else if (diffInSeconds < 86400) {
		return rtf.format(-Math.floor(diffInSeconds / 3600), "hour");
	} else if (diffInSeconds < 2592000) {
		return rtf.format(-Math.floor(diffInSeconds / 86400), "day");
	} else if (diffInSeconds < 31536000) {
		return rtf.format(-Math.floor(diffInSeconds / 2592000), "month");
	} else {
		return rtf.format(-Math.floor(diffInSeconds / 31536000), "year");
	}
}
