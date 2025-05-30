import Filter from "@/components/app/shared/filter/filter";
import { GeneralSessionCardList } from "@/components/app/shared/sessions/general-session-card-list";
import { SessionSkeletonList } from "@/components/app/shared/sessions/session-skeleton-list";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { AlignJustify } from "lucide-react";
import { Suspense } from "react";

export type Params = Promise<{
	search: string;
	page: string;
	rating: string;
	maxPrice: string;
	minPrice: string;
	free: string;
	paid: string;
	category: string[];
}>;
export default async function Sessions({
	searchParams,
}: {
	searchParams: Params;
}) {
	const params = await searchParams;

	return (
		<div className="lg:px-[6rem] lg:pt-[4rem] md:px-[4rem] md:pt-[3rem] px-[3rem] pt-[2rem] w-full">
			{params.search && (
				<span className="lg:text-4xl md:text-2xl text-xl font-bold">
					Result for &quot;{params.search}&quot;
				</span>
			)}
			<FilterSheet />
			<div className={cn("flex gap-x-5 ", params.search ? "mt-10" : "mt-2")}>
				<div className="xl:w-[25%] lg:w-[38%]  hidden lg:block">
					<Filter />
				</div>
				<div className="w-full p-3">
					<Suspense fallback={<SessionSkeletonList />}>
						<GeneralSessionCardList params={params} />
					</Suspense>
				</div>
			</div>
		</div>
	);
}

function FilterSheet() {
	return (
		<div className="lg:hidden  mt-6">
			<Sheet>
				<SheetTrigger>
					<div className="rounded-sm py-[0.65rem] px-[0.8rem] hover:border-black flex items-center border border-gray-300 hover:bg-gray-200 gap-x-2">
						Filter
						<AlignJustify size={12} />
					</div>
				</SheetTrigger>
				<SheetContent
					className="w-[18rem] md:w-[32rem] overflow-auto h-full"
					side="right">
					<SheetHeader className="p-3 pt-5  h-full">
						<SheetTitle>Filter options</SheetTitle>
						<Filter />
					</SheetHeader>
				</SheetContent>
			</Sheet>
		</div>
	);
}
