"use server";

import { uploadImage } from "@/data/mutations/image-bucket/upload-image";
import { updateSession } from "@/data/mutations/sessions/update-sessions";
import { updateStudentSession } from "@/data/mutations/student-session/update-student-session";
import { getStudentSessionView } from "@/data/queries/student-session/get-student-session-view";
import {
	approveRefundTransferSchema,
	TApproveRefundTransferSchema,
} from "@/schema/appove-refund-transfer";
import { createClient } from "@/utils/supabase/server";

export async function transferTutor(
	session_id: number,
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

	const ss_data = await getStudentSessionView(supabase, {
		columns: "student_session_id, amount_to_tutor",
		session_id,
		status: ["enrolled", "completed"],
	});

	if (!ss_data || ss_data.length < 1) {
		return {
			success: false,
			error: { message: "Something went wrong!" },
		};
	}

	const { ss_ids, transferred_amount } = ss_data.reduce(
		(acc, ss) => {
			if (ss.student_session_id !== null) {
				acc.ss_ids.push(ss.student_session_id);
			}
			acc.transferred_amount += ss.amount_to_tutor ?? 0;
			return acc;
		},
		{ ss_ids: [] as number[], transferred_amount: 0 },
	);

	const [updateSessionResult, updateStudentSeessionResult] = await Promise.all([
		updateSession(supabase, session_id, {
			status: "archived",
			paid_out_at: new Date().toISOString(),
			transferred_amount,
			payment_evidence: uploadedUrl,
		}),
		updateStudentSession(supabase, ss_ids, {
			status: "paid",
		}),
	]);

	if (!updateSessionResult || !updateStudentSeessionResult) {
		return {
			success: false,
			error: { message: "Something went wrong!" },
		};
	}

	return {
		success: true,
	};
}
