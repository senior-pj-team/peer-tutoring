import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

type PaginationProps = {
	currentPage: number;
	onPageChange: (page: number) => void;
	disableBack: boolean;
	disableForward: boolean;
};

export const PaginationControls = ({
	currentPage,
	onPageChange,
	disableBack,
	disableForward,
}: PaginationProps) => (
	<div className="flex items-center justify-center gap-6 mt-6">
		<Button
			onClick={() => onPageChange(currentPage - 1)}
			disabled={disableBack}
			className="flex items-center gap-1 px-4 py-2 rounded-sm text-gray-700 text-xs font-medium transition bg-transparent
 hover:bg-gray-100"
			aria-label="Previous Page">
			<ChevronLeftIcon className="w-4 h-4" />
		</Button>

		<span className="text-gray-800 font-medium">{currentPage + 1}</span>

		<Button
			onClick={() => onPageChange(currentPage + 1)}
			disabled={disableForward}
			className="text-xs flex items-center gap-1 px-4 py-2 rounded-sm text-gray-700 font-medium transition bg-transparent
 hover:bg-gray-100"
			aria-label="Next Page">
			<ChevronRightIcon className="w-4 h-4" />
		</Button>
	</div>
);
