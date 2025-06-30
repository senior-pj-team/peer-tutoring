"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Link from "next/link";
import Image from "next/image";
import { AlertTriangle } from "lucide-react";
import { formatDate, parseISO } from "date-fns";
import { Badge } from "@/components/ui/badge";

export default function RefundHistoryCard({
  refund,
}: {
  refund: TRefundReportJoinResult;
}) {
  if (!refund)
    return (
      <div className="flex items-center gap-3 p-4 border border-red-300 bg-red-50 text-red-600 rounded-md">
        <AlertTriangle className="w-5 h-5" />
        <div>
          <p className="font-semibold">Failed to load refund history</p>
          <p className="text-sm text-red-500">
            Some required session or tutor data is missing.
          </p>
        </div>
      </div>
    );
  const session = refund.student_session?.session;
  const tutor = session.tutor;
  const student = refund.student_session?.student;

  console.log(tutor, tutor?.id);

  return (
    <Card className="rounded-lg shadow-none border">
      <CardHeader className="px-4 pb-2 pt-0">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <strong>Tutor: </strong>
              <Link href={`/tutor-view/${tutor?.id}`}>
                <span className="hover:underline">
                  {tutor?.username ?? "Unknown Tutor"}
                </span>
              </Link>
            </CardTitle>
            <p className="text-sm text-primary font-semibold">
              <span>Refunded to </span>
              <Link href={`/student-view/${student.id}`}>
                <span className="hover:underline">
                  {student.username ?? "Unknown Tutor"}
                </span>
              </Link>
            </p>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <div className="flex items-center gap-0">
              <span className="text-sm text-primary">{refund.type}</span>
              {(refund.type === "refund" ||
                refund.type === "refund and report") &&
                refund.status === "approved" && (
                  <span className="text-sm font-medium text-gray-800">
                    - ${refund.student_session.refunded_amount ?? "NA"}
                  </span>
                )}
            </div>
            <Badge
              variant="outline"
              className={
                refund.status === "approved"
                  ? "text-green-700 border-green-500 bg-green-50 text-xs capitalize ml-auto"
                  : "text-red-700 border-red-500 bg-red-50 text-xs capitalize ml-auto"
              }
            >
              {refund.status}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0 text-xs space-y-1">
        <div className="flex justify-between">
          <span className="text-gray-600">Session:</span>
          <span>{session?.session_name ?? "N/A"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Session Date:</span>
          <span>
            {session?.start_time
              ? formatDate(parseISO(session.start_time), "yyy MMM dd")
              : "N/A"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Processed Date:</span>
          <span>{formatDate(parseISO(refund.created_at), "yyy MMM dd")}</span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="text-xs h-8">
              View Refund Details
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-base">
                Refund Receipt for {session?.session_name ?? "Session"}
              </DialogTitle>
            </DialogHeader>
            <div className="pt-4 space-y-4 text-sm text-gray-700">
              {/* Reason */}
              <div>
                <p className="font-medium text-gray-800">Reason</p>
                <p className="text-gray-600">
                  {refund.reason ? refund.reason : "—"}
                </p>
              </div>

              {/* Description */}
              <div>
                <p className="font-medium text-gray-800">Description</p>
                <p className="text-gray-600 whitespace-pre-wrap">
                  {refund.description ? refund.description : "—"}
                </p>
              </div>

              {/* Refunded info */}
              {(refund.type == "refund" ||
                refund.type == "refund and report") && (
                <div>
                  <p>
                    <strong>Refunded amount:</strong>{" "}
                    {refund.student_session.refunded_amount ?? " — "}
                  </p>
                  <p className="font-medium text-gray-800 mb-1">Receipt</p>
                  <div className="max-h-[400px] overflow-auto rounded">
                    {refund.receipt ? (
                      <Image
                        src={refund.receipt ?? "NA"}
                        alt="Refund receipt"
                        width={400}
                        height={500}
                        className="w-full h-auto object-contain"
                      />
                    ) : (
                      <span>No receipt to show</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
