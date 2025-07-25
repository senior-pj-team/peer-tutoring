export const getRemainingTime = (time: string | undefined | null): string => {
	if (!time) return " - ";

	const now = new Date();
	const startDateTime = new Date(time);

	if (isNaN(startDateTime.getTime())) {
		return "Invalid time";
	}

	const diffMs = startDateTime.getTime() - now.getTime();

	if (diffMs <= 0) {
		return "Started";
	}

	const diffMinutes = Math.floor(diffMs / (1000 * 60));
	const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
	const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

	if (diffDays > 0) {
		return `${diffDays} day${diffDays > 1 ? "s" : ""}`;
	} else if (diffHours > 0) {
		return `${diffHours} hour${diffHours > 1 ? "s" : ""}`;
	} else if (diffMinutes > 0) {
		return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""}`;
	} else {
		return "Soon";
	}
};
