"use client";

import React, { useMemo, useState } from "react";
import SessionCard from "../../shared/sessions/session-card";
import { useSupabase } from "@/hooks/use-supabase";
import { PaginationControls } from "../../shared/paginition-controls";
import { useStudentSessionViewWithCount } from "@/hooks/use-student-session-join";



const StudentSessionList = ({ student_id }: { student_id: string }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const supabase = useSupabase();

  const {
    data: sessions,
    status,
    isError,
  } = useStudentSessionViewWithCount({
    key: "student_sessions",
    supabase,
    page: currentPage,
    limit: 8,
    student_id,
  });

  const currentSessions = sessions?.data ?? [];
  const totalSessions = sessions?.count ?? 0;

  const disableBack = useMemo(() => currentPage === 0, [currentPage]);

  const totalPages = Math.ceil( (totalSessions ?? 0) / 8);
  const disableForward = useMemo(
    () => currentPage >= totalPages-1, //currentPage starts fromm 0
    [currentPage, totalPages]
  );
  
  return (
    <section>
      {isError || !currentSessions ? (
        <div className="h-[33vh] flex items-center justify-center text-red text-lg">
          Failed to load more sessions. Please try again.
        </div>
      ) : currentSessions.length > 0 ? (
        <div className="flex flex-wrap gap-6 my-4 justify-start">
          {currentSessions.map(
            (session: TStudentSessionViewResult, index: number) => (
              <div
                key={index}
                className="w-full sm:w-[48%] lg:w-[23%] max-w-[300px] flex-shrink-0"
              >
                <SessionCard page="browse" student_session={session} />
              </div>
            )
          )}
        </div>
      ) : status === "pending" ? (
        <div className="h-[33vh] flex items-center justify-center text-gray-400 text-lg">
          Loading sessions...
        </div>
      ) : (
        <div className="h-[33vh] flex items-center justify-center text-gray-500 text-lg">
          No sessions to show.
        </div>
      )}

    <PaginationControls
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      disableBack={disableBack}
      disableForward={disableForward}
    />

    </section>
  );
};

export default StudentSessionList;
