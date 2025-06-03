"use client";

import React, { useState, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getSessionsMatView } from "@/data/queries/sessions/get-sessions-mat-view";
import GeneralSessionCard from "../../shared/sessions/general-session-card";
import { createClient } from "@/utils/supabase/client";

const LIMIT = 4;

const fetchReviews = async ({
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
  });
  return data;
};

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isNextDisabled: boolean;
};

const PaginationControls = ({
  currentPage,
  totalPages,
  onPageChange,
  isNextDisabled,
}: PaginationProps) => {
  return (
    <div className="flex items-center justify-center gap-6 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="px-5 py-2 rounded bg-gray-100 text-gray-700 font-semibold transition hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      <span className="text-gray-800 font-medium">
        Page {currentPage + 1} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isNextDisabled}
        className="px-5 py-2 rounded bg-gray-100 text-gray-700 font-semibold transition hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

const TutorSessionsSection = ({ tutor_id }: { tutor_id: string }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const {
    data: sessions,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["reviews-and-ratings", tutor_id],
    queryFn: ({ pageParam }) => fetchReviews({ pageParam, tutor_id }),
    getNextPageParam: (lastPage, pages) =>
      lastPage?.rows?.length === LIMIT ? pages.length * LIMIT : undefined,
    initialPageParam: 0,
  });

  useEffect(() => {
    if (
      currentPage > 0 &&
      sessions &&
      currentPage >= sessions.pages.length &&
      hasNextPage
    ) {
      fetchNextPage();
    }
  }, [currentPage, sessions, hasNextPage, fetchNextPage]);

  const currentSessions = sessions?.pages?.[currentPage]?.rows ?? [];
  const totalPages = sessions ? sessions.pages.length + (hasNextPage ? 1 : 0) : 1;

  return (
    <section>
      {currentSessions.length > 0 ? (
        <div className="grid gap-6 my-4 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
          {currentSessions.map((session: any, index: number) => (
            <GeneralSessionCard key={index} content={session} page="browse" />
          ))}
        </div>
      ) : (
        <div className="h-[20rem] flex items-center justify-center text-gray-500 text-lg">
          No sessions available.
        </div>
      )}

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          if (page >= 0 && page < totalPages) setCurrentPage(page);
        }}
        isNextDisabled={!hasNextPage && currentPage >= totalPages - 1}
      />
    </section>
  );
};

export default TutorSessionsSection;
