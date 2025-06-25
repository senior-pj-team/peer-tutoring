"use client";

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	ColumnFiltersState,
	getFilteredRowModel,
	useReactTable,
} from "@tanstack/react-table";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { DataTablePagination } from "./data-table-pagination";
import { useMemo, useState } from "react";

import { DebounceSearchBar } from "./debounce-search-bar";
import { DatePickerWithRange } from "./date-range-picker";
import { DateRange } from "react-day-picker";
import { isAfter, isBefore, isSameDay, isToday } from "date-fns";
import { fuzzyFilter } from "@/utils/app/fuzzy-filter";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	type: string;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	type,
}: DataTableProps<TData, TValue>) {
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [date, setDate] = useState<DateRange | undefined>({
		from: new Date(),
		to: new Date(),
	});
	const filteredData = useMemo(() => {
		if (!date?.from && !date?.to) return data;

		return data.filter((item) => {
			const heldUntil = (item as { held_until?: string }).held_until;
			if (!heldUntil) return false;

			const heldDate = new Date(heldUntil);
			const from = date.from!;
			const to = date.to ?? from;
			
			return (
				(isSameDay(heldDate, from) || isAfter(heldDate, from)) &&
				(isSameDay(heldDate, to) || isBefore(heldDate, to))
			);
		});
	}, [data, date]);

	const table = useReactTable({
		data: filteredData,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			columnFilters,
		},
		filterFns: {
			fuzzy: fuzzyFilter,
		},
	});

	return (
		<div>
			<div className="rounded-md border">
				<div className="flex flex-wrap gap-3  py-4 px-2 w-full ">
					{(type == "students" || type === "payouts") && (
						<div className="mb-5 lg:w-[40%] md:w-[60%] w-full lg:flex-2">
							<div className="relative">
								<DebounceSearchBar
									query={
										(table.getColumn("search")?.getFilterValue() as string) ??
										""
									}
									setQuery={(query) =>
										table.getColumn("search")?.setFilterValue(query)
									}
									placeholder="Search with student or session..."
									className="p-4 pr-10 border border-gray-300 rounded-lg focus:outline-primary focus:ring-primary overflow-clip mr-auto"
								/>
							</div>
							<Search
								className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none md:block hidden z-20"
								size={18}
							/>
						</div>
					)}
					{type === "payouts" && (
						<DatePickerWithRange date={date} setDate={setDate} />
					)}
				</div>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id} className="font-bold ">
											{header.isPlaceholder
												? null
												: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}>
									{row.getVisibleCells().map((cell) => (
										<TableCell
											key={cell.id}
											className="py-5 xl:max-w-[10rem] max-w-[8rem] ">
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<DataTablePagination table={table} />
		</div>
	);
}
