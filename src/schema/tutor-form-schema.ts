import { z } from "zod";

export const tutorFormSchema = z.object({
  school: z.string().min(1, "Required"),
  major: z.string().min(1, "Required"),
  year: z.string().min(1, "Required"),
  phone_number: z.string().min(1, "Required"),

  bankName: z.string().min(1, "Required"),
  accountName: z.string().min(1, "Required"),
  accountNumber: z.string().min(10, "Must be 10 digits"),
  studentIdPhoto: z
  .string()
  .min(1, "Must capture a photo of you with your ID card")
  .regex(
    /^data:image\/(png|jpeg);base64,[A-Za-z0-9+/=]+$/,
    "Invalid image format"
  )
});

export type tutorFormSchemaT = z.infer<typeof tutorFormSchema>;