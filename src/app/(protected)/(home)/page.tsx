import CustomHeroCarousel from "@/components/custom/carousel/custom-hero-carousel";

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
			<div className="lg:min-h-[24rem]">
				<CustomHeroCarousel />
			</div>
			<div className="mt-5 px-10">
				<div className="text-3xl font-bold tracking-wider">Sessions</div>
			</div>
		</div>
	);
}
