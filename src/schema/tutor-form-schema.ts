import { z } from "zod";

export const tutorFormSchema = z.object({
  school: z.string().max(100, "School must be less then 100 characters long"),
  major: z.string().max(100, "Major must be less then 100 characters long"),
  year: z.string().max(10, "Year is invalid"),
  phone_number: z.string().or(z.literal("")),

  bankName: z
    .string()
    .min(1, "Bank name is required")
    .max(100, "Bank name must be less then 100 characters long"),
  accountName: z
    .string()
    .min(1, "Bank account name is required")
    .max(100, "Bank account name must be less then 100 characters long"),
  accountNumber: z
    .string()
    .min(1, "Bank account number is required")
    .max(100, "Bank account number must be less then 100 characters long"),
  studentIdPhoto: z
    .string()
    .min(1, "Must capture a photo of you with your ID card")
    .regex(
      /^data:image\/(png|jpeg);base64,[A-Za-z0-9+/=]+$/,
      "Invalid image format"
    ),
  isChecked: z
    .boolean()
    .refine((val) => val === true),
  type: z.enum(["student_refund", "tutor_transfer", "refund_transfer"]),
});

export type tutorFormSchemaT = z.infer<typeof tutorFormSchema>;
