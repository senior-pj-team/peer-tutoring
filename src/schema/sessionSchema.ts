import { z } from "zod";
const timeRegex = /^\d{2}:\d{2}$/;
export const sessionSchema = z
	.object({
		school: z.string(),
		major: z.string(),
		courseCode: z.string(),
		courseName: z.string(),
		sessionName: z.string().min(1, "Session name is required"),
		description: z.string().min(1, "Description is required"),
		location: z.string().min(1, "Location is required"),
		requirements: z.string().refine(
			(html) => {
				const text = html
					.replace(/<[^>]*>/g, "")
					.replace(/&nbsp;|&#160;/g, "")
					.replace(/\s+/g, "")
					.trim();
				return text.length > 0;
			},
			{
				message: "Requirements must not be empty",
			},
		),
		date: z.date({
			required_error: "Schedule date is required.",
		}),
		startTime: z.string().regex(timeRegex, "Invalid input"),
		endTime: z.string().regex(timeRegex, "Invalid input"),
		maxStudents: z.coerce.number().min(1, "At least one student is required"),
		paid: z.boolean(),
		amount: z.coerce.number().min(1, "Amount must be non-negative"),
		image: z.string(),
	})
	.superRefine(({ startTime, endTime }, ctx) => {
		const [sh, sm] = startTime.split(":").map(Number);
		const [eh, em] = endTime.split(":").map(Number);

		const startMinutes = sh * 60 + sm;
		const endMinutes = eh * 60 + em;

		if (endMinutes <= startMinutes) {
			ctx.addIssue({
				path: ["endTime"],
				code: z.ZodIssueCode.custom,
				message: "End time must be after start time",
			});
		}
	});

export type SessionSchemaT = z.infer<typeof sessionSchema>;
