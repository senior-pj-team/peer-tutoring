import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle } from "lucide-react";
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
	enrolled: "text-yellow-500",
	completed: "text-blue-500",
	paid: "text-green-500",
	refunded: "text-red-500",
	pending_refund: "text-orange-500",
};

const StudentList = async ({ session_id }: { session_id: string }) => {
	const supabase = await createClient();
	const students = await getStudentSessionJoin(supabase, {
		session_id: Number(session_id),
		status: ["enrolled", "completed", "paid"],
	});

	if (!students) return <GeneralError />;

	const user= await getUserSession();

	return (
		<Table className="w-full">
			<TableCaption className="text-sm text-muted-foreground">
				A list of enrolled students
			</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[280px]">Student</TableHead>
					<TableHead>Contact</TableHead>
					<TableHead>Payment Status</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{students.map((student, index) => {
					const studentInfo = student.student;
					const status = student.ss_status;

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
									<Link
										href={`/student-view/${studentInfo.id}`}
										className="flex items-center gap-2 group">
										<span className="font-medium group-hover:underline">
											{studentInfo.username ?? "Unnamed"}
										</span>
									</Link>
									<GoToChatButton
										user1_id={studentInfo.id?? null}
										user2_id={user ? user.user_id : null}
									/>
								</div>
							</TableCell>
							<TableCell className="text-sm text-muted-foreground">
								{/* Placeholder if you don’t have email */}
								Not Provided
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
