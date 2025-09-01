import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import GeneralError from "./error";
import { getAvatarFallback } from "@/utils/app/get-avatar-fallback";
import Link from "next/link";
import { GoToChatButton } from "./go-to-chat-button";
import { getUserSession } from "@/utils/get-user-session";
import { getStudentSessionView } from "@/data/queries/student-session/get-student-session-view";

const statusColors: Record<string, string> = {
	enrolled: "text-green-400",
	completed: "text-orange-500",
	paid: "text-green-600",
	refunded: "text-red-500",
};

const StudentList = async ({
	session_id,
	admin,
}: {
	session_id: string;
	admin?: boolean;
}) => {
	const supabase = await createClient();

	const columns =
		"student_session_id, session_id, student_session_status, student_id, session_status, student_id, student_username, student_email, student_profile_url";
	const studentSessions = await getStudentSessionView(supabase, {
		columns,
		session_id: Number(session_id),
		status: ["enrolled", "completed", "paid", "refunded"],
	});

	if (!studentSessions) return <GeneralError />;

	const user = await getUserSession();

	return (
		<Table className="w-full">
			<TableCaption className="text-sm text-muted-foreground">
				A list of enrolled students
			</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[350px]">Student</TableHead>
					<TableHead>Contact</TableHead>
					<TableHead>Payment Status</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{studentSessions.map((studentSession, index) => {
					return (
						<TableRow key={index} className="hover:bg-muted/50 transition">
							<TableCell>
								<div className="flex items-center gap-3">
									<Avatar className="h-9 w-9">
										<AvatarImage
											src={studentSession.student_profile_url ?? ""}
											alt={studentSession.student_username ?? "Student"}
										/>
										<AvatarFallback>
											{getAvatarFallback(
												studentSession.student_username ?? "S",
											)}
										</AvatarFallback>
									</Avatar>
									<div className="flex flex-col justify-left gap-2 space-y-0">
										<Link
											href={`/student-view/${studentSession.student_id}`}
											className="flex items-center gap-2 group">
											<span className="font-medium group-hover:underline">
												{studentSession.student_username ?? "Unnamed"}
											</span>
										</Link>
									</div>
									{!admin && (
										<GoToChatButton
											user1_id={studentSession.student_id ?? null}
											user2_id={user ? user.user_id : null}
										/>
									)}
								</div>
							</TableCell>
							<TableCell className="text-sm text-muted-foreground">
								{/* Placeholder if you don’t have email */}
								<span
									title={studentSession.student_email ?? "NA"}
									className="text-xs text-gray-500 truncate max-w-[200px] mt-0">
									{studentSession.student_email ?? "Not Provided"}
								</span>
							</TableCell>
							<TableCell>
								<span
									className={cn(
										"font-bold",
										statusColors[studentSession.student_session_status ?? "NA"],
									)}>
									{studentSession.student_session_status}
								</span>
							</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
};

export default StudentList;
