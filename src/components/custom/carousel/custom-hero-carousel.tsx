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
					content="Item 1"
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
					content="Item 2"
					cardTitle="Build your tutor career with Orion!"
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
					content="Item 3"
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
			<CarouselPrevious className="absolute left-5 drop-shadow-2xl w-12 h-12 hover:bg-orange-400/90 hover:text-white font-extrabold" />
			<CarouselNext className="absolute right-5 drop-shadow-2xl w-12 h-12 hover:bg-orange-400/90 hover:text-white " />
		</Carousel>
	);
}

function Item({
	content,
	cardTitle,
	cardText,
	backgroundImageUrl,
	image,
}: {
	content: string;
	cardTitle: string;
	cardText: React.ReactNode;
	backgroundImageUrl: string;
	image?: boolean;
}) {
	return (
		<CarouselItem className="lg:min-h-[24rem] relative pl-4 ">
			<div
				className={clsx(
					"h-full overflow-hidden  bg-no-repeat",
					image ? " bg-cover" : "bg-contain bg-blue-400",
				)}
				style={{
					backgroundImage: `url(${backgroundImageUrl})`,
				}}></div>
			<Card
				className={clsx(
					" hidden md:block absolute top-1/5  min-w-[24rem] border-none rounded-xs drop-shadow-xl",
					image ? "left-30" : "right-30",
				)}>
				<CardHeader>
					<CardTitle
						className={`leading-8 text-2xl tracking-wide ${roboto_slab.className} antialiased`}>
						{cardTitle}
					</CardTitle>
					<CardDescription className="mt-4">{cardText}</CardDescription>
				</CardHeader>
			</Card>
			<div className="h-full border flex items-center justify-center">
				<p className="text-center text-lg">{content}</p>
			</div>
		</CarouselItem>
	);
}
