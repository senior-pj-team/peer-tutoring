export const getDateWithTime = (date: Date, time: string): Date => {
	const [hours, minutes] = time.split(":").map(Number);
	const dateTime = new Date(date);
	dateTime.setHours(hours, minutes, 0, 0);
	return dateTime;
};

export const parseTimeRange = (
	start_time: string | null,
	end_time: string | null,
) => {
	if (!start_time || !end_time) {
		return {
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

export const getRemainingTime = (date: string, startTime: string) => {
	const now = new Date();
	const startDateTime = new Date(`${date} ${startTime}`);

	console.log("start date time: ", startDateTime);

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
