import React from "react";
import Link from "next/link";
import { format } from "date-fns";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import GeneralError from "./error";

import { createClient } from "@/utils/supabase/server";
import { getUserSession } from "@/utils/get-user-session";
import { getUserById } from "@/data/queries/user/get-user-by-id";
import { getAvatarFallback } from "@/utils/app/get-avatar-fallback";
import { GoToChatButton } from "./go-to-chat-button";

const StudentInfo = async ({ student_id }: { student_id: string | null }) => {
	const supabase = await createClient();
	if (!supabase || !student_id) return <GeneralError />;

	const student = await getUserById(supabase, student_id);
	if (!student) return <GeneralError />;

  const user= await getUserSession();

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-white gap-x-25">
      {/* Avatar */}
      <Avatar className="w-40 h-40 md:w-50 md:h-50">
        <AvatarImage src={student.profile_url ?? ""} alt="User Avatar" />
        <AvatarFallback className="text-3xl">
          {student.username ? getAvatarFallback(student.username) : "?"}
        </AvatarFallback>
      </Avatar>

      {/* Info */}
      <div className="text-center md:text-left flex-1 space-y-2">
        <div className="flex ietms-center gap-3 justify-start">
            <h1 className="text-2xl font-semibold text-orange-700">
              {student.username}
            </h1>
            {user && <GoToChatButton user1_id={user?.user_id} user2_id={student.id} size={25}/>}
        </div>
        <p className="text-muted-foreground text-sm">{student.email}</p>

				<div className="flex flex-wrap gap-2 text-sm mt-2">
					<span className="bg-orange-50 text-orange-800 px-2 py-1 rounded">
						🎓 Faculty: {student.school}
					</span>
					<span className="bg-orange-50 text-orange-800 px-2 py-1 rounded">
						📘 Major: {student.major}
					</span>
					<span className="bg-orange-50 text-orange-800 px-2 py-1 rounded">
						🗓️ Year: {student.year}
					</span>
				</div>

				{student.phone_number && (
					<p className="text-sm text-muted-foreground mt-1">
						📞 Phone: {student.phone_number}
					</p>
				)}

				{student.created_at && (
					<p className="text-sm text-muted-foreground">
						📅 Joined on:{" "}
						{format(new Date(student.created_at), "MMMM dd, yyyy")}
					</p>
				)}

				{/* Social Links */}
				{student.social_links &&
					Object.keys(student.social_links).length > 0 && (
						<div className="flex gap-3 mt-3 flex-wrap">
							{Object.entries(student.social_links).map(([platform, url]) => (
								<Link
									key={platform}
									href={url}
									target="_blank"
									className="text-sm text-blue-600 hover:underline">
									🔗 {platform.charAt(0).toUpperCase() + platform.slice(1)}
								</Link>
							))}
						</div>
					)}
			</div>
		</div>
	);
};

export default StudentInfo;
