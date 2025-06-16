"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import GeneralSessionCard from "../../shared/sessions/general-session-card";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useInfiniteSessions } from "@/hooks/use-infinite-sessions";


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
      className=" text-xs flex items-center gap-1 px-4 py-2 rounded-sm text-gray-700 text-sm font-medium transition hover:bg-gray-100"
      aria-label="Previous Page"
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">Previous</span>
    </button>

    <span className="text-gray-800 font-medium">{currentPage + 1}</span>

    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={disableForward}
      className=" text-xs flex items-center gap-1 px-4 py-2 rounded-sm text-gray-700 text-sm font-medium transition hover:bg-gray-100"
      aria-label="Next Page"
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon className="w-4 h-4" />
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
  } =useInfiniteSessions({tutor_id})

  const handlePageChange = async (page: number) => {
    if (page < 0) return;
    if (page >= totalPagesFetched) {
      await fetchNextPage();
      setTotalPagesFetched((prev) => prev + 1);
    }
    setCurrentPage(page);
  }

  const currentSessions = sessions?.pages?.[currentPage]?.rows ?? [];
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
        <div className="h-[33vh] flex items-center justify-center text-gray-500 text-lg">
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
