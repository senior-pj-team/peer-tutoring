export const formatTime = (timestampzString: string | null) => {
		if(!timestampzString) return "NA"
		const date = new Date(timestampzString)
		const hours = String(date.getHours()).padStart(2, "0");
		const minutes = String(date.getMinutes()).padStart(2, "0");
		return `${hours}:${minutes}`;
};