"use client";

import GeneralLoading from "@/components/app/shared/general-loading";
import { UseSessionsJoinInifiniteQuery } from "@/hooks/use-sessions";
import { useSupabase } from "@/hooks/use-supabase";
import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { TransferCard } from "./transfer-card";
import { Button } from "@/components/ui/button";
import { Ban, XCircle } from "lucide-react";
import { DatePickerWithRange } from "@/components/app/shared/date-range-picker";
import { getDateRange } from "@/utils/app/get-date-range";

export function TransferList({ status }: { status: TSessionStatus[] }) {
	const supabase = useSupabase();
	const [date, setDate] = useState<DateRange | undefined>(undefined);

	const dateRange = useMemo(() => getDateRange(date), [date]);

	const {
		data,
		fetchNextPage,
		hasNextPage,
		isLoading,
		isFetchingNextPage,
		isError,
	} = UseSessionsJoinInifiniteQuery({
		key: "sessions_join",
		supabase,
		status,
		dateFilterCol: "held_until",
		start: dateRange.start_date,
		end: dateRange.end_date,
		limit: 10,
	});

	if (isError)
		return (
			<div className="text-red-500 w-full h-[200px] flex justify-center items-center">
				Something went wrong while loading refund requests ❌.
			</div>
		);
	const results = data?.pages.flat() || [];

	return (
		<div className="space-y-6 px-4 lg:px-6">
			<div className=" mb-6 flex gap-1 items-center">
				<Button
					variant="outline"
					className="cursor-pointer"
					onClick={() => setDate(undefined)}>
					<XCircle />
				</Button>
				<DatePickerWithRange date={date} setDate={setDate} />
			</div>
			<div className="grid gap-4">
				{isLoading && <GeneralLoading />}
				{!isLoading && !isError && results.length < 1 && (
					<div className="flex flex-col items-center justify-center mt-[10rem] text-center text-gray-500">
						<Ban className="w-12 h-12 mb-4 text-gray-400" />
						<p className="text-lg font-medium">No data found</p>
						<p className="text-sm text-gray-400">
							There is currently no sessions to transfer
						</p>
					</div>
				)}
				{!isLoading && !isError && results.length > 0 && (
					<>
						{results.map((result) =>
							result ? (
								<TransferCard
									status={status[0]}
									data={result}
									start={dateRange.start_date}
									end={dateRange.end_date}
									key={result.id}
								/>
							) : null,
						)}
						{hasNextPage && (
							<div className="text-center">
								<Button
									variant="outline"
									onClick={() => fetchNextPage()}
									disabled={isFetchingNextPage}>
									{isFetchingNextPage ? "Loading..." : "Show More"}
								</Button>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
}
