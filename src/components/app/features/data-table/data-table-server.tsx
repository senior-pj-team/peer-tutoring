"use client";

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
	PaginationState,
	VisibilityState,
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
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { fuzzyFilter } from "@/utils/app/fuzzy-filter";
import GeneralLoading from "../../shared/general-loading";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[] | undefined;
	count: number | undefined;
	pagination: PaginationState;
	setPagination: Dispatch<SetStateAction<PaginationState>>;
	isFetching: boolean;
	isError: boolean;
	isLoading: boolean;
	isPlaceholderData: boolean;
	initialColumns: {
		[key: string]: boolean;
	};
}

export function DataTableServer<TData, TValue>({
	columns,
	data,
	count,
	pagination,
	setPagination,
	isFetching,
	isError,
	isLoading,
	isPlaceholderData,
	initialColumns,
}: DataTableProps<TData, TValue>) {
	const defaultData = useMemo(() => [], []);
	const [columnVisibility, setColumnVisibility] =
		useState<VisibilityState>(initialColumns);
	const table = useReactTable({
		data: data ?? defaultData,
		columns,
		rowCount: count,
		state: {
			pagination,
			columnVisibility,
		},
		onPaginationChange: setPagination,
		onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
		manualPagination: true,
		debugTable: true,
		filterFns: {
			fuzzy: fuzzyFilter,
		},
	});

	return (
		<div>
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id} className="py-4">
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
					{isError && (
						<TableRow>
							<TableCell
								colSpan={columns.length}
								className="h-24 text-center text-red-500">
								Something went wrong ❌
							</TableCell>
						</TableRow>
					)}

					{!isError && isLoading && (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								<GeneralLoading />
							</TableCell>
						</TableRow>
					)}
					{!isError &&
						!isLoading &&
						data &&
						(table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id} className="py-5">
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
						))}
				</TableBody>
			</Table>

			<DataTablePagination
				table={table}
				isFetching={isFetching}
				isPlaceholderData={isPlaceholderData}
			/>
		</div>
	);
}
