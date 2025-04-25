'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle } from "lucide-react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import clsx from "clsx";

const students = [
    { name: "Alice", image: "/profile.jpg", email: "alice@mfu.ac.th", status: "held" },
    { name: "Bob", image: "/profile.jpg", email: "bob@mfu.ac.th", status: "released" },
    { name: "Charlie", image: "/profile.jpg", email: "charlie@mfu.ac.th", status: "dispute" },
    { name: "Daisy", image: "/profile.jpg", email: "daisy@mfu.ac.th", status: "refunded" },
    { name: "Ethan", image: "/profile.jpg", email: "ethan@mfu.ac.th", status: "held" },
    { name: "Fiona", image: "/profile.jpg", email: "fiona@mfu.ac.th", status: "released" },
    { name: "George", image: "/profile.jpg", email: "george@mfu.ac.th", status: "dispute" },
    { name: "Hana", image: "/profile.jpg", email: "hana@mfu.ac.th", status: "refunded" },
];

const statusColors: Record<string, string> = {
    held: "bg-green-50",
    dispute: "bg-yellow-100",
    refunded: "bg-red-100",
    released: "bg-green-200",
};

const StudentList = () => {
    return (
        <Table className="w-full">
            <TableCaption className="text-sm">
                A list of enrolled students
            </TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[200px]">Student</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Payment status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {students.map((student, index) => (
                    <TableRow key={index} className="hover:bg-muted/40 transition">
                        <TableCell>
                            <div className="flex items-center gap-3">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src={student.image} alt={student.name} />
                                    <AvatarFallback>{student.name[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="font-medium">{student.name}</div>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                            {student.email}
                        </TableCell>
                        <TableCell>
                            <span className={clsx(
                                "px-2 py-1 text-xs font-medium rounded-full capitalize",
                                statusColors[student.status]
                            )}>
                                {student.status}
                            </span>
                        </TableCell>
                        <TableCell className="text-right">
                            <MessageCircle
                                size={30}
                                className="text-orange-500 cursor-pointer hover:text-orange-600"
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default StudentList;
