import { getSessionsMatView } from "@/data/queries/sessions/get-sessions-mat-view";
import CustomCarousel from "./custom-carousel";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import GeneralSessionCard from "../../shared/sessions/general-session-card";

export async function ClosingSessionsSection() {
	const supabase = await createClient();
	const closingSessions = await getSessionsMatView(supabase, {
		p_start_today: true,
		status: ["open"],
		limit: 16,
		offset: 0,
	});
	if (!closingSessions) {
		return (
			<div className="mt-5 px-10 w-full h-85">
				<div className="text-3xl font-bold tracking-wider">
					<span>Closing Soon Sessions ⏰</span>
				</div>
				<div className="flex w-full h-full justify-center items-center ">
					<span className="font-bold text-gray-400 md:text-lg text-xl">
						Something went wrong 🚩
					</span>
				</div>
			</div>
		);
	}
	if (!closingSessions.rows) {
		return (
			<div className="mt-5 px-10 w-full h-85">
				<div className="text-3xl font-bold tracking-wider">
					<span>Closing Soon Sessions ⏰</span>
				</div>
				<div className="flex w-full h-full justify-center items-center ">
					<span className="font-bold text-gray-400 md:text-lg text-xl">
						Coming Soon 👽
					</span>
				</div>
			</div>
		);
	}
	return (
		<div className="mt-5 px-10">
			<div className="flex items-center justify-between">
				<div className="text-3xl font-bold tracking-wider">
					<span>Sessions Closing Soon ⏰</span>
				</div>

				<Link
					href="/home/sessions?closing_soon=true&page=1"
					className="text-orange-400 underline hover:text-orange-500 hover:bg-orange-100 py-2 px-3 text-md font-bold leading-5.5 rounded-sm hidden md:block">
					View more
				</Link>
			</div>
			<div className="hidden md:block">
				<CustomCarousel sessions={closingSessions.rows} type="closing" />
			</div>

			<div className="mt-5 md:hidden">
				{closingSessions.rows.map((session, index) => {
					if (index > 2) {
						return null;
					}
					return (
						<div className="py-2" key={session.session_id}>
							<GeneralSessionCard content={session} key={index} />
						</div>
					);
				})}
				<Link
					href="/home/sessions?closing_soon=true&page=1"
					className="max-auto text-orange-400 underline hover:text-orange-500 hover:bg-orange-100 py-2 px-3 text-md font-bold leading-5.5 rounded-sm  md:hidden">
					View more
				</Link>
			</div>
		</div>
	);
}
