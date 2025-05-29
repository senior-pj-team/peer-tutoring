export const getDateWithTime = (date: Date, time: string): Date => {
	const [hours, minutes] = time.split(":").map(Number);
	const dateTime = new Date(date);
	dateTime.setHours(hours, minutes, 0, 0);
	return dateTime;
};


//from timestampz string to date string and start time + end time string
export const parseTimeRange = (
	start_time: string | null,
	end_time: string | null,
) => {
	return {
		date: formatTime(start_time),
		start_time: formatTime(start_time),
		end_time: formatTime(end_time),
	};
};

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

export const formatTime = (timestampzString: string | null) => {
		if(!timestampzString) return "NA"
		const date = new Date(timestampzString)
		const hours = String(date.getHours()).padStart(2, "0");
		const minutes = String(date.getMinutes()).padStart(2, "0");
		return `${hours}:${minutes}`;
};

export const formatDate= (timestampzString: string | null)=>{
	if(!timestampzString) return "NA"
	const date = new Date(timestampzString);
	return new Date(date.getFullYear(), date.getMonth(), date.getDate()).toDateString()?? "NA"
}