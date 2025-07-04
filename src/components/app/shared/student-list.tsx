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
import { getStudentSessionJoin } from "@/data/queries/student-session/get-student-session-join";
import { createClient } from "@/utils/supabase/server";
import GeneralError from "./error";
import { getAvatarFallback } from "@/utils/app/get-avatar-fallback";
import Link from "next/link";
import { GoToChatButton } from "./go-to-chat-button";
import { getUserSession } from "@/utils/get-user-session";

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
	const students = await getStudentSessionJoin(supabase, {
		session_id: Number(session_id),
		status: ["enrolled", "completed", "paid", "refunded"],
	});

	if (!students) return <GeneralError />;

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
				{students.map((student, index) => {
					const studentInfo = student.student;
					const status = student.status;

					return (
						<TableRow key={index} className="hover:bg-muted/50 transition">
							<TableCell>
								<div className="flex items-center gap-3">
									<Avatar className="h-9 w-9">
										<AvatarImage
											src={studentInfo.profile_url ?? ""}
											alt={studentInfo.username ?? "Student"}
										/>
										<AvatarFallback>
											{getAvatarFallback(studentInfo.username ?? "S")}
										</AvatarFallback>
									</Avatar>
									<div className="flex flex-col justify-left gap-2 space-y-0">
										<Link
											href={`/student-view/${studentInfo.id}`}
											className="flex items-center gap-2 group">
											<span className="font-medium group-hover:underline">
												{studentInfo.username ?? "Unnamed"}
											</span>
										</Link>
									</div>
									{!admin && (
										<GoToChatButton
											user1_id={studentInfo.id ?? null}
											user2_id={user ? user.user_id : null}
										/>
									)}
								</div>
							</TableCell>
							<TableCell className="text-sm text-muted-foreground">
								{/* Placeholder if you don’t have email */}
								<span
									title={studentInfo.email}
									className="text-xs text-gray-500 truncate max-w-[200px] mt-0">
									{studentInfo.email ?? "Not Provided"}
								</span>
							</TableCell>
							<TableCell>
								<span className={cn("font-bold", statusColors[status])}>
									{status.replace("_", " ").toUpperCase()}
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
