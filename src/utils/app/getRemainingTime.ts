//input date and startTime in string
//output remaining time in string
export const getRemainingTime = (date: string | undefined, startTime: string | undefined) => {
	const now = new Date();
	const startDateTime = new Date(`${date} ${startTime}`);

	if(!date || ! startTime){
		return " - "
	}

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