import { HoverCardContent } from "@/components/ui/hover-card";
import Image from "next/image";
import sessionPicOne from "../../../../../public/session-one.jpg";
import sessionPicTwo from "../../../../../public/session-two.jpg";
import sessionPicThree from "../../../../../public/session-three.jpg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SessionHoverContent({ ss }: { ss: TStudentSessionJoinResult[] }) {
	return (
		<HoverCardContent className="w-80 py-2 absolute -right-15">
			{" "}
			<div className="flex flex-col gap-2 px-3 ">
				{
					ss.map((session, index) => {
						return (
							<Session
								key={index}
								image={session.sessions?.image?? "/React.png"}
								title={session.sessions?.session_name?? "NA"}
								courseCode={session.sessions?.course_code?? "NA"}
							/>
						);
					})
				}
			</div>
			<div className="flex justify-center mt-3 px-3 ">
				<Link
					href="/my-sessions/upcoming-sessions">
					<Button className=" w-full px-4 py-2 rounded-md bg-orange-400 text-white font-semibold shadow-sm hover:bg-orange-400/85 cursor-pointer">
						Go to My Session
					</Button>
				</Link>
			</div>
		</HoverCardContent>
	);
}

function Session({
  image,
  title,
  courseCode,
}: {
  image: string;
  title: string;
  courseCode: string;
}) {
  return (
    <div>
      <div className="flex space-x-3 items-center cursor-pointer">
        <div className="relative w-[80px] h-[80px] flex-shrink-0 rounded-md overflow-hidden">
          <Image
            src={image}
            alt="session picture"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <div className="text-[0.85rem] font-semibold truncate max-w-[12rem]">
            {title}
          </div>
          <div className="text-[0.75rem] font-light text-muted-foreground">
            {courseCode}
          </div>
        </div>
      </div>
      <hr className="mt-2" />
    </div>
  );
}

