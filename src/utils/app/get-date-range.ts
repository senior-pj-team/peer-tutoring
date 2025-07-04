import { endOfDay, format, isSameDay, parseISO, startOfDay } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { DateRange } from "react-day-picker";

export function getDateRange(dateRange: DateRange | undefined): {
	start_date: string | undefined;
	end_date: string | undefined;
} {
	if (!dateRange || !dateRange.from || !dateRange.to)
		return {
			start_date: undefined,
			end_date: undefined,
		};
	const rawFrom = dateRange.from;
	const rawTo = dateRange.to;

	const dayStart = startOfDay(rawFrom);

	const dayEnd = isSameDay(rawFrom, rawTo)
		? endOfDay(rawFrom)
		: endOfDay(rawTo);

	const utcStart = toZonedTime(dayStart, "Asia/Bangkok");
	const utcEnd = toZonedTime(dayEnd, "Asia/Bangkok");

	const start_date = format(utcStart, "yyyy-MM-dd'T'HH:mm:ssXXX");
	const end_date = format(utcEnd, "yyyy-MM-dd'T'HH:mm:ssXXX");

	return { start_date, end_date };
}

export function getDateRangeWithOptionalEnd(dateRange: DateRange | undefined): {
	start_date: string | undefined;
	end_date: string | undefined;
} {
	if (!dateRange || !dateRange.to)
		return {
			start_date: undefined,
			end_date: undefined,
		};
	const rawFrom = dateRange.from;
	const rawTo = dateRange.to;

	const dayStart = rawFrom ? startOfDay(rawFrom) : undefined;

	const dayEnd = endOfDay(rawTo);

	const utcStart = dayStart ? toZonedTime(dayStart, "Asia/Bangkok") : undefined;
	const utcEnd = toZonedTime(dayEnd, "Asia/Bangkok");

	const start_date = utcStart
		? format(utcStart, "yyyy-MM-dd'T'HH:mm:ssXXX")
		: undefined;
	const end_date = format(utcEnd, "yyyy-MM-dd'T'HH:mm:ssXXX");

	return { start_date, end_date };
}
