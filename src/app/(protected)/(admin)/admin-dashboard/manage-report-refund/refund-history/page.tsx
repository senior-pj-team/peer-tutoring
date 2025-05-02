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

// Define the refund record type
interface RefundRecord {
  sessionId: string;
  tutorName: string;
  studentName: string;
  amount: number;
  date: string; // refund processed date
  sessionDate: string;
  sessionDuration: string;
  subject: string;
}

// Dummy refund history data
const refundHistory: RefundRecord[] = [
  {
    sessionId: "REF-2003",
    tutorName: "Ms. Sophia Lim",
    studentName: "Alice Wong",
    amount: 90.0,
    date: "2024-05-02",
    sessionDate: "2024-05-01",
    sessionDuration: "60 mins",
    subject: "IELTS Prep",
  },
  {
    sessionId: "REF-2002",
    tutorName: "Dr. Ken Nakamura",
    studentName: "Bob Tan",
    amount: 120.5,
    date: "2024-05-01",
    sessionDate: "2024-04-30",
    sessionDuration: "90 mins",
    subject: "Physics II",
  },
  {
    sessionId: "REF-2001",
    tutorName: "Ms. Grace Chua",
    studentName: "Chai Anan",
    amount: 75.0,
    date: "2024-05-01",
    sessionDate: "2024-04-29",
    sessionDuration: "45 mins",
    subject: "Beginner Thai",
  },
];

// Utility to group refunds by date
const groupByDate = (
  records: RefundRecord[]
): Record<string, RefundRecord[]> => {
  return records.reduce((acc, record) => {
    const date = record.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(record);
    return acc;
  }, {} as Record<string, RefundRecord[]>);
};

// Date formatting
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default function RefundHistoryPage() {
  const grouped = groupByDate(refundHistory);

  return (
    <div className="container mx-auto py-6 max-w-2xl px-4">
      <h2 className="text-xl font-bold mb-4">Refund History</h2>

      <div className="space-y-6">
        {Object.entries(grouped).map(([date, records]) => (
          <div key={date} className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="text-sm font-medium text-gray-500 px-2">
                {formatDate(date)}
              </span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            {records.map((refund) => (
              <Card
                key={refund.sessionId}
                className="rounded-lg shadow-none border"
              >
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base font-semibold">
                        {refund.tutorName}
                      </CardTitle>
                      <p className="text-sm text-primary font-semibold">
                        Refunded to {refund.studentName}
                      </p>
                      <CardDescription className="text-xs text-gray-500">
                        {refund.subject} • {refund.sessionDuration}
                      </CardDescription>
                    </div>
                    <span className="text-sm font-medium text-gray-800">
                      ${refund.amount.toFixed(2)}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="p-4 pt-0 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Session ID:</span>
                    <span>{refund.sessionId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Session Date:</span>
                    <span>{formatDate(refund.sessionDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Refund Date:</span>
                    <span>{formatDate(refund.date)}</span>
                  </div>
                </CardContent>

                <CardFooter className="p-4 pt-0 flex justify-end">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-8"
                      >
                        View Refund Receipt
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-base">
                          Refund Receipt for {refund.sessionId}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="pt-4">
                        <img
                          src="/receipt.jpeg"
                          alt={`Receipt for ${refund.sessionId}`}
                          className="w-full max-w-full h-auto rounded border object-contain"
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
