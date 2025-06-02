import React from "react";
import { PaginationWithLinks } from "../../shared/filter/pagination-with-links";
import { getSessionsMatView } from "@/data/queries/sessions/get-sessions-mat-view";
import GeneralSessionCard from "../../shared/sessions/general-session-card";

const TutorSessionsSection = async ({
  supabase,
  tutor_id,
}: {
  supabase: TSupabaseClient;
  tutor_id: string;
}) => {
  let sessions: TSessionsMatViewResult | null = null;
  sessions = await getSessionsMatView(supabase, { tutorId: tutor_id });
  if(!sessions?.rows)return <></>
  return (
    <>
      {sessions && (
        <div className="grid gap-6 my-4 grid-cols-[repeat(auto-fit,minmax(350px,1fr))]">
          {sessions.rows.map((session, index) => (
            <GeneralSessionCard content={session} page="browse"/>
          ))}
        </div>
      )}
      <PaginationWithLinks
          page={parseInt("1")}
          pageSize={6}
          totalCount={17}
          scroll={false}
        />
    </>
  );
};

export default TutorSessionsSection;
