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
import { DataTablePagination } from "./data-table-pagination";
import { useMemo, useState } from "react";

import TutorDashboardSearchBar from "./tutor-dashboard/tutor-search-bar";
import { DatePickerWithRange } from "./date-range-picker";
import { DateRange } from "react-day-picker";
import { isAfter, isBefore, isSameDay, isToday } from "date-fns";

interface DataTableProps<
	TData extends { released_at: string | number | Date },
	TValue,
> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function DataTable<
	TData extends { released_at: string | number | Date },
	TValue,
>({ columns, data }: DataTableProps<TData, TValue>) {
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [date, setDate] = useState<DateRange | undefined>({
		from: new Date(),
		to: new Date(),
	});
	const filteredData = useMemo(() => {
		if (!date?.from) return data;

		return data.filter((item) => {
			if (date.from && isToday(date.from) && date.to && isToday(date.to)) {
				return true;
			}
			console.log(item);
			const itemDate = new Date(item.released_at);
			const from = date.from!;
			const to = date.to ?? from;

			return (
				isSameDay(itemDate, from) ||
				isSameDay(itemDate, to) ||
				(isAfter(itemDate, from) && isBefore(itemDate, to))
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
	});

	return (
		<div>
			<div className="rounded-md border">
				<div className="flex flex-wrap gap-3  py-4 px-2 w-full ">
					<TutorDashboardSearchBar
						query={
							(table.getColumn("session")?.getFilterValue() as string) ?? ""
						}
						setQuery={(query) =>
							table.getColumn("session")?.setFilterValue(query)
						}
					/>
					<DatePickerWithRange date={date} setDate={setDate} />
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
