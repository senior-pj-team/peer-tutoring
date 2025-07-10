"use client";

import { useState } from "react";
import { DataTableServer } from "../../data-table/data-table-server";
import { PaginationState } from "@tanstack/react-table";
import { useStudentSessionViewWithCount } from "@/hooks/use-student-session-join";
import { useSupabase } from "@/hooks/use-supabase";
import { columns } from "@/app/(protected)/(admin)/admin-dashboard/financial/transactions/columns";
import { Search, XCircle } from "lucide-react";
import { DebounceSearchBar } from "../../../shared/debounce-search-bar";
import { MultiSelect } from "@/components/ui/mutil-select";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "@/components/app/shared/date-range-picker";

const statuesList = [
	{ value: "pending_enroll", label: "pending enroll" },
	{ value: "pending_payment", label: "pending payment" },
	{ value: "expired_payment", label: "expired payment" },
	{ value: "failed_payment", label: "failed payment" },
	{ value: "enrolled", label: "enrolled" },
	{ value: "completed", label: "completed" },
	{ value: "refunded", label: "refunded" },
	{ value: "paid", label: "paid" },
];

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
export function TransactionList() {
	const supabase = useSupabase();
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 15,
	});
	const [search, setSearch] = useState<string>("");
	const [status, setStatus] = useState<TStudentSessionStatus[] | null>(null);
	const [dateFilterCol, setDateFilterCol] = useState<
		"enrolled_at" | "refunded_at" | "paid_out_at" | "none"
	>("none");
	const [dateFilter, setDateFilter] = useState<DateRange | undefined>(
		undefined,
	);

	const {
		data: queryData,
		isLoading,
		isError,
		isPlaceholderData,
		isFetching,
	} = useStudentSessionViewWithCount({
		key: "admin_trns",
		supabase,
		page: pagination.pageIndex,
		limit: pagination.pageSize,
		columns:
			"session_id,session_name,student_session_id,enrolled_at,refunded_at,student_session_status,amount_from_stripe,amount_from_student,amount_to_tutor,stripe_payment_intent_id,payment_evidence, paid_out_at, held_until, tutor_id, tutor_username, tutor_email, tutor_profile_url, student_id, student_username, student_email, student_profile_url",
		search,
		status,
		dateFilterCol: dateFilterCol === "none" ? undefined : dateFilterCol,
		dateFilter: dateFilter,
	});

	return (
		<div>
			<div className="mb-10 flex flex-col gap-y-6">
				<div className="flex items-center gap-4 px-3">
					<div className="relative flex-1">
						<div className="absolute inset-y-0 left-2  flex items-center pointer-events-none pr-2">
							<Search className="text-gray-500" size={20} />
						</div>
						<DebounceSearchBar
							type="text"
							placeholder="Search with tutor, student and session name..."
							className="rounded-md border min-h-10 h-auto px-3 pl-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							query={search}
							setQuery={setSearch}
						/>
					</div>

					<div className="flex-1">
						<MultiSelect
							options={statuesList}
							onValueChange={(values: string[]) => {
								setPagination((prev) => ({ ...prev, pageIndex: 0 }));
								if (values.length < 1) {
									setStatus(null);
								} else {
									setStatus(values as TStudentSessionStatus[]);
								}
							}}
							defaultValue={status ?? undefined}
							placeholder="Select statues"
							variant="inverted"
							maxCount={2}
						/>
					</div>
				</div>
				<div className="flex items-center gap-4 px-3">
					<Button
						variant="outline"
						className="cursor-pointer"
						onClick={() => {
							setDateFilter(undefined);
							setDateFilterCol("none");
						}}>
						<XCircle />
					</Button>
					<div>
						<Select
							value={dateFilterCol}
							onValueChange={(value) => {
								setDateFilterCol(
									value as
										| "enrolled_at"
										| "refunded_at"
										| "paid_out_at"
										| "none",
								);
							}}>
							<SelectTrigger className="min-w-[150px] max-w-[150px] rounded-md border min-h-10 h-auto">
								<SelectValue placeholder="Select option" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Select option</SelectLabel>
									<SelectItem value="none" hidden className="text-gray-400">
										Select Option
									</SelectItem>
									<SelectItem value="enrolled_at">enrolled_at</SelectItem>
									<SelectItem value="held_until">held until</SelectItem>
									<SelectItem value="refunded_at">refunded at</SelectItem>
									<SelectItem value="paid_out_at">paid out at</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
					<div>
						<DatePickerWithRange date={dateFilter} setDate={setDateFilter} />
					</div>
				</div>
			</div>
			<div className="text-sm font-bold my-2 mb-4 text-gray-500">
				{queryData?.count} enrollment results
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
