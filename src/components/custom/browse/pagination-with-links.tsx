"use client";

import { type ReactNode, useCallback } from "react";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export interface PaginationWithLinksProps {
	pageSizeSelectOptions?: {
		pageSizeSearchParam?: string;
		pageSizeOptions: number[];
	};
	totalCount: number;
	pageSize: number;
	page: number;
	pageSearchParam?: string;
	scroll?: boolean;
}

/**
 * Navigate with Nextjs links (need to update your own `pagination.tsx` to use Nextjs Link)
 * 
 * @example
 * ```
 * <PaginationWithLinks
    page={1}
    pageSize={20}
    totalCount={500}
  />
 * ```
 */
export function PaginationWithLinks({
	pageSizeSelectOptions,
	pageSize,
	totalCount,
	page,
	pageSearchParam,
	scroll = true,
}: PaginationWithLinksProps) {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const totalPageCount = Math.ceil(totalCount / pageSize);

	const buildLink = useCallback(
		(newPage: number) => {
			const key = pageSearchParam || "page";
			if (!searchParams) return `${pathname}?${key}=${newPage}`;
			const newSearchParams = new URLSearchParams(searchParams);
			newSearchParams.set(key, String(newPage));
			return `${pathname}?${newSearchParams.toString()}`;
		},
		[searchParams, pathname, pageSearchParam],
	);

	const renderPageNumbers = () => {
		const items: ReactNode[] = [];
		const maxVisiblePages = 5;

		if (totalPageCount <= maxVisiblePages) {
			for (let i = 1; i <= totalPageCount; i++) {
				items.push(
					<PaginationItem key={i}>
						<PaginationLink
							href={buildLink(i)}
							isActive={page === i}
							scroll={scroll}>
							{i}
						</PaginationLink>
					</PaginationItem>,
				);
			}
		} else {
			for (let i = 1; i <= 3; i++) {
				items.push(
					<PaginationItem key={i}>
						<PaginationLink
							href={buildLink(i)}
							isActive={page === i}
							scroll={scroll}>
							{i}
						</PaginationLink>
					</PaginationItem>,
				);
			}

			if (page > 7) {
				items.push(
					<PaginationItem key="ellipsis-start">
						<PaginationEllipsis />
					</PaginationItem>,
				);
			}

			const start = Math.max(4, page - 3);
			const end = Math.min(totalPageCount - 1, page + 3);
			console.log(start);
			console.log(end);
			for (let i = start; i <= end; i++) {
				items.push(
					<PaginationItem key={i}>
						<PaginationLink
							href={buildLink(i)}
							isActive={page === i}
							scroll={scroll}>
							{i}
						</PaginationLink>
					</PaginationItem>,
				);
			}

			if (page < totalPageCount - 4) {
				items.push(
					<PaginationItem key="ellipsis-end">
						<PaginationEllipsis />
					</PaginationItem>,
				);
			}

			items.push(
				<PaginationItem key={totalPageCount}>
					<PaginationLink
						href={buildLink(totalPageCount)}
						isActive={page === totalPageCount}
						scroll={scroll}>
						{totalPageCount}
					</PaginationLink>
				</PaginationItem>,
			);
		}

		return items;
	};

	return (
		<div className="flex flex-col md:flex-row items-center gap-3 w-full">
			<Pagination className={cn({ "md:justify-end": pageSizeSelectOptions })}>
				<PaginationContent className="max-sm:gap-0 flex flex-wrap">
					<PaginationItem>
						<PaginationPrevious
							href={buildLink(Math.max(page - 1, 1))}
							aria-disabled={page === 1}
							tabIndex={page === 1 ? -1 : undefined}
							className={page === 1 ? "pointer-events-none opacity-50" : " "}
							scroll={scroll}
						/>
					</PaginationItem>
					{renderPageNumbers()}
					<PaginationItem>
						<PaginationNext
							href={buildLink(Math.min(page + 1, totalPageCount))}
							aria-disabled={page === totalPageCount}
							tabIndex={page === totalPageCount ? -1 : undefined}
							className={
								page === totalPageCount
									? "pointer-events-none opacity-50 "
									: undefined
							}
							scroll={scroll}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
}
