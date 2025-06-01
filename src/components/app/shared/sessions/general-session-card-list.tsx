import { getSessionsMatView } from "@/data/queries/sessions/get-sessions-mat-view";
import { PaginationWithLinks } from "../filter/pagination-with-links";
import GeneralSessionCard from "./general-session-card";
import { createClient } from "@/utils/supabase/server";
import { FrownIcon } from "lucide-react";

export async function GeneralSessionCardList({
	params,
}: {
	params: {
		search: string;
		page: string;
		rating: string;
		maxPrice: string;
		minPrice: string;
		free: string;
		paid: string;
		category: string[];
	};
}) {
	const {
		search,
		rating,
		category,
		minPrice,
		maxPrice,
		page = "1",
		free,
		paid,
	} = params;
	const categoryArray = typeof category === "string" ? [category] : category;

	const supabase = await createClient();
	const data = await getSessionsMatView(supabase, {
		search: search,
		tutorRating: parseFloat(rating),
		sessionCategory: categoryArray,
		minPrice: parseFloat(minPrice),
		maxPrice: parseFloat(maxPrice),
		free: free === "true",
		paid: paid === "true",
		offset: (parseInt(page) - 1) * 12,
		limit: 12,
	});

	if (data == null) {
		return (
			<div className="text-2xl flex justify-center items-center text-red-500 font-bold h-full gap-x-2">
				<FrownIcon size={30} />
				Something went wrong!
			</div>
		);
	}

	if (!data.rows || data.rows.length <= 0) {
		return (
			<div className="text-2xl flex justify-center items-center font-bold h-full gap-x-2">
				<FrownIcon size={30} />
				No sessions to show!
			</div>
		);
	}
	return (
		<>
			<div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
				{data.rows.map((session: TSessionsMatViewResultRow, index) => {
					return (
						<GeneralSessionCard
							content={session}
							type="a"
							key={index}
							page="browse"
						/>
					);
				})}
			</div>
			<div className="my-3">
				<PaginationWithLinks
					page={parseInt(params.page)}
					pageSize={12}
					totalCount={data.total ?? 0}
				/>
			</div>
		</>
	);
}
