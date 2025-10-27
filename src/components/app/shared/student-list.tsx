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
import { getSessionsbyId } from "@/data/queries/sessions/get-sessions-by-Id";
import { formatDate } from "date-fns";

const statusColors: Record<string, string> = {
  enrolled: "text-green-400",
  completed: "text-orange-500",
  paid: "text-green-600",
  refunded: "text-red-500",
};

const StudentList = async ({
  session_id,
  admin,
  isPaid,
}: {
  session_id: string;
  admin?: boolean;
  isPaid?: boolean;
}) => {
  const supabase = await createClient();

  const columns =
    "student_session_id, session_id, student_session_status, student_id, session_status, student_id, student_username, student_email, student_profile_url";
  const studentSessions = await getStudentSessionView(supabase, {
    columns,
    session_id: Number(session_id),
    status: ["enrolled", "completed", "paid", "refunded"],
  });

  let session: TSessionsResult[] | null = null;
  if (isPaid) {
    console.log("called");
    session = await getSessionsbyId(supabase, {
      session_id: Number(session_id),
      status: ["archived"],
      columns: "payment_evidence, price, transferred_amount, paid_out_at",
    });
    console.log(session);
  }

  if (!studentSessions) return <GeneralError />;

  const user = await getUserSession();

  return (
    <>
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
                          studentSession.student_username ?? "S"
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col justify-left gap-2 space-y-0">
                      <Link
                        href={`/home/student-view/${studentSession.student_id}`}
                        className="flex items-center gap-2 group"
                      >
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
                    className="text-xs text-gray-500 truncate max-w-[200px] mt-0"
                  >
                    {studentSession.student_email ?? "Not Provided"}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "font-bold",
                      statusColors[
                        studentSession.student_session_status ?? "NA"
                      ]
                    )}
                  >
                    {studentSession.student_session_status}
                  </span>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {isPaid && session && session[0] && session[0].payment_evidence && (
        <div className="text-sm text-gray-700 space-y-4 w-[50%] mt-5">
          <div className="p-4 rounded-lg space-y-2">
            <p className="text-sm font-medium">Transfer Slip:</p>
            <img
              src={session[0].payment_evidence}
              alt="Refund slip"
              className="mt-1 rounded-lg border max-w-xs"
            />
            {session[0].price && (
              <div className="flex justify-between">
                <span className="text-gray-600">Session price:</span>
                <span className="font-extrabold">
                  {session[0].price || "N/A"} ฿
                </span>
              </div>
            )}
            {session[0].transferred_amount && (
              <div className="flex justify-between">
                <span className="text-gray-600">Transferred amount:</span>
                <span className="font-extrabold">
                  {session[0].transferred_amount || "N/A"} ฿
                </span>
              </div>
            )}
            {session[0].paid_out_at && (
              <div className="flex justify-between">
                <span className="text-gray-600">Paid out at:</span>
                <span className="font-extrabold">
                  {formatDate(session[0].paid_out_at ?? "", "dd MMMM yy") ||
                    "N/A"}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default StudentList;
