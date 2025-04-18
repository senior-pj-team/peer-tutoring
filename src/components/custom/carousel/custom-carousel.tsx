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

type Sessions = {
	sessionName: string;
	courseCode: string;
	courseName: string;
	cardType: string;
};

type Tutors = {
	name: string;
	totalStudents: number;
	totalSessions: number;
	image: string;
};

export default function CustomCarousel({
	content,
}: {
	content: Sessions[] | Tutors[];
}) {
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (!api) {
			return;
		}

		setCount(api.scrollSnapList().length);
		setCurrent(api.selectedScrollSnap() + 1);

		api.on("select", () => {
			setCurrent(api.selectedScrollSnap() + 1);
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
					{content.map((c, index) => {
						if ("sessionName" in c) {
							return (
								<CarouselItem
									key={index}
									className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-5">
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
				</CarouselContent>
				{current > 1 && (
					<CarouselPrevious className="absolute -left-5 top-1/3 drop-shadow-2xl w-12 h-12 hover:bg-orange-400/90 hover:text-white cursor-pointer z-20" />
				)}

				{current !== count && (
					<CarouselNext className="absolute -right-5 top-1/3 drop-shadow-2xl w-12 h-12 hover:bg-orange-400/90 hover:text-white cursor-pointer z-20" />
				)}
			</Carousel>
			<div className="py-2 text-center text-sm text-muted-foreground"></div>
		</>
	);
}
