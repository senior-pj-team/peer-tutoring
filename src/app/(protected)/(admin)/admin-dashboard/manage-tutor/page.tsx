"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/custom/shared/data-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info, AlertCircle, CheckCircle, Loader2 } from "lucide-react";

interface Tutor {
  id: string;
  name: string;
  email: string;
  warnings: number;
  suspendedUntil: string | null;
  lastWarning?: string;
}

const mockTutors: Tutor[] = [
  {
    id: "tutor-1",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    warnings: 3,
    suspendedUntil: null,
    lastWarning: "Late submission of reports - May 1, 2025",
  },
  {
    id: "tutor-2",
    name: "Sophia Tan",
    email: "sophia.tan@example.com",
    warnings: 5,
    suspendedUntil: "2025-05-10",
    lastWarning: "Multiple student complaints - April 28, 2025",
  },
  {
    id: "tutor-3",
    name: "Marcus Lee",
    email: "marcus.lee@example.com",
    warnings: 1,
    suspendedUntil: null,
    lastWarning: "Missed tutoring session - April 15, 2025",
  },
];

export default function ManageTutorPage() {
  const [data, setData] = useState(mockTutors);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredData = data.filter((tutor) =>
    tutor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Tutor Management
          </h1>
          <p className="text-muted-foreground">
            Manage warnings and account suspensions
          </p>
        </div>
        <Input
          placeholder="Search tutors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-[300px]"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tutor Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="text-sm font-medium text-muted-foreground">
                Active Tutors
              </h3>
              <p className="text-2xl font-bold">
                {
                  data.filter(
                    (t) =>
                      !t.suspendedUntil ||
                      new Date(t.suspendedUntil) <= new Date()
                  ).length
                }
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="text-sm font-medium text-muted-foreground">
                Suspended Tutors
              </h3>
              <p className="text-2xl font-bold">
                {
                  data.filter(
                    (t) =>
                      t.suspendedUntil &&
                      new Date(t.suspendedUntil) > new Date()
                  ).length
                }
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="text-sm font-medium text-muted-foreground">
                Tutors with 3+ Warnings
              </h3>
              <p className="text-2xl font-bold">
                {data.filter((t) => t.warnings >= 3).length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <DataTable
        columns={[
          {
            accessorKey: "name",
            header: "Tutor Name",
            cell: ({ row }) => {
              const tutor = row.original;
              return (
                <div>
                  <p className="font-medium">{tutor.name}</p>
                  <p className="text-sm text-gray-500">{tutor.email}</p>
                </div>
              );
            },
          },
          {
            id: "status",
            header: "Account Status",
            cell: ({ row }) => {
              const tutor = row.original;
              if (
                tutor.suspendedUntil &&
                new Date(tutor.suspendedUntil) > new Date()
              ) {
                const suspensionDate = new Date(tutor.suspendedUntil);
                const diffInDays = Math.ceil(
                  (suspensionDate.getTime() - new Date().getTime()) /
                    (1000 * 3600 * 24)
                );
                return (
                  <div className="flex items-center gap-2">
                    <Badge variant="destructive" className="gap-1">
                      <AlertCircle className="h-3 w-3" />
                      Suspended
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {diffInDays} day{diffInDays !== 1 ? "s" : ""} remaining
                    </span>
                  </div>
                );
              }
              return (
                <Badge variant="outline" className="gap-1">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  Active
                </Badge>
              );
            },
          },
          {
            id: "warnings",
            header: "Warnings",
            cell: ({ row }) => {
              const tutor = row.original;
              return (
                <div className="flex items-center gap-2">
                  <div
                    className={`h-2 rounded-full ${
                      tutor.warnings >= 5
                        ? "bg-red-500"
                        : tutor.warnings >= 3
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                    style={{ width: `${(tutor.warnings / 5) * 100}%` }}
                  />
                  <span>{tutor.warnings} / 5</span>
                </div>
              );
            },
          },
          {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
              const tutor = row.original;
              const isSuspended =
                tutor.suspendedUntil &&
                new Date(tutor.suspendedUntil) > new Date();
              const canSuspend = tutor.warnings >= 5 && !isSuspended;

              return (
                <div className="flex flex-wrap gap-2">
                  {/* Warning Dialog - Now self-contained */}
                  <WarningDialog tutor={tutor} setData={setData} />

                  {/* Suspend Dialog - Now self-contained */}
                  <SuspendDialog
                    tutor={tutor}
                    setData={setData}
                    canSuspend={canSuspend}
                  />

                  {tutor.warnings > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setData((prev) =>
                          prev.map((t) =>
                            t.id === tutor.id
                              ? { ...t, warnings: Math.max(t.warnings - 1, 0) }
                              : t
                          )
                        );
                      }}
                    >
                      Remove Warning
                    </Button>
                  )}

                  {isSuspended && (
                    <UnsuspendButton tutor={tutor} setData={setData} />
                  )}
                </div>
              );
            },
          },
        ]}
        data={filteredData}
        emptyState={
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">No tutors found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        }
      />
    </div>
  );
}

// Extracted Warning Dialog Component
function WarningDialog({ tutor, setData }: { tutor: Tutor; setData: any }) {
  const [warningText, setWarningText] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSendWarning = () => {
    setIsSending(true);
    setTimeout(() => {
      setData((prev: Tutor[]) =>
        prev.map((t) =>
          t.id === tutor.id
            ? {
                ...t,
                warnings: Math.min(t.warnings + 1, 5),
                lastWarning: warningText,
              }
            : t
        )
      );
      setWarningText("");
      setIsSending(false);
    }, 1000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Send Warning
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-500" />
            <span>Send Warning to {tutor.name}</span>
          </DialogTitle>
          <DialogDescription>
            This will increment the tutor's warning count by 1.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {tutor.lastWarning && (
            <Alert variant="default" className="mb-4">
              <Info className="h-4 w-4" />
              <AlertTitle>Previous Warning</AlertTitle>
              <AlertDescription>{tutor.lastWarning}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <label
              htmlFor="warningReason"
              className="block text-sm font-medium text-gray-700"
            >
              Reason for Warning
            </label>
            <Textarea
              id="warningReason"
              placeholder="Explain the reason for this warning..."
              value={warningText}
              onChange={(e) => setWarningText(e.target.value)}
              className="min-h-[120px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setWarningText("")}
          >
            Clear
          </Button>
          <Button
            type="button"
            disabled={!warningText.trim() || isSending}
            onClick={handleSendWarning}
          >
            {isSending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Confirm Warning"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Extracted Suspend Dialog Component
function SuspendDialog({
  tutor,
  setData,
  canSuspend,
}: {
  tutor: Tutor;
  setData: any;
  canSuspend: boolean;
}) {
  const [suspendDuration, setSuspendDuration] = useState("");
  const [isSuspending, setIsSuspending] = useState(false);

  const handleSuspend = () => {
    setIsSuspending(true);
    setTimeout(() => {
      const now = new Date();
      const days = parseInt(suspendDuration);
      now.setDate(now.getDate() + days);
      const until = now.toISOString();

      setData((prev: Tutor[]) =>
        prev.map((t) =>
          t.id === tutor.id ? { ...t, suspendedUntil: until } : t
        )
      );
      setSuspendDuration("");
      setIsSuspending(false);
    }, 1000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm" disabled={!canSuspend}>
          Suspend
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <span>Suspend {tutor.name}</span>
          </DialogTitle>
          <DialogDescription>
            This tutor has reached 5 warnings. Please select suspension
            duration.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              Suspending will prevent this tutor from accessing the platform.
            </AlertDescription>
          </Alert>
          <div className="space-y-2">
            <label
              htmlFor="suspendDuration"
              className="block text-sm font-medium text-gray-700"
            >
              Suspension Duration
            </label>
            <Select value={suspendDuration} onValueChange={setSuspendDuration}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 day</SelectItem>
                <SelectItem value="3">3 days</SelectItem>
                <SelectItem value="5">5 days</SelectItem>
                <SelectItem value="7">7 days</SelectItem>
                <SelectItem value="14">14 days</SelectItem>
                <SelectItem value="30">30 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setSuspendDuration("")}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={!suspendDuration || isSuspending}
            onClick={handleSuspend}
          >
            {isSuspending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Confirm Suspension"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Extracted Unsuspend Button Component
function UnsuspendButton({ tutor, setData }: { tutor: Tutor; setData: any }) {
  const [isReleasing, setIsReleasing] = useState(false);

  const handleRelease = () => {
    setIsReleasing(true);
    setTimeout(() => {
      setData((prev: Tutor[]) =>
        prev.map((t) =>
          t.id === tutor.id ? { ...t, suspendedUntil: null } : t
        )
      );
      setIsReleasing(false);
    }, 1000);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleRelease}
      disabled={isReleasing}
    >
      {isReleasing ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        "Lift Suspension"
      )}
    </Button>
  );
}
