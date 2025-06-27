"use server";

import { updateSession } from "@/data/mutations/sessions/update-sessions";
import { getEnrollmentCount } from "@/data/queries/student-session/get-enrollment-count";
import { getUserSession } from "@/utils/get-user-session";
import { createClient } from "@/utils/supabase/server";

export async function cancelSession(session_id: number):Promise<ActionResponseType<string>> {
  const user= await getUserSession();
  const supabase= await createClient()
  if(!user || !supabase){
    return {
        success: false,
        error: { message: "Something went wrong" }
    }
  }
  const enrollments= await getEnrollmentCount(supabase, {
    session_id
  })
  if((enrollments ?? 1) > 0){
    return {
        success: false,
        error: { message: "You cannot cancel sessions with enrollments anymore" }
    }
  }
  const updateResult= await updateSession(supabase, session_id, {status:'cancelled'})
  if(!updateResult){
    return {
        success: false,
        error: { message: "Something went wrong" }
    }
  }
  return {
    success: true,
  };
}