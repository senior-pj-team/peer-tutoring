"use server";

import { z } from "zod";
import { createClient } from "@/utils/supabase/server";
import { getUserSession } from "@/utils/get-user-session";
import { insertRefundReport } from "@/data/mutations/refund-report/insert-refund-report";
import { updateStudentSessionStatus } from "@/data/mutations/student-session/update-status";

const schema = z.object({
<<<<<<< HEAD
    reason: z.string().min(1),
    description: z.string().optional(),
    type: z.enum(["refund", "report", "refund and report"]),
    ss_id: z.coerce.number(),
=======
	reason: z.string().min(1),
	description: z.string().optional(),
	type: z.enum(["refund", "report", "refund and report"]),
	ss_id: z.coerce.number(),
>>>>>>> main
});

export async function submitRefundOrReport(
	_: any,
	formData: FormData,
): Promise<ActionResponseType<string>> {
	const supabase = await createClient();
	const user = await getUserSession();

<<<<<<< HEAD
    if (!user) {
        return {
            success: false,
            error: { message: "You must be logged in to submit this form." },
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
            error: { message: "Invalid form submission." },
        };
    }
    
    const { reason, description, type, ss_id} = parsed.data;

    const insertResult = insertRefundReport(supabase,
        ss_id,
        reason,
        description ?? "",
        type
    )

    if(!insertResult) return {
        success: false,
        error: {message: "Something went wrong"}
    }

    const updateResult= updateStudentSessionStatus(supabase, {
      student_session_id: ss_id,
      ss_status: "pending_refund",
    });

    if(!updateResult) return {
        success: false,
        error: {message: "Something went wrong"}
    } 
    
    return {
        success: true,
        data: type+ " has been submitted"
    }
}
=======
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
>>>>>>> main
