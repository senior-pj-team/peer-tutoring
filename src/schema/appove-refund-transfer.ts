import { z } from "zod";
export const approveRefundTransferSchema = z.object({
	receipt: z.instanceof(File).refine((file) => file.size > 0, {
		message: "Receipt file must be provided",
	}),
});
export type TApproveRefundTransferSchema = z.infer<
	typeof approveRefundTransferSchema
>;
