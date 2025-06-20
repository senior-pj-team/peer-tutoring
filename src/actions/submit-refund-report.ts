'use server';

import { z } from "zod";
import { createClient } from "@/utils/supabase/server";
import { getUserSession } from "@/utils/get-user-session";
import { insertRefundReport } from "@/data/mutations/refund-report/insert-refund-report";
import { sendRefundEmail } from "./send-refund-email";

const schema = z.object({
    reason: z.string().min(1),
    description: z.string().optional(),
    type: z.enum(["refund", "report", "refund and report"]),
    ss_id: z.coerce.number(),
    session_id: z.coerce.number(),
});

export async function submitRefundOrReport(
    _: any,
    formData: FormData
): Promise<ActionResponseType<string>> {
    const supabase = await createClient();
    const user = await getUserSession();

    if (!user?.user_id) {
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
        session_id: formData.get("session_id"),
    });

    if (!parsed.success) {
        return {
            success: false,
            error: { message: "Invalid form submission." },
        };
    }

    const { reason, description, type, ss_id, session_id } = parsed.data;

    const insertResult = insertRefundReport(supabase,
        user.user_id,
        session_id,
        ss_id,
        reason,
        description ?? "",
        type
    )

    if(!insertResult) return {
        success: false,
        error: {message: "Something went wrong"}
    }
    return {
        success: true,
        data: type+ " has been submitted"
    }
}