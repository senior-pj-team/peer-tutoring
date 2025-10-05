import { differenceInMilliseconds } from "date-fns";

export const getTimeDifference = (time: string | undefined | null): string => {
	if (!time) return "";
	const diffMs = differenceInMilliseconds(time, new Date());
	// past event
	if (diffMs <= 0) {
		const diffMinutes = Math.floor(Math.abs(diffMs) / (1000 * 60));
		const diffHours = Math.floor(Math.abs(diffMs) / (1000 * 60 * 60));
		const diffDays = Math.floor(Math.abs(diffMs) / (1000 * 60 * 60 * 24));

		if (diffDays > 0) {
			return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
		} else if (diffHours > 0) {
			return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
		} else if (diffMinutes > 0) {
			return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
		} else {
			return "Just now";
		}
	}

	// future event
	const diffMinutes = Math.floor(diffMs / (1000 * 60));
	const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
	const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

	if (diffDays > 0) {
		return `in ${diffDays} day${diffDays > 1 ? "s" : ""}`;
	} else if (diffHours > 0) {
		return `in ${diffHours} hour${diffHours > 1 ? "s" : ""}`;
	} else if (diffMinutes > 0) {
		return `in ${diffMinutes} minute${diffMinutes > 1 ? "s" : ""}`;
	} else {
		return "Soon";
	}
};
