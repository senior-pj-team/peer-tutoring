"use server";

import { updateRefundReport } from "@/data/mutations/refund-report/update-refund-report";
import { uploadImage } from "@/data/mutations/image-bucket/upload-image";
import { updateStudentSession } from "@/data/mutations/student-session/update-student-session";
import {
	TApproveRefundTransferSchema,
	approveRefundTransferSchema,
} from "@/schema/appove-refund-transfer";
import { createClient } from "@/utils/supabase/server";

export async function approveRefund(
	ss_id: number,
	refund_report_id: number,
	rawValues: TApproveRefundTransferSchema,
): Promise<ActionResponseType<string>> {
	const result = approveRefundTransferSchema.safeParse(rawValues);
	if (!result.success)
		return {
			success: false,
			error: { message: "Validation error" },
		};
	const values = result.data;
	const supabase = await createClient();

	let uploadedUrl: string | null = null;
	if (values.receipt) {
		uploadedUrl = await uploadImage(supabase, {
			image: values.receipt,
			path: "receipts/",
		});
		if (!uploadedUrl) {
			return {
				success: false,
				error: { message: "Failed to upload receipt" },
			};
		}
	}

	const updateSSResult = await updateStudentSession(supabase, [ss_id], {
		status: "refunded",
		refunded_at: new Date().toISOString(),
	});

	if (!updateSSResult) {
		return {
			success: false,
			error: { message: "Something went wrong!" },
		};
	}

	const updateRRResult = await updateRefundReport(
		supabase,
		{
			status: "approved",
			receipt: uploadedUrl,
			processed_at: new Date().toISOString(),
		},
		{ id: refund_report_id },
	);

	if (!updateRRResult) {
		return {
			success: false,
			error: { message: "Something went wrong! 2" },
		};
	}

	return {
		success: true,
	};
}
