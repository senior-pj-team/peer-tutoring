"use client";

import { Card, CardContent } from "@/components/ui/card";
import { UserCheck, UserX, AlertTriangle } from "lucide-react";

type Props = {
  activeTutors: number;
  suspendedTutors: number;
  tutorsWith3PlusWarnings: number;
};

export default function TutorCountsCard({
  activeTutors,
  suspendedTutors,
  tutorsWith3PlusWarnings,
}: Props) {
  const items = [
    {
      title: "Active Tutors",
      count: activeTutors,
      icon: <UserCheck className="w-5 h-5 text-green-500" />,
    },
    {
      title: "Suspended Tutors",
      count: suspendedTutors,
      icon: <UserX className="w-5 h-5 text-red-500" />,
    },
    {
      title: "Tutors with 3+ Warnings",
      count: tutorsWith3PlusWarnings,
      icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {items.map((item) => (
        <Card key={item.title} className="p-5 shadow-sm border">
          <CardContent className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">{item.title}</h3>
              {item.icon}
            </div>
            <p className="text-3xl font-semibold">{item.count}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
