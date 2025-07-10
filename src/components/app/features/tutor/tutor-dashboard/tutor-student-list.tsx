'use client'

import { columns } from "@/app/(protected)/(tutor)/tutor-dashboard/students/columns";
import { DataTableServer } from "@/components/app/features/data-table/data-table-server";
import { PaginationState } from "@tanstack/react-table";
import { useStudentSessionJoinWithCount } from "@/hooks/use-student-session-join";
import { useSupabase } from "@/hooks/use-supabase";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { DebounceSearchBar } from "@/components/app/shared/debounce-search-bar";
import { Search } from "lucide-react";
import { DatePickerWithRange } from "@/components/app/shared/date-range-picker";
import { subDays } from "date-fns";

const initialColumns = {
    id: true,
    stripe_id: false,
    session: true,
    student: true,
    tutor: false,
    amount_from_student: false,
    amount_to_tutor: false,
    amount_from_stripe: true,
    profit: false,
    status: true,
    enrolled_at: true,
    refunded_at: false,
    held_until: false,
};

export default function TutorStudentList({tutor_id}: {tutor_id: string | undefined}) {
    const supabase = useSupabase();
    const [search, setSearch] = useState("");
    const [pagination, setPagination] = useState<PaginationState>({
            pageIndex: 0,
            pageSize: 15,
        });
    const [dateFilter, setDateFilter] = useState<DateRange | undefined>(() => {
        const today = new Date();
        return { 
            from: subDays(today, 30), to: today
        };
    });

    const {
            data: queryData,
            isLoading,
            isError,
            isPlaceholderData,
            isFetching,
        } = useStudentSessionJoinWithCount({
            key: "tutor_students",
            supabase,
            page: pagination.pageIndex,
            limit: pagination.pageSize,
            columns:
                "session_id,session_name,student_session_id, enrolled_at,refunded_at,student_session_status,amount_from_stripe,amount_from_student,amount_to_tutor,stripe_payment_intent_id,payment_evidence, paid_out_at, held_until, tutor_id, tutor_username, tutor_email, tutor_profile_url, student_id, student_username, student_email, student_profile_url",
            search,
            status: ["enrolled", "paid", "refunded", "completed"],
            dateFilterCol: "enrolled_at",
            dateFilter: dateFilter,
            tutor_id: tutor_id
        });
    return (
    <div className="container mx-auto px-4 lg:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4 py-4">

            <div className="relative flex-1 min-w-[250px] max-w-md">
                <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                    <Search className="text-gray-500" size={20} />
                </div>
                <DebounceSearchBar
                    type="text"
                    placeholder="Search with tutor, student, or session name..."
                    className="w-full rounded-md border min-h-10 h-auto px-3 pl-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    query={search}
                    setQuery={setSearch}
                />
            </div>

            <div className="min-w-[250px]">
                <DatePickerWithRange date={dateFilter} setDate={setDateFilter} />
            </div>
        </div>

        <DataTableServer
            initialColumns={initialColumns}
            isFetching={isFetching}
            isPlaceholderData={isPlaceholderData}
            isLoading={isLoading}
            isError={isError}
            data={queryData?.data}
            columns={columns}
            pagination={pagination}
            setPagination={setPagination}
            count={queryData?.count}
        />
    </div>
);
}
