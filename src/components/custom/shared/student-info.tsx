import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link';

const StudentInfo = () => {
    const studentInfo = {
        image: "/profile.jpg",
        name: "John Doe",
        faculty: "Information Technology",
        major: "Computer Science",
        year: "3",
        email: "john.doe@mfu.ac.th",
        socials: {
            facebook: "https://www.messenger.com/e2ee/t/9242614292421124",
            instagram: "https://www.messenger.com/e2ee/t/9242614292421124",
            linkedIn: "https://www.messenger.com/e2ee/t/9242614292421124"
        }
    };
    return (
        <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="h-24 w-24">
                <AvatarImage src={studentInfo.image} alt={studentInfo.name} />
                <AvatarFallback>{studentInfo.name[0]}</AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
                <h1 className="text-2xl font-semibold">{studentInfo.name}</h1>
                <div className="text-muted-foreground">{studentInfo.email}</div>
                <div className="flex flex-wrap gap-2 mt-15 text-sm text-muted-foreground md:mt-2">
                    <span className="bg-muted px-2 py-1 rounded">Faculty: {studentInfo.faculty}</span>
                    <span className="bg-muted px-2 py-1 rounded">Major: {studentInfo.major}</span>
                    <span className="bg-muted px-2 py-1 rounded">Year: {studentInfo.year}</span>
                </div>
                <div className="flex items-center gap-2 w-1/2 mt-1">
                    {Object.entries(studentInfo.socials).map(([key, value]) => (
                        <div key={key} className="text-sm text-blue-600 hover:underline">
                            <Link href={value} target="_blank">
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </Link>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default StudentInfo