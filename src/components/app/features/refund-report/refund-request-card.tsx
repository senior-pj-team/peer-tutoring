"use client";

import { format } from "date-fns";
import { useState, useTransition } from "react";
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

export default function RefundRequestCard({
    refund,
}: {
    refund: TRefundReportJoinResult;
}) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const supabase= useSupabase();
    const [isPending, startTransition] = useTransition();

    if (
        !refund ||
        !refund.student_session?.session ||
        !refund.student_session?.session.tutor
    )
        return null;

    const session = refund.student_session.session;
    const student = refund.student_session.student;
    const tutor = session.tutor;

    const handleReject= ()=>{
        startTransition(async ()=>{
            const rejectResult= await updateRefundReport(supabase, {status: "rejected"}, {id: refund.id})
            if(rejectResult){
                // toasts
            }else{
                // toasts
            }
        })
        window.location.reload();
    }

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
                                        {getAvatarFallback(student?.username ?? "T")}
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
                                    {format(new Date(refund.created_at), "yyyy MMMM dd")}
                                </p>
                                {refund.type === "refund" && (
                                    <Badge
                                        variant="outline"
                                        className="text-yellow-700 border-yellow-500 bg-yellow-50 flex items-center gap-1 px-2 py-1 text-xs font-medium capitalize"
                                    >
                                        refund only
                                    </Badge>
                                )}
                                {refund.type === "refund and report" && (
                                    <Badge
                                        variant="outline"
                                        className="text-red-700 border-red-500 bg-red-50 flex items-center gap-1 px-2 py-1 text-xs font-medium capitalize"
                                    >
                                        reported
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
                                <div className="flex gap-2">
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        className="flex-1"
                                        onClick={() => handleReject()}
                                    >
                                        {isPending? "Loading..." : "Reject"}
                                    </Button>
                                    <Button
                                        variant="default"
                                        size="sm"
                                        className="flex-1"
                                        onClick={() => { }}
                                    >
                                        Approve
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Detail Dialog */}
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
                                {format(new Date(refund.created_at), "yyyy MMMM dd")}
                            </span>
                        </div>
                        <div className="space-y-1">
                            <p>
                                <strong>Student:</strong> <Link href={`/student-view/${student?.id}`}>
                                    {student?.username ?? "Unknown"}
                                </Link>
                            </p>
                            <p>
                                <strong>Tutor:</strong> <Link href={`/tutor-view/${tutor?.id}`}>
                                    {tutor?.username ?? "Unknown"}
                                </Link>
                            </p>
                            <p>
                                <strong>Reason:</strong> {refund.reason ?? "—"}
                            </p>
                            <div>
                                <strong>Description</strong>
                                <p className="whitespace-pre-wrap">
                                    {refund.description ?? " — "}
                                </p>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
