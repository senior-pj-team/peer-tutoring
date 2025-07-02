"use server";

import { z } from "zod";
import { createClient } from "@/utils/supabase/server";
import { getUserSession } from "@/utils/get-user-session";
import { insertRefundReport } from "@/data/mutations/refund-report/insert-refund-report";
import { getRefundReport } from "@/data/queries/refund-and-report/get-refund-report";
import { getStudentSessionJoinById } from "@/data/queries/student-session/get-student-session-join-By-Id";
import { differenceInHours, parseISO } from "date-fns";

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
			error: { message: "Something went wrong ❌" },
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

	const existingReq = (await getRefundReport(supabase, { ss_id: ss_id })) ?? [];
	if (existingReq.length > 0) {
		return {
			success: false,
			error: { message: "You already requested a refund for this session" },
		};
	}

	const ss = await getStudentSessionJoinById(supabase, ss_id);
	if (!ss) {
		return {
			success: false,
			error: { message: "Something went wrong" },
		};
	}

	const startTime = parseISO(ss.sessions.start_time);
	const now = new Date();

	if (type === "refund") {
		const hoursUntilStart = differenceInHours(startTime, now);
		if (hoursUntilStart < 24) {
			return {
				success: false,
				error: {
					message:
						"Refund failed: Session is about to start in less than 24 hours ❌",
				},
			};
		}
	}

	if (type === "refund and report") {
		if (ss.sessions.status === "archived") {
			return {
				success: false,
				error: {
					message:
						"Refund now allowed: This session has been paid and archived ❌",
				},
			};
		}
	}

	const insertResult = await insertRefundReport(
		supabase,
		ss_id,
		reason,
		description ?? "",
		type,
	);

	if (!insertResult) {
		return {
			success: false,
			error: { message: "Something went wrong" },
		};
	}

	return {
		success: true,
		data: `${type} has been submitted ✅`,
	};
}
