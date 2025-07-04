import { Table } from "@tanstack/react-table";
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { DataTableViewOptions } from "./data-table-view-options";

interface DataTablePaginationProps<TData> {
	table: Table<TData>;
	isFetching?: boolean;
	isPlaceholderData?: boolean;
}

export function DataTablePagination<TData>({
	table,
	isFetching,
	isPlaceholderData,
}: DataTablePaginationProps<TData>) {
	return (
		<div className="flex items-center justify-between px-2 mt-2">
			<div className="flex items-center w-full md:justify-between justify-end space-x-6 lg:space-x-8">
				<div className=" items-center space-x-2 hidden md:flex">
					<p className="text-sm font-medium">Rows per page</p>
					<Select
						value={`${table.getState().pagination.pageSize}`}
						onValueChange={(value) => {
							table.setPageSize(Number(value));
						}}>
						<SelectTrigger className="h-8 w-[70px]">
							<SelectValue placeholder={table.getState().pagination.pageSize} />
						</SelectTrigger>
						<SelectContent side="top">
							{[15, 20, 30, 40, 50].map((pageSize) => (
								<SelectItem key={pageSize} value={`${pageSize}`}>
									{pageSize}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<DataTableViewOptions table={table} />
				</div>
				<div className="flex gap-2 ">
					<div className="flex w-full items-center lg:justify-center  text-sm font-medium">
						Page {table.getState().pagination.pageIndex + 1} of{" "}
						{table.getPageCount()}
					</div>
					<div className="flex items-center space-x-2">
						<Button
							variant="outline"
							className="hidden h-8 w-8 p-0 lg:flex"
							onClick={() => table.firstPage()}
							disabled={
								isFetching || isPlaceholderData || !table.getCanPreviousPage()
							}>
							<span className="sr-only">Go to first page</span>
							<ChevronsLeft />
						</Button>
						<Button
							variant="outline"
							className="h-8 w-8 p-0"
							onClick={() => table.previousPage()}
							disabled={
								isFetching || isPlaceholderData || !table.getCanPreviousPage()
							}>
							<span className="sr-only">Go to previous page</span>
							<ChevronLeft />
						</Button>
						<Button
							variant="outline"
							className="h-8 w-8 p-0"
							onClick={() => table.nextPage()}
							disabled={
								isFetching || isPlaceholderData || !table.getCanNextPage()
							}>
							<span className="sr-only">Go to next page</span>
							<ChevronRight />
						</Button>
						<Button
							variant="outline"
							className="hidden h-8 w-8 p-0 lg:flex"
							onClick={() => table.lastPage()}
							disabled={
								isFetching || isPlaceholderData || !table.getCanNextPage()
							}>
							<span className="sr-only">Go to last page</span>
							<ChevronsRight />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
