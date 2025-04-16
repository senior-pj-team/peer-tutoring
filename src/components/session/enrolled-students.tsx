import React from 'react'
import Image from 'next/image'

const EnrolledStudents = ({data}:{data:{}[]}) => {
    const enrolledStudents = [
        { name: "Ross Geller", image: "/profile.jpg" },
        { name: "Joey Tribby", image: "/profile.jpg" },
        { name: "Chandler Bing", image: "/profile.jpg" },
    ];
    return (
        <div>
            <h2 className="text-lg font-semibold mb-2">Enrolled Students</h2>
            <div className="flex flex-wrap gap-4">
                {enrolledStudents.map((student, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                        <div className="relative w-5 h-5 rounded-full overflow-hidden">
                            <Image
                                src={student.image}
                                alt={student.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <span className='underline text-xs'>{student.name}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EnrolledStudents