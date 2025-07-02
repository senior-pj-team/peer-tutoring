import SessionForm from "@/components/app/shared/sessions/session-form";
import { getSessionsbyId } from "@/data/queries/sessions/get-sessions-by-Id";
import { createClient } from "@/utils/supabase/server";
import GeneralError from "@/components/app/shared/error";
import React from "react";
import { getEnrollmentCount } from "@/data/queries/student-session/get-enrollment-count";

const page = async ({ params }: { params: { session_id: string } }) => {
  const { session_id } =await params;
  const supabase = await createClient();
  const session = await getSessionsbyId(supabase, { session_id: Number(session_id) });

  if (!session || session.length === 0) return <GeneralError />;

  const enrollments = await getEnrollmentCount(supabase, { session_id: Number(session_id) });

  return <SessionForm data={session[0]} toCancel={(enrollments ?? 1) < 0} isEdit={true} />;
};

export default page;
