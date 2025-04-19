import React from "react";
import Image from "next/image";
import { MessageCircle } from "lucide-react";

const EnrolledStudents = ({ data }: { data: {}[] }) => {
    const enrolledStudents = [
        { name: "Ross Geller", image: "/profile.jpg", email: "ross@gmail.com" },
        { name: "Joey Tribby", image: "/profile.jpg", email: "joey@gmail.com" },
        { name: "Chandler Bing", image: "/profile.jpg", email: "chandler@gmail.com" },
    ];
    return (
        <div className="mt-10">
            <h2 className="text-lg font-semibold mb-2">Enrolled Students</h2>
            <div className="flex flex-wrap gap-4 mt-5">
                {enrolledStudents.map((student, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden">
                            <Image
                                src={student.image}
                                alt={`Profile image of ${student.name}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="text-xs">
                            <div className="underline text-sm font-medium cursor-pointer">{student.name}</div>
                            <div className="text-gray-500">{student.email}</div>
                        </div>
                        <MessageCircle size={30} className="text-orange-500 cursor-pointer hover:text-orange-600"/>
                    </div>

                ))}
            </div>
        </div>
    )
}

export default EnrolledStudents;
