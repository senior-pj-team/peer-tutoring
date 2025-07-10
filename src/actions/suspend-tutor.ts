"use server";

import { updateUser } from "@/data/mutations/user/update-user";
import { createClient } from "@/utils/supabase/server";
import { addDays } from "date-fns";

export const suspendTutor = async (
  tutor_id: string,
  days: number
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

  if (!updateResult) {
    return {
      success: false,
      error: { message: "Something went wrong!" },
    };
  }
   //enqueue job
  const message = {
    topic: "unsuspend tutor",
    tutor_id,
  };
  const delay_seconds = days * 3600 * 24;
  const queue_name = "unsuspend_jobs";

  const { error: enqueueError } = await supabase.rpc("pgmq_enqueue", {
    queue_name,
    message,
    delay_seconds: 0,
  });

  if (enqueueError) {
    return {
      success: false,
      error: {
        message: "Tutor suspended but job enqueue failed.",
      },
    };
  }

  return { success: true };
};
