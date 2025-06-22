import CustomHeroCarousel from "@/components/app/features/home/custom-hero-carousel";
import MySessionsSection from "@/components/app/features/home/my-sessions-section";
import TopTutorsSection from "@/components/app/features/home/top-tutors-section";

import { Roboto_Mono } from "next/font/google";
import { FreeSessionsSection } from "@/components/app/features/home/free-sessions-section";
import { Suspense } from "react";
import { ClosingSessionsSection } from "@/components/app/features/home/closing-sessions-section";
import { SessionsSkeleton } from "@/components/app/features/home/sessions-skeleton";

const roboto_mono = Roboto_Mono({
	weight: ["700"],
	subsets: ["latin"],
});

export default function Home() {
	return (
		<div className="py-10 px-5 w-full">
			<div
				className={`text-3xl font-extrabold ${roboto_mono.className} antialiased`}>
				Welcome to ORION
			</div>
			<div className="xl:min-h-[24rem] lg:min-h-[20rem] min-h-[24rem] ">
				<CustomHeroCarousel />
			</div>
			<Suspense fallback={<SessionsSkeleton />}>
				<MySessionsSection />
			</Suspense>

			<Suspense fallback={<SessionsSkeleton />}>
				<TopTutorsSection />
			</Suspense>
			<Suspense fallback={<SessionsSkeleton />}>
				<FreeSessionsSection />
			</Suspense>
			<Suspense fallback={<SessionsSkeleton />}>
				<ClosingSessionsSection />
			</Suspense>
		</div>
	);
}
