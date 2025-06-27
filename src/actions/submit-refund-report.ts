"use server";

import { z } from "zod";
import { createClient } from "@/utils/supabase/server";
import { getUserSession } from "@/utils/get-user-session";
import { insertRefundReport } from "@/data/mutations/refund-report/insert-refund-report";
import { getRefundReport } from "@/data/queries/refund-and-report/get-refund-report";

const schema = z.object({
	reason: z.string().min(1),
	description: z.string().optional(),
	type: z.enum(["refund", "report", "refund and report"]),
	ss_id: z.coerce.number(),
});

export async function submitRefundOrReport(
	_: any,
	formData: FormData,
): Promise<ActionResponseType<string>> {
	const supabase = await createClient();
	const user = await getUserSession();

	if (!user) {
		return {
			success: false,
			error: { message: "Somemthing went wrong ❌" },
		};
	}

	const parsed = schema.safeParse({
		reason: formData.get("reason"),
		description: formData.get("description"),
		type: formData.get("type"),
		ss_id: formData.get("ss_id"),
	});

	if (!parsed.success) {
		return {
			success: false,
			error: { message: "Invalid input ❌" },
		};
	}

	const { reason, description, type, ss_id } = parsed.data;

	const existingReq =
		(await getRefundReport(supabase, { ss_id, student_id: user.user_id })) ??
		[];
	if (existingReq.length > 0) {
		return {
			success: false,
			error: { message: "You already requested a refund for  this session" },
		};
	}

	const insertResult = insertRefundReport(
		supabase,
		ss_id,
		reason,
		description ?? "",
		type,
	);

	if (!insertResult)
		return {
			success: false,
			error: { message: "Something went wrong" },
		};
	return {
		success: true,
		data: type + " has been submitted",
	};
}
