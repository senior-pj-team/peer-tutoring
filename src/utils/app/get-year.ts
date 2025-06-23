export function getYear(year: string | null) {
	switch (year) {
		case "1":
			return "First Year";
		case "2":
			return "Second Year";
		case "3":
			return "Third Year";
		case "4":
			return "Fourth Year";
		default:
			return "NA";
	}
}
