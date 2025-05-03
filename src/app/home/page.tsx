import CustomHeroCarousel from "@/components/custom/features/home/custom-hero-carousel";
import SessionsSection from "@/components/custom/features/home/sessions-section";
import MySessionsSection from "@/components/custom/features/home/my-sessions-section";
import TopTutorsSection from "@/components/custom/features/home/top-tutors-section";

import { Roboto_Mono } from "next/font/google";

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
			<MySessionsSection />
			<TopTutorsSection />
			<SessionsSection type="free" />
			<SessionsSection type="closing" />
		</div>
	);
}
