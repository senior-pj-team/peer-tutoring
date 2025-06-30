"use client";

import { format, formatDate, parseISO } from "date-fns";
import { useCallback, useRef, useState, useTransition } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAvatarFallback } from "@/utils/app/get-avatar-fallback";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import { updateRefundReport } from "@/data/mutations/refund-report/update-refund-report";
import { useSupabase } from "@/hooks/use-supabase";
import { toast } from "sonner";
import LoadingDots from "@/components/app/shared/loading-dots";
import { AlertTriangle, FileText } from "lucide-react";
import { getBankInfoByUser } from "@/data/queries/bank-info/get-bank-info-by-user";

import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  approveRefundSchema,
  TApproveRefundInput,
} from "@/schema/approve-refund-schema";
import { approveRefund } from "@/actions/approve-refund";
import { sendEmail } from "@/actions/send-email";
import { insertNotification } from "@/data/mutations/notification/insert-notification";
import Image from "next/image";

export default function RefundReportCard({
  data,
}: {
  data: TRefundReportJoinResult;
}) {
  const supabase = useSupabase();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [currentAction, setCurrentAction] = useState<
    "approve" | "reject" | null
  >(null);

  //states for approve dialog box
  const [studentBankInfo, setStudentBankInfo] = useState<
    TBankInfoResult[] | null
  >(null);
  const [isDragging, setIsDragging] = useState(false);

  const form = useForm<TApproveRefundInput>({
    resolver: zodResolver(approveRefundSchema),
    defaultValues: {
      receipt: undefined,
    },
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (
    !data ||
    !data.student_session?.session ||
    !data.student_session?.session.tutor
  ) {
    return (
      <div className="flex items-center gap-3 p-4 border border-red-300 bg-red-50 text-red-600 rounded-md">
        <AlertTriangle className="w-5 h-5" />
        <div>
          <p className="font-semibold">Failed to load refund request</p>
          <p className="text-sm text-red-500">
            Some required session or tutor data is missing.
          </p>
        </div>
      </div>
    );
  }

  const session = data.student_session.session;
  const student = data.student_session.student;
  const tutor = session.tutor;

  const handleReject = () => {
    setCurrentAction("reject");
    startTransition(async () => {
      const rejectResult = await updateRefundReport(
        supabase,
        { status: "rejected", processed_at: new Date().toISOString() },
        { id: data.id }
      );

      if (rejectResult) {
        toast.success("Rejected", {
          description: (
            <span className="text-muted-foreground text-sm">
              Rejected the ${data.type} on {format(Date.now(), "yyyy MMMM dd")}
            </span>
          ),
        });

        await Promise.all([
          sendResponseEmail("rejected"),
          sendNotification("rejected"),
        ]);

        window.location.reload();
      } else {
        toast.error("Something went wrong", {
          description: `Error rejecting this ${data.type}`,
        });
      }
    });
  };

  const handleApprove = async () => {
    if (data.type == "report") {
      setCurrentAction("approve");
      startTransition(async () => {
        const rejectResult = await updateRefundReport(
          supabase,
          { status: "approved" },
          { id: data.id }
        );

        if (rejectResult) {
          toast.success("Approved", {
            description: (
              <span className="text-muted-foreground text-sm">
                Approved the ${data.type} on{" "}
                {format(Date.now(), "yyyy MMMM dd")}
              </span>
            ),
          });

          await Promise.all([
            sendResponseEmail("approved"),
            sendNotification("approved"),
          ]);
          window.location.reload();
        } else {
          toast.error("Something went wrong", {
            description: `Error rejecting this ${data.type}`,
          });
        }
      });
    } else {
      const bankInfo = await getBankInfoByUser(supabase, {
        user_id: student.id ?? "",
        account_type: ["student_refund", "refund_transfer"],
      });
      setStudentBankInfo(bankInfo);
      setIsApproveDialogOpen(true);
    }
  };

  const handleApproveConfirm = async (formValues: TApproveRefundInput) => {
    setCurrentAction("approve");
    startTransition(async () => {
      const response = await approveRefund(
        data.student_session.id,
        data.id,
        formValues
      );

      if (response.success) {
        toast.success("Approved", {
          description: (
            <span className="text-muted-foreground text-sm">
              Approved the ${data.type} on {format(Date.now(), "yyyy MMMM dd")}
            </span>
          ),
        });

        await Promise.all([
          sendResponseEmail("approved"),
          sendNotification("approved"),
        ]);

        window.location.reload();
      } else {
        toast.error("Something went wrong", {
          description: `Error approving this ${data.type}. ${response.error.message}`,
        });
      }
    });
    window.location.reload();
  };

  const sendResponseEmail = useCallback(
    async (status: "approved" | "rejected") => {
      const title = `${data.type} ${status}`;
      const detail =
        status === "approved"
          ? `Your ${data.type}  has been approved. The refunded amount will be transferred to your bank account shortly.`
          : `Your ${data.type}  has been rejected. Please contact support for further details.`;
      const preview = `Refund ${status}`;

      const studentEmailPromise = sendEmail({
        preview,
        title,
        detail,
        to: student.email ?? "",
      });

      if (status === "approved") {
        const tutorEmailPromise = sendEmail({
          preview: `Student ${data.type} approved`,
          title: `Student ${data.type} approved`,
          detail: `${student.username}'s ${data.type} is approved for ${session.session_name} on ${formatDate(
            Date.now(),
            "yyyy MMMM dd"
          )}. Reason: ${data.reason}. ${data.description ?? ""}`,
          to: tutor?.email ?? "",
        });

        await Promise.all([studentEmailPromise, tutorEmailPromise]);
      } else {
        await studentEmailPromise;
      }
    },
    [student.email, tutor?.email]
  );

  const sendNotification = useCallback(
    async (status: "approved" | "rejected") => {
      if (!student || !tutor) return;

      const title = `${data.type} ${status}`;
      const body =
        status === "approved"
          ? `Your ${data.type} for ${session.session_name} has been approved on ${formatDate(
              Date.now(),
              "yyyy MMMM dd"
            )}.`
          : `Your ${data.type} for ${session.session_name} has been rejected on ${formatDate(
              Date.now(),
              "yyyy MMMM dd"
            )}.`;

      const studentNotif = insertNotification(
        supabase,
        title,
        body,
        student.id ?? "",
        "student"
      );

      if (status === "approved") {
        const tutorNotif = insertNotification(
          supabase,
          `Student ${data.type} approved`,
          `${student.username}'s ${data.type} is approved for ${session.session_name} on ${formatDate(
            Date.now(),
            "yyyy MMMM dd"
          )}.`,
          tutor.id ?? "",
          "tutor"
        );

        await Promise.all([studentNotif, tutorNotif]);
      } else {
        await studentNotif;
      }
    },
    [student, tutor, supabase]
  );
  return (
    <>
      <Card className="hover:shadow-sm transition-shadow p-0">
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Left: Session + Tutor */}
            <div className="space-y-2">
              <p className="font-semibold text-base text-gray-800">
                {session.session_name ?? "Untitled Session"}
              </p>
              <p className="text-sm text-muted-foreground">Tutor</p>
              <div className="flex items-center gap-2">
                <Avatar className="w-9 h-9">
                  <AvatarImage src={tutor?.profile_url ?? ""} />
                  <AvatarFallback>
                    {getAvatarFallback(tutor?.username ?? "T")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-gray-800 hover:underline">
                    <Link href={`/tutor-view/${tutor?.id}`}>
                      {tutor?.username ?? "Unknown"}
                    </Link>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {tutor?.email ?? " - "}
                  </p>
                </div>
              </div>
            </div>

            {/* Middle: Student */}
            <div className="space-y-2 mt-10">
              <p className="text-sm text-muted-foreground">Student</p>
              <div className="flex items-center gap-2">
                <Avatar className="w-9 h-9">
                  <AvatarImage src={student?.profile_url ?? ""} />
                  <AvatarFallback>
                    {getAvatarFallback(student?.username ?? "S")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-gray-800 hover:underline">
                    <Link href={`/student-view/${student?.id}`}>
                      {student?.username ?? "Unknown"}
                    </Link>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {student?.email ?? " - "}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Status + Date + Button */}
            <div className="flex flex-col items-start md:items-end gap-2">
              <div className="flex items-center gap-3">
                <p className="text-sm text-muted-foreground">
                  {format(new Date(data.created_at), "yyyy MMMM dd")}
                </p>
                {data.type === "refund" && (
                  <Badge
                    variant="outline"
                    className="text-yellow-700 border-yellow-500 bg-yellow-50 text-xs capitalize"
                  >
                    Refund only
                  </Badge>
                )}
                {data.type === "refund and report" && (
                  <Badge
                    variant="outline"
                    className="text-purple-700 border-purple-500 bg-purple-50 text-xs capitalize"
                  >
                    Refund and report
                  </Badge>
                )}
                {data.type === "report" && (
                  <Badge
                    variant="outline"
                    className="text-red-700 border-red-500 bg-red-50 text-xs capitalize"
                  >
                    Report only
                  </Badge>
                )}
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsDialogOpen(true)}
                >
                  View Detail
                </Button>
                {data.status == "pending" ? (
                  <div className="flex gap-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      className="flex-1"
                      onClick={handleReject}
                    >
                      {isPending && currentAction === "reject" ? (
                        <LoadingDots />
                      ) : (
                        "Reject"
                      )}
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      className="flex-1"
                      onClick={handleApprove}
                    >
                      {isPending && currentAction === "approve" ? (
                        <LoadingDots />
                      ) : (
                        "Approve"
                      )}
                    </Button>
                  </div>
                ) : (
                  <Badge
                    variant="outline"
                    className={
                      data.status === "approved"
                        ? "text-green-700 border-green-500 bg-green-50 text-xs capitalize ml-auto mt-1"
                        : "text-red-700 border-red-500 bg-red-50 text-xs capitalize ml-auto"
                    }
                  >
                    {data.status}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* View Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Refund Request Detail
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-center gap-3 mb-5">
              <strong className="text-lg ">
                {session.session_name ?? "Untitled Session"}
              </strong>
              <span className="text-xs">
                {format(new Date(data.created_at), "yyyy MMMM dd")}
              </span>
            </div>
            <p>
              <strong>Student:</strong>{" "}
              <Link href={`/student-view/${student?.id}`}>
                {student?.username ?? "Unknown"}
              </Link>
            </p>
            <p>
              <strong>Tutor:</strong>{" "}
              <Link href={`/tutor-view/${tutor?.id}`}>
                {tutor?.username ?? "Unknown"}
              </Link>
            </p>
            <p>
              <strong>Processed on:</strong>{" "}
              {data.processed_at ? formatDate(parseISO(data.processed_at), "yyy MMMM dd") : "NA"}
            </p>
            <p>
              <strong>Reason:</strong> {data.reason ?? "—"}
            </p>
            <div>
              <strong>Description</strong>
              <p className="whitespace-pre-wrap">{data.description ?? " — "}</p>
            </div>
            {data.status != "pending" && data.type != "report" && (
              <div>
                <p className="font-medium text-gray-800 mb-1">Receipt</p>
                <div className="max-h-[400px] overflow-auto rounded">
                  {data.receipt ? (
                    <Image
                      src={data.receipt ?? "NA"}
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

      {/* Approve Dialog */}
      <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
        <DialogContent
          className="max-w-md sm:max-w-lg"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Approve Refund Request</DialogTitle>
          </DialogHeader>
          <div className="text-sm text-gray-700 space-y-4">
            {studentBankInfo ? (
              studentBankInfo.map((bankInfo) => (
                <div key={bankInfo.id}>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Session:</span>
                      <span>{session.session_name || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Student:</span>
                      <Link href={`/student-view/${student?.id}`}>
                        <span className="hover:underline">
                          {student?.username || "N/A"}
                        </span>
                      </Link>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tutor:</span>
                      <Link href={`/tutor-view/${tutor?.id}`}>
                        <span className="hover:underline">
                          {tutor?.username || "N/A"}
                        </span>
                      </Link>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg mt-2">
                    <h3 className="font-medium mb-2">Bank Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bank:</span>
                        <span>{bankInfo.bank_name || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Account Name:</span>
                        <span>{bankInfo.account_name || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Account Number:</span>
                        <span>{bankInfo.account_number || "N/A"}</span>
                      </div>
                    </div>
                  </div>

                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(handleApproveConfirm)}
                      className="space-y-3 my-5"
                    >
                      <FormField
                        control={form.control}
                        name="receipt"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Upload Transfer Receipt</FormLabel>
                            <FormControl>
                              <div
                                className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer ${
                                  isDragging
                                    ? "border-blue-400 bg-blue-50"
                                    : "border-gray-300"
                                }`}
                                onClick={() => fileInputRef.current?.click()}
                                onDragOver={(e) => {
                                  e.preventDefault();
                                  setIsDragging(true);
                                }}
                                onDragLeave={() => setIsDragging(false)}
                                onDrop={(e) => {
                                  e.preventDefault();
                                  setIsDragging(false);
                                  if (
                                    e.dataTransfer.files &&
                                    e.dataTransfer.files.length > 0
                                  ) {
                                    field.onChange(e.dataTransfer.files[0]);
                                    e.dataTransfer.clearData();
                                  }
                                }}
                              >
                                <div className="text-gray-500 text-sm my-5">
                                  {field.value ? (
                                    <div className="flex items-center gap-2 justify-center text-sm text-gray-700">
                                      <FileText className="w-4 h-4" />
                                      <span>{field.value.name}</span>
                                    </div>
                                  ) : (
                                    <span>
                                      Drag and drop receipt here or click to
                                      browse
                                    </span>
                                  )}
                                </div>
                                <input
                                  type="file"
                                  ref={fileInputRef}
                                  className="hidden"
                                  onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                      field.onChange(e.target.files[0]);
                                    }
                                  }}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          type="button"
                          onClick={() => {
                            form.reset();
                            setIsApproveDialogOpen(false);
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="default"
                          type="submit"
                          disabled={isPending}
                        >
                          {isPending && currentAction === "approve" ? (
                            <LoadingDots />
                          ) : (
                            "Confirm Approve"
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              ))
            ) : (
              <span className="text-red-400">
                Error displaying bank information
              </span>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
