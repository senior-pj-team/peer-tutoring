export function getTimeAgo(date: string | Date) {
	const now = new Date();
	const past = new Date(date);
	const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

	const intervals: [number, string][] = [
		[60, "second"],
		[60 * 60, "minute"],
		[60 * 60 * 24, "hour"],
		[60 * 60 * 24 * 7, "day"],
		[60 * 60 * 24 * 30, "week"],
		[60 * 60 * 24 * 365, "month"],
		[Infinity, "year"],
	];

	for (let i = 0; i < intervals.length; i++) {
		const [secondsPerUnit, label] = intervals[i];
		if (seconds < secondsPerUnit) {
			const value = Math.floor(seconds / (intervals[i - 1]?.[0] || 1)) || 0;
			return `${value} ${label}${value !== 1 ? "s" : ""} ago`;
		}
	}

	return "just now";
}
