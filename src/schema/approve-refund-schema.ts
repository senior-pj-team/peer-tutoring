import { z } from "zod";
export const approveRefundSchema = z.object({
  receipt: z.instanceof(File).refine((file) => file.size > 0, {
    message: "Receipt file must be provided",
  }),
});
export type TApproveRefundInput = z.infer<typeof approveRefundSchema>;