import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";

export const profileSchema = z.object({
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
	phone_number: z
		.string()
		.refine(isValidPhoneNumber, { message: "Phone number is invalid" })
		.or(z.literal("")),
	social_links: z
		.array(
			z.object({
				value: z.string().url("Invalid url"),
			}),
		)
		.max(5, "you cannot add more than 5 links"),
});

export type TProfileSchema = z.infer<typeof profileSchema>;
