"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import Rating from "../../features/rating-review/rating";
import { Clock, UserRoundCheck, EllipsisVertical, Folder } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { getRemainingTime } from "@/utils/app/getRemainingTime";
import { formatDate } from "@/utils/app/formatDate";
import { formatTime } from "@/utils/app/formatTime";

type SessionCardProp = {
  studentSession?: TStudentSessionViewCardResult;

  status?: string;
  enrollments?: number;
  pending_refund_students?: number;
  refunded_students?: number;
  paid_students?: number;
  action?: string;

  page?: string;
};

const SessionCard = ({
  studentSession,

  status,
  enrollments,
  pending_refund_students,
  refunded_students,
  paid_students,
  action,

  page,
}: SessionCardProp) => {
  if (!studentSession) return <></>;

  const date= formatDate(studentSession.start_time);
  const start_time= formatTime(studentSession.start_time);
  const end_time= formatTime(studentSession.end_time);
  const {
    session_id,
    image,
    session_name,
    course_code,
    course_name,
    tutor,
    ss,
  } = studentSession;

  const remaining_time =
    ss.status === "enrolled" ? getRemainingTime(date, start_time) : null;
  const router = useRouter();
  const handleCardClick = () => {
    const nextPage =
      page === "admin"
        ? `/admin-dashboard/session/${1}/content`
        : page === "tutor"
        ? `/tutor-dashboard/session/${1}/content`
        : `/session/${page}/${session_id}`;

    router.push(nextPage);
  };
  return (
    <Card
      className="cursor-pointer rounded-none pt-0 pb-2"
      onClick={handleCardClick}
    >
      <CardHeader className="px-0 m-0">
        <div className="relative w-full h-38">
          <Image
            src={image ?? "/React.png"}
            alt="Card image"
            sizes="12"
            fill
            className="object-cover"
          />
          {action && (
            <div className="absolute top-2 right-2 p-2 bg-blue-50/75 rounded-md flex items-center ">
              <DropdownMenu>
                <DropdownMenuTrigger className="cursor-pointer">
                  <EllipsisVertical size={20} color="black" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="text-xs flex items-center gap-2">
                    {action && (
                      <div className="flex items-center gap-x-2">
                        <Folder />
                        <span> Move to archive</span>
                      </div>
                    )}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
        <CardTitle className="flex justify-between items-start gap-5 px-3 mt-1 w-full min-w-0">
          <div className="flex-1 min-w-0">
            <h3 className="xl:text-lg md:text-sm font-semibold overflow-hidden text-ellipsis line-clamp-2 leading-tight break-words">
              {session_name}
            </h3>
          </div>

          {remaining_time && (
            <div className="flex items-center gap-1 xl:text-xs md:text-[0.6rem] text-red-700 shrink-0 mt-1">
              <Clock className="w-4 h-4" />
              <span>{remaining_time}</span>
            </div>
          )}
          {ss.status == "refunded" && (
            <div className="flex items-center gap-1 text-xs shrink-0 mt-1">
              <span className="text-green-500">{ss.status}</span>
            </div>
          )}
          {ss.status == "pending_refund" && (
            <div className="flex items-center gap-1 text-xs shrink-0 mt-1">
              <span className="text-yellow-500">pending</span>
            </div>
          )}
        </CardTitle>

        <CardDescription className="px-3 w-full min-w-0 flex lg:text-xs md:text-[0.65rem]">
          <span className="me-1">{course_code}</span>|
          <span className="ms-1 font-medium truncate overflow-hidden text-ellipsis flex-1">
            {course_name}
          </span>
        </CardDescription>

        <div className="px-3 my-2">
          <div className="flex items-center gap-1 text-[0.75rem] text-gray-700 mb-1">
            <span className="font-semibold">Date:</span>
            <span>{date ? date : "TBD"}</span>
          </div>
          <div className="flex items-center gap-4 text-[0.75rem] text-gray-700">
            <div className="flex items-center gap-1">
              <span className="font-semibold">Start:</span>
              <span>{start_time ? start_time : "-"}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold">End:</span>
              <span>{end_time ? end_time : "-"}</span>
            </div>
          </div>
        </div>

        {status && (
          <div className="px-3 mt-2 w-full">
            <Badge
              variant="outline"
              className={cn(
                "flex gap-1 rounded-full text-xs px-4 py-1 bg-secondary",
                status === "open" ? "text-green-600" : " text-red-600"
              )}
            >
              <span className="text-[0.65rem] md:text-[0.8rem] font-extrabold">
                {status.split("")[0].toUpperCase()}
                {status.slice(1)}
              </span>
            </Badge>
          </div>
        )}

        <div className="px-3 mt-2 w-full">
          {!enrollments && !pending_refund_students && !refunded_students && (
            <div className="flex items-center flex-wrap">
              <div className="relative w-8 h-8 rounded-full overflow-hidden me-3 shrink-0">
                <Image
                  src="/profile.jpg"
                  alt="Tutor avatar"
                  fill
                  className="object-fill"
                />
              </div>
              <div className="text-xs underline me-3">
                <Link href="/tutor-view" onClick={(e) => e.stopPropagation()}>
                  {tutor.name ? tutor.name : "Unknown Tutor"}
                </Link>
              </div>
              |
              <Rating
                className="ms-3"
                rating={tutor.rating ? Math.round(tutor.rating * 10) / 10 : 0}
              />
            </div>
          )}
          <div className="flex items-center flex-wrap gap-2">
            {(enrollments || 0) != 0 && (
              <Badge
                variant="outline"
                className="flex gap-1 rounded-lg text-xs bg-green-100"
              >
                <UserRoundCheck />
                <span className="text-[0.5rem] md:text-[0.6rem] text-gray-800">
                  enrollments: {enrollments}
                </span>
              </Badge>
            )}
            {(pending_refund_students || 0) != 0 && (
              <Badge
                variant="outline"
                className="flex gap-1 rounded-lg text-xs bg-orange-100"
              >
                <UserRoundCheck />
                <span className="text-[0.5rem] md:text-[0.6rem] text-gray-800">
                  disputes: {pending_refund_students}
                </span>
              </Badge>
            )}
            {(refunded_students || 0) != 0 && (
              <Badge
                variant="outline"
                className="flex gap-1 rounded-lg text-xs bg-red-100"
              >
                <UserRoundCheck />
                <span className="text-[0.5rem] md:text-[0.6rem] text-gray-800">
                  refunded: {refunded_students}
                </span>
              </Badge>
            )}
            {(paid_students || 0) != 0 && (
              <Badge
                variant="outline"
                className="flex gap-1 rounded-lg text-xs bg-green-300"
              >
                <UserRoundCheck />
                <span className="text-[0.5rem] md:text-[0.6rem] text-gray-800">
                  released: {paid_students}
                </span>
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default SessionCard;
