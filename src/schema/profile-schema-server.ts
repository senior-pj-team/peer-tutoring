import { z } from "zod";
export const profileSchemaServer = z.object({
	profile_url: z
		.instanceof(File)
		.refine((file) => file.size > 0, {
			message: "Image file is required",
		})
		.nullable(),
	username: z
		.string()
		.min(3, "Username must be at least 3 characters long")
		.max(20, "Username must be less then 20 characters long"),
	email: z.string().email("Invalid email address"),
	school: z.string().max(100, "School must be less then 100 characters long"),
	major: z.string().max(100, "Major must be less then 100 characters long"),
	year: z.coerce.number({ message: "Year is invalid" }).optional(),
	phone_number: z.string().or(z.literal("")),
	social_links: z
		.array(
			z.object({
				value: z.string().url("Invalid url"),
			}),
		)
		.max(5, "you cannot add more than 5 links"),
});

export const bankInfoSchema = z
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

export type TProfileSchemaServer = z.infer<typeof profileSchemaServer>;
export type TBankInfoSchema = z.infer<typeof bankInfoSchema>;
