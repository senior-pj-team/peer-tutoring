import { getSessionsMatView } from "@/data/queries/sessions/get-sessions-mat-view";
import CustomCarousel from "./custom-carousel";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { type } from "os";
import GeneralSessionCard from "../../shared/sessions/general-session-card";

export async function FreeSessionsSection() {
	const supabase = await createClient();
	const freeSessions = await getSessionsMatView(supabase, {
		free: true,
		paid: false,
		status: ["open"],
		limit: 16,
		offset: 0,
	});
	if (!freeSessions) {
		return (
			<div className="mt-5 px-10 w-full h-85">
				<div className="text-3xl font-bold tracking-wider">
					<span>Free Sessions 🌟</span>
				</div>
				<div className="flex w-full h-full justify-center items-center ">
					<span className="font-bold text-gray-400 md:text-xl text-lg">
						Something went wrong 🚩
					</span>
				</div>
			</div>
		);
	}
	if (!freeSessions.rows) {
		return (
			<div className="mt-5 px-10 w-full h-85">
				<div className="text-3xl font-bold tracking-wider">
					<span>Free Sessions 🌟</span>
				</div>
				<div className="flex w-full h-full justify-center items-center ">
					<span className="font-bold text-gray-400 md:text-xl text-lg">
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
					<span>Free Sessions 🌟</span>
				</div>

				<Link
					href="/home/sessions?free=true&paid=false&page=1"
					className="text-orange-400 underline hover:text-orange-500 hover:bg-orange-100 py-2 px-3 text-md font-bold leading-5.5 rounded-sm hidden md:block">
					View more
				</Link>
			</div>

			<div className="hidden md:block">
				<CustomCarousel sessions={freeSessions.rows} type="free" />
			</div>
			<div className="mt-5 md:hidden">
				{freeSessions.rows.map((session, index) => {
					if (index > 3) {
						return null;
					}
					return (
						<div className="py-2" key={session.session_id}>
							<GeneralSessionCard content={session} type="free" key={index} />
						</div>
					);
				})}
				<Link
					href="/home/sessions?free=true&paid=false&page=1"
					className="max-auto text-orange-400 underline hover:text-orange-500 hover:bg-orange-100 py-2 px-3 text-md font-bold leading-5.5 rounded-sm  md:hidden">
					View more
				</Link>
			</div>
		</div>
	);
}
