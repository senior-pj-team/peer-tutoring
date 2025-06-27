import z from "zod";

export const tutorProfileSchema = z
	.object({
		bank_name: z
			.string()
			.min(1, "Bank name is required")
			.max(100, "Bank name must be less then 100 characters long"),
		other_bank: z
			.string()
			.max(100, "Bank name must be less then 100 characters long"),
		account_name: z
			.string()
			.min(1, "Bank account name is required")
			.max(100, "Bank account name must be less then 100 characters long"),
		account_type: z.enum([
			"student_refund",
			"tutor_transfer",
			"refund_transfer",
		]),
		account_number: z
			.string()
			.min(1, "Bank account number is required")
			.max(100, "Bank account number must be less then 100 characters long"),
		bio_highlight: z.string().max(1500, "bio highlight is too long"),
		biography: z.string().max(10000, "bio highlight is too long"),
	})
	.superRefine((data, ctx) => {
		if (data.bank_name === "Other") {
			if (!data.other_bank || data.other_bank.trim().length === 0) {
				ctx.addIssue({
					path: ["other_bank"],
					code: z.ZodIssueCode.custom,
					message: "Bank name is required",
				});
			}
		}
	})
	.transform((data) => ({
		...data,
		bank_name: data.bank_name === "Other" ? data.other_bank : data.bank_name,
	}));

export type TTutorProfileSchema = z.infer<typeof tutorProfileSchema>;
