import { HoverCardContent } from "@/components/ui/hover-card";
import Link from "next/link";

export default function ExploreHoverContent() {
	return (
		<HoverCardContent className="w-50 absolute -left-10">
			<div className="text-sm font-bold text-gray-800 px-2 py-5">
				Browse Courses
			</div>
			<hr />
			<div className="flex flex-col  my-2">
				<Link href="/home/sessions?category=Science&page=1">
					<ContentItem content="Science" />
				</Link>
				<Link href="/home/sessions?category=Technology&page=1">
					<ContentItem content="Technology" />
				</Link>

				<Link href="/home/sessions?category=Libral Arts&page=1">
					<ContentItem content="Libral Arts" />
				</Link>

				<Link href="/home/sessions?category=Business&page=1">
					<ContentItem content="Business" />
				</Link>

				<Link href="/home/sessions?category=Engineering&page=1">
					{" "}
					<ContentItem content="Engineering" />
				</Link>

				<Link href="/home/sessions?category=Health Science&page=1">
					<ContentItem content="Health Science" />
				</Link>

				<Link href="/home/sessions?category=Elective Courses&page=1">
					<ContentItem content="Elective Courses" />
				</Link>
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
