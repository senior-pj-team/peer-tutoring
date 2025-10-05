"use client";

import { useInfiniteTutorRequests } from "@/hooks/use-infinite-tutor-requests";
import TutorOnboardingCard from "./tutor-onboarding-card";
import { Button } from "@/components/ui/button";
import { Ban } from "lucide-react";

export default function TutorRequestList() {
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isLoading,
		isFetchingNextPage,
		isError,
	} = useInfiniteTutorRequests();

	const requests = data?.pages.flat() || [];
	if (isLoading) return <p>Loading...</p>;
	if (isError) return <p>Something went wrong loading tutor requests.</p>;

	return (
		<div className="space-y-4">
			{requests.length > 0 ? (
				<>
					{requests.map((req) => (
						<TutorOnboardingCard key={req.id} request={req} />
					))}
					{hasNextPage && (
						<div className="text-center">
							<Button
								variant="outline"
								onClick={() => fetchNextPage()}
								disabled={isFetchingNextPage}>
								{isFetchingNextPage ? "Loading..." : "Show More"}
							</Button>
						</div>
					)}
				</>
			) : (
				<div className="flex flex-col items-center justify-center mt-[15rem] text-center text-gray-500">
					<Ban className="w-12 h-12 mb-4 text-gray-400" />
					<p className="text-lg font-medium">No tutor requests found</p>
					<p className="text-sm text-gray-400">
						All applications have been reviewed.
					</p>
				</div>
			)}
		</div>
	);
}
