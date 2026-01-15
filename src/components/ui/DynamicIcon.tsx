import * as LucideIcons from "lucide-react";

interface DynamicIconProps {
	name: string;
	className?: string;
	size?: number;
}

/**
 * DynamicIcon - Renders a Lucide icon dynamically based on the icon name
 */
export const DynamicIcon = ({
	name,
	className,
	size = 24,
}: DynamicIconProps) => {
	// Get the icon component directly from Lucide
	const IconComponent = LucideIcons[
		name as keyof typeof LucideIcons
	] as React.ComponentType<{
		className?: string;
		size?: number;
	}>;

	// Fallback to a default icon if the specified icon is not found
	if (!IconComponent) {
		const FallbackIcon = LucideIcons.HelpCircle;
		return <FallbackIcon className={className} size={size} />;
	}

	return <IconComponent className={className} size={size} />;
};
