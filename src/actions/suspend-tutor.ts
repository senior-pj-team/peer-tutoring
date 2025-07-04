"use server";

import { updateUser } from "@/data/mutations/user/update-user";
import { createClient } from "@/utils/supabase/server";
import { addDays } from "date-fns";

export const suspendTutor = async (
	tutor_id: string,
	days: number,
): Promise<ActionResponseType<string>> => {
	if (!tutor_id || !days)
		return {
			success: false,
			error: { message: "Invalid input" },
		};
	const supabase = await createClient();
	const updateResult = await updateUser(supabase, {
		user_id: tutor_id,
		updateObj: {
			tutor_status: "suspended",
			suspend_until: addDays(new Date().toISOString(), days),
		},
	});

	if (updateResult) {
		return {
			success: false,
			error: { message: "Something went wrong!" },
		};
	}
	// 2. Enqueue unsuspend job
	//   const jobPayload = {
	//     topic: "uplift suspended tutor",
	//     tutor_id,
	//   };

	//   const { error: jobError } = await supabase
	//     .from("jobs_queue")
	//     .insert({
	//       run_at: suspendedUntil,
	//       payload: jobPayload,
	//       status: "queued",
	//     });

	//   if (jobError) {
	//     console.error("Failed to enqueue job:", jobError.message);
	//     return { success: false, message: "Tutor suspended but job enqueue failed." };
	//   }

	return { success: true };
};
