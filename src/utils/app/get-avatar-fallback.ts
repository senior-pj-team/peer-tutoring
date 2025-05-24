export function getAvatarFallback(name: string) {
	if (name) {
		const words = name.trim().split(/\s+/);
		const initials = words
			.slice(0, 2)
			.map((word) => word[0].toUpperCase())
			.join("");
		return initials;
	}
	return "PP";
}
