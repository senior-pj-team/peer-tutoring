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

// Define the type for a transaction
interface Transaction {
  sessionId: string;
  tutorName: string;
  amount: number;
  date: string;
  sessionDate: string;
  sessionDuration: string;
  subject: string;
}

// Dummy transactions data
const transactions: Transaction[] = [
  {
    sessionId: "SES-1025",
    tutorName: "Dr. Sarah Johnson",
    amount: 85.5,
    date: "2024-05-15",
    sessionDate: "2024-05-14",
    sessionDuration: "60 mins",
    subject: "Advanced Calculus",
  },
  {
    sessionId: "SES-1024",
    tutorName: "Prof. Michael Chen",
    amount: 75.0,
    date: "2024-05-15",
    sessionDate: "2024-05-13",
    sessionDuration: "45 mins",
    subject: "Organic Chemistry",
  },
  {
    sessionId: "SES-1023",
    tutorName: "Ms. Emily Wilson",
    amount: 65.25,
    date: "2024-05-10",
    sessionDate: "2024-05-09",
    sessionDuration: "90 mins",
    subject: "French Language",
  },
];

// Function to group transactions by date
const groupByDate = (
  transactions: Transaction[]
): Record<string, Transaction[]> => {
  return transactions.reduce(
    (acc: Record<string, Transaction[]>, transaction) => {
      const date = transaction.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(transaction);
      return acc;
    },
    {}
  );
};

// Function to format the date string
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const TransferHistoryPage = () => {
  const groupedTransactions = groupByDate(transactions);

  return (
    <div className="container mx-auto py-6 max-w-2xl px-4">
      <h2 className="text-xl font-bold mb-4">Tutor Transfers</h2>

      <div className="space-y-6">
        {Object.entries(groupedTransactions).map(([date, transactions]) => (
          <div key={date} className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="text-sm font-medium text-gray-500 px-2">
                {formatDate(date)}
              </span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            {transactions.map((transaction) => (
              <Card
                key={transaction.sessionId}
                className="rounded-lg shadow-none border"
              >
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base font-semibold">
                        {transaction.tutorName}
                      </CardTitle>
                      <CardDescription className="text-xs text-gray-500">
                        {transaction.subject} • {transaction.sessionDuration}
                      </CardDescription>
                    </div>
                    <span className="text-sm font-medium text-gray-800">
                      ${transaction.amount.toFixed(2)}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Session ID:</span>
                    <span>{transaction.sessionId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Session Date:</span>
                    <span>{formatDate(transaction.sessionDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transfer Date:</span>
                    <span>{formatDate(transaction.date)}</span>
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
                        View Transfer Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-base">
                          Transfer Receipt for {transaction.sessionId}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="pt-4">
                        <img
                          src="/receipt.jpeg"
                          alt={`Receipt for ${transaction.sessionId}`}
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
};

export default TransferHistoryPage;
