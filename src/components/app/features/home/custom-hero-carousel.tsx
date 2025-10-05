"use client";
import Autoplay from "embla-carousel-autoplay";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Roboto_Slab } from "next/font/google";
import Link from "next/link";
import clsx from "clsx";

const roboto_slab = Roboto_Slab({
	weight: "600",
	subsets: ["latin"],
});

export default function CustomHeroCarousel() {
	return (
		<Carousel
			opts={{
				align: "start",
				loop: true,
			}}
			plugins={[
				Autoplay({
					delay: 4000,
				}),
			]}
			className="mt-8 mx-5 relative">
			<CarouselContent className="-ml-4">
				<Item
					cardTitle="Sessions are Free Now!"
					cardText={
						<span className="text-gray-600 text-md leading-5.5">
							Tutors are now promoting their sessions. Please explore more{" "}
							<Link
								href="/"
								className="text-blue-600 underline hover:text-blue-800">
								here
							</Link>
							.
						</span>
					}
					backgroundImageUrl="/tutor.jpg"
					image={true}
				/>
				<Item
					cardTitle="Build your tutor career with Peertube!"
					cardText={
						<span className="text-gray-600 text-md leading-5.5">
							You want become to help other students and get experience. Say
							less -{" "}
							<Link
								href="/"
								className="text-blue-600 underline hover:text-blue-800">
								become a tutor
							</Link>
							.
						</span>
					}
					backgroundImageUrl="/free.png"
				/>
				<Item
					cardTitle="Explore your desired sessions and tutors!"
					cardText={
						<span className="text-gray-600 text-md leading-5.5">
							Various Sessions of your universities await. Please explore more{" "}
							<Link
								href="/"
								className="text-blue-600 underline hover:text-blue-800">
								here
							</Link>
							.
						</span>
					}
					backgroundImageUrl="/connect.png"
				/>
			</CarouselContent>
			<CarouselPrevious className=" hidden md:inline absolute left-5 drop-shadow-2xl w-12 h-12 hover:bg-orange-400/90 hover:text-white cursor-pointer" />
			<CarouselNext className=" hidden md:inline right-5 drop-shadow-2xl w-12 h-12 hover:bg-orange-400/90 hover:text-white cursor-pointer" />
		</Carousel>
	);
}

function Item({
	cardTitle,
	cardText,
	backgroundImageUrl,
	image,
}: {
	cardTitle: string;
	cardText: React.ReactNode;
	backgroundImageUrl: string;
	image?: boolean;
}) {
	return (
		<CarouselItem className="xl:min-h-[24rem] lg:min-h-[20rem] min-h-[24rem] relative pl-4 ">
			<div
				className={clsx(
					"h-[80%] md:h-full overflow-hidden bg-center bg-cover md:bg-left-top bg-no-repeat",
					image ? " md:bg-cover" : "md:bg-contain bg-blue-400",
				)}
				style={{
					backgroundImage: `url(${backgroundImageUrl})`,
				}}></div>
			<Card
				className={clsx(
					" hidden md:block absolute top-1/5 lg:min-w-[24rem] lg:h-[12rem] border-none rounded-xs drop-shadow-xl md:w-[12rem] md:bottom-4  ",
					image ? "left-30" : "right-30",
				)}>
				<CardHeader>
					<CardTitle
						className={`lg:leading-8 lg:text-2xl md:text-lg lg:tracking-wide ${roboto_slab.className} antialiased`}>
						{cardTitle}
					</CardTitle>
					<CardDescription className="lg:mt-4 md:mt-1 md:leading-tight">
						{cardText}
					</CardDescription>
				</CardHeader>
			</Card>

			<div className="md:hidden mt-2  w-full h-full">
				<div
					className={`leading-5 text-sm ${roboto_slab.className} antialiased`}>
					{" "}
					{cardTitle}
				</div>
				<div className=" mt-1 leading-tight text-xs">{cardText}</div>
			</div>
		</CarouselItem>
	);
}
