"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getSessionsMatView } from "@/data/queries/sessions/get-sessions-mat-view";
import { createClient } from "@/utils/supabase/client";
import GeneralSessionCard from "../../shared/sessions/general-session-card";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const LIMIT = 4;

const fetchSessions = async ({
  pageParam = 0,
  tutor_id,
}: {
  pageParam: number;
  tutor_id: string;
}) => {
  const supabase = createClient();
  const data = await getSessionsMatView(supabase, {
    tutorId: tutor_id,
    offset: pageParam,
    limit: LIMIT,
  })
  if (!data) throw new Error("Server error");
  return data;
}

type PaginationProps = {
  currentPage: number;
  onPageChange: (page: number) => void;
  disableBack: boolean;
  disableForward: boolean;
};

const PaginationControls = ({
  currentPage,
  onPageChange,
  disableBack,
  disableForward,
}: PaginationProps) => (
  <div className="flex items-center justify-center gap-6 mt-6">
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={disableBack}
      className="flex items-center gap-1 px-4 py-2 rounded-sm bg-gray-100 text-gray-700 text-sm font-medium transition hover:bg-gray-200"
      aria-label="Previous Page"
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">Previous</span>
    </button>

    <span className="text-gray-800 font-medium">Page {currentPage + 1}</span>

    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={disableForward}
      className="flex items-center gap-1 px-4 py-2 rounded-sm bg-gray-100 text-gray-700 text-sm font-medium transition hover:bg-gray-200"
      aria-label="Next Page"
    >
      <ChevronRightIcon className="w-4 h-4" />
      <span className="hidden sm:block">Next</span>
    </button>
  </div>
);

const TutorSessionsSection = ({ tutor_id }: { tutor_id: string }) => {
  
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPagesFetched, setTotalPagesFetched] = useState(1);

  const {
    data: sessions,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["sessions", tutor_id],
    queryFn: ({ pageParam }) => fetchSessions({ pageParam, tutor_id }),
    getNextPageParam: (lastPage, pages) =>
      lastPage && lastPage.rows && lastPage.rows.length === LIMIT
        ? pages.length * LIMIT
        : undefined,
    initialPageParam: 0,
  });

  const handlePageChange = async (page: number) => {
      if (page < 0) return;
      if (page >= totalPagesFetched) {
        await fetchNextPage();
        setTotalPagesFetched((prev) => prev + 1);
      }
      setCurrentPage(page);
    }

  const currentSessions= sessions?.pages?.[currentPage]?.rows ?? [];
  const disableBack = currentPage === 0;
  const disableForward = !hasNextPage && currentPage >= totalPagesFetched - 1;

  return (
    <section>
      {currentSessions.length > 0 ? (
        <div className="flex flex-wrap gap-6 my-4 justify-start">
          {currentSessions.map((session: any, index: number) => (
            <div
              key={index}
              className="w-full sm:w-[48%] lg:w-[23%] max-w-[300px] flex-shrink-0"
            >
              <GeneralSessionCard content={session} page="browse" />
            </div>
          ))}
        </div>
      ) : (
        <div className="h-[20rem] flex items-center justify-center text-gray-500 text-lg">
          No sessions available.
        </div>
      )}

      <PaginationControls
        currentPage={currentPage}
        onPageChange={handlePageChange}
        disableBack={disableBack}
        disableForward={disableForward || isFetchingNextPage}
      />
    </section>
  );
};

export default TutorSessionsSection;
