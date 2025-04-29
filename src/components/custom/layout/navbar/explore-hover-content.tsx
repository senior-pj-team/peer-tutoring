import { HoverCardContent } from "@/components/ui/hover-card";

export default function ExploreHoverContent() {
	return (
		<HoverCardContent className="w-50 absolute -left-10">
			<div className="text-sm font-bold text-gray-800 px-2 py-5">
				Browse Courses
			</div>
			<hr />
			<div className="flex flex-col  my-2">
				<ContentItem content="Science" />
				<ContentItem content="Technology" />
				<ContentItem content="Libral Arts" />
				<ContentItem content="Business" />
				<ContentItem content="Engineering" />
				<ContentItem content="Elective Courses" />
			</div>
		</HoverCardContent>
	);
}

function ContentItem({ content }: { content: string }) {
	return (
		<div className="hover:bg-orange-50 hover:text-orange-400 text-sm py-3 cursor-pointer">
			<div className="px-3">{content}</div>
		</div>
	);
}
