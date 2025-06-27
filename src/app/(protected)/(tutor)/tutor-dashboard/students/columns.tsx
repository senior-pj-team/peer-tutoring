"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { getAvatarFallback } from "@/utils/app/get-avatar-fallback";
import { formatDate, parseISO } from "date-fns";

export const columns: ColumnDef<TStudentSessionJoinResult>[] = [
  {
    id: "student",
    header: "Student",
    cell: ({ row }) => {
      const student = row.original.student;
      const studentId = student.id;
      const studentName = student.username;
      const studentImage = student.profile_url;
      const studentEmail= student.email;

      return (
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage
              src={studentImage ?? "no-image"}
              alt={studentName ?? "Unknown"}
            />
            <AvatarFallback>
              {getAvatarFallback(studentName ?? "U")}
            </AvatarFallback>
          </Avatar>
          <div>
              <Link href={`/student-view/${studentId}`}>
                <span className="hover:underline cursor-pointer">
                  {studentName}
                </span>
              </Link>
              <div className="truncate">
                 <span>{studentEmail}</span>
              </div>
          </div>
        </div>
      );
    },
  },
  {
    id: "session",
    header: "Session",
    cell: ({ row }) => {
      const session = row.original.sessions;
      return (
        <>
          <div className="truncate">{session?.session_name ?? "Unknown"}</div>
          <div className="truncate">{session?.course_name ?? "Course"}</div>
        </>
      );
    },
  },
  {
    id: "enrolled_at",
    header: "Enrolled Date",
    cell: ({ row }) => {
      const createdAt = row.original.created_at;
      if (!createdAt) return "-";
      const displayDate = formatDate(parseISO(createdAt), "yyy MMMM dd");
      return <div>{displayDate}</div>;
    },
  },
  {
    id: "released_amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = row.original.amount_from_student ?? 0;
      const formatted = new Intl.NumberFormat("th-TH", {
        style: "currency",
        currency: "THB",
      }).format(amount);
      return <div>{formatted}</div>;
    },
  },
  {
    id: "payment_status",
    header: "Payment Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const color =
        status === "enrolled"
          ? "text-yellow-600"
          : status === "paid"
            ? "text-green-600"
            : status === "refunded"
              ? "text-red-500"
              : "text-yellow-600";

      const label =
        status === "enrolled"
          ? "Held"
          : status === "paid"
            ? "Paid"
            : status === "refunded"
              ? "Refunded"
              : "Held";

      return <span className={`font-semibold ${color}`}>{label}</span>;
    },
  },
  {
    id: "search",
    accessorFn: (row) =>
      `${row.sessions?.session_name} ${row.student.username}`,
    header: () => null,
    cell: () => null,
    enableColumnFilter: true,
    filterFn: "fuzzy",
  },
];
