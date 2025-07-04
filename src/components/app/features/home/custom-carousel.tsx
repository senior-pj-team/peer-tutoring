"use client";

import SessionCard from "../../shared/sessions/session-card";
import { type CarouselApi } from "@/components/ui/carousel";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import TutorCard from "@/components/app/shared/tutor-card";
import GeneralSessionCard from "@/components/app/shared/sessions/general-session-card";
import { cn } from "@/lib/utils";

export default function CustomCarousel({
	user,
	sessions,
	my_sessions,
	tutors,
	type,
}: {
	user?: UserSession | null;
	sessions?: TSessionsMatViewResultRow[];
	my_sessions?: TStudentSessionViewResult[];
	tutors?: TTutorWithStatsResult;
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
					{my_sessions &&
						!type &&
						my_sessions.map((session) => (
							<CarouselItem
								key={session.student_session_id}
								className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-5">
								<SessionCard student_session={session} page="upcoming" />
							</CarouselItem>
						))}
					{tutors &&
						!type &&
						tutors.map((tutor) => (
							<CarouselItem
								key={tutor.tutor_id}
								className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-5">
								<TutorCard tutor={tutor} user={user ?? null} />
							</CarouselItem>
						))}
					{sessions &&
						(type == "free" || type == "closing") &&
						sessions.map((session) => (
							<CarouselItem
								key={session.session_id}
								className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-5">
								<GeneralSessionCard content={session} />
							</CarouselItem>
						))}
				</CarouselContent>

				{canScrollPrev && (
					<CarouselPrevious
						className={cn(
							"absolute -left-5  drop-shadow-2xl w-12 h-12 hover:bg-orange-400/90 hover:text-white cursor-pointer z-20",
							tutors ? "top-1/3" : "top-2/7",
						)}
					/>
				)}

				{canScrollNext && (
					<CarouselNext
						className={cn(
							"absolute -right-5  drop-shadow-2xl w-12 h-12 hover:bg-orange-400/90 hover:text-white cursor-pointer z-20",
							tutors ? "top-1/3" : "top-2/7",
						)}
					/>
				)}
			</Carousel>
			<div className="py-2 text-center text-sm text-muted-foreground"></div>
		</>
	);
}
