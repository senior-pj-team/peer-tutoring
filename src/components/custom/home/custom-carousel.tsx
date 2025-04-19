"use client";

import SessionCards from "@/components/custom/session/session-cards";
import { type CarouselApi } from "@/components/ui/carousel";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import TutorCard from "@/components/custom/tutor-card";
import GeneralSessionCard from "../general-session-card";

type MySession = {
	sessionName: string;
	courseCode: string;
	courseName: string;
	cardType: string;
};

type Tutor = {
	name: string;
	totalStudents: number;
	totalSessions: number;
	image: string;
};

type Session = {
	sessionName: string;
	courseCode: string;
	courseName: string;
	school: string;
	major: string;
	price: string;
	remaining: string;
	description: string;
	tutor: string;
	rating: string;
	type: string;
	from: string;
	to: string;
	date: string;
};

export default function CustomCarousel({
	content,
	type,
}: {
	content: MySession[] | Tutor[] | Session[];
	type?: string;
}) {
	const [api, setApi] = useState<CarouselApi>();
	const [canScrollNext, setCanScrollNext] = useState<boolean>(true);
	const [canScrollPrev, setCanScrollPrev] = useState<boolean>(true);

	useEffect(() => {
		if (!api) {
			return;
		}
		// setCount(api.scrollSnapList().length);
		setCanScrollNext(api.canScrollNext());
		setCanScrollPrev(api.canScrollPrev());

		api.on("select", () => {
			// setCurrent(api.selectedScrollSnap() + 1);
			setCanScrollNext(api.canScrollNext());
			setCanScrollPrev(api.canScrollPrev());
		});
	}, [api]);
	return (
		<>
			<Carousel
				setApi={setApi}
				opts={{
					align: "start",
				}}
				className="mt-4 relative">
				<CarouselContent className="-ml-4">
					{!type &&
						content.map((c, index) => {
							if ("cardType" in c) {
								return (
									<CarouselItem
										key={index}
										className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-5 ">
										<SessionCards
											sessionName={c.sessionName}
											courseCode={c.courseCode}
											courseName={c.courseName}
											cardType={c.cardType}
										/>
									</CarouselItem>
								);
							} else if ("totalStudents" in c) {
								return (
									<CarouselItem
										key={index}
										className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-5">
										<TutorCard
											name={c.name}
											totalSessions={c.totalSessions}
											totalStudents={c.totalStudents}
											image={c.image}
										/>
									</CarouselItem>
								);
							}
							return null;
						})}
					{(type == "free" || type == "closing") &&
						content.map((c, index) => {
							if ("type" in c) {
								return (
									<CarouselItem
										key={index}
										className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-5">
										<GeneralSessionCard content={c} type={type} />
									</CarouselItem>
								);
							}
							return null;
						})}
				</CarouselContent>
				{canScrollPrev && (
					<CarouselPrevious className="absolute -left-5 top-1/3 drop-shadow-2xl w-12 h-12 hover:bg-orange-400/90 hover:text-white cursor-pointer z-20" />
				)}

				{canScrollNext && (
					<CarouselNext className="absolute -right-5 top-1/3 drop-shadow-2xl w-12 h-12 hover:bg-orange-400/90 hover:text-white cursor-pointer z-20" />
				)}
			</Carousel>
			<div className="py-2 text-center text-sm text-muted-foreground"></div>
		</>
	);
}
