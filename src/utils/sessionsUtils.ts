export const getDateWithTime = (date: Date, time: string): Date => {
		const [hours, minutes] = time.split(":").map(Number);
		const dateTime = new Date(date);
		dateTime.setHours(hours, minutes, 0, 0);
		return dateTime;
};