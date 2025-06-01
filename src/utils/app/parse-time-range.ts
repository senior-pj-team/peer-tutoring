export const parseTimeRange = (
	start_time: string | null,
	end_time: string | null,
): {
	date: Date | null;
	start_time: string | null;
	end_time: string | null;
} => {
	if (!start_time || !end_time) {
		return {
			date: null,
			start_time: null,
			end_time: null,
		};
	}
	const start = new Date(start_time);
	const end = new Date(end_time);

	const formatTime = (date: Date) => {
		const hours = String(date.getHours()).padStart(2, "0");
		const minutes = String(date.getMinutes()).padStart(2, "0");
		return `${hours}:${minutes}`;
	};

	return {
		date: new Date(start.getFullYear(), start.getMonth(), start.getDate()), // only date
		start_time: formatTime(start),
		end_time: formatTime(end),
	};
};
