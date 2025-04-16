import React from 'react'
import EnrolledStudents from '@/components/session/enrolled-students'

const page = () => {
  const sessionData = {
    sessionName: "Advanced React Workshop",
    courseCode: "110125",
    courseName: "Web Application Development",
    description:
      "This session will deep dive into advanced React concepts like hooks, context, and performance optimization.",
    requirements: [
      "Basic knowledge of React",
      "Laptop with Node.js installed",
      "GitHub account",
    ],
    date: "April 20, 2025",
    startTime: "10:00 AM",
    endTime: "12:00 PM",
    maxStudents: 10,
    enrolledStudents: [
      { name: "Alice", image: "/profile.jpg" },
      { name: "Bob", image: "/profile.jpg" },
      { name: "Charlie", image: "/profile.jpg" },
    ],
  };
  const remainingSlots =
    sessionData.maxStudents - sessionData.enrolledStudents.length;
  return (
    <div>
            <div className="max-w-4xl p-6 bg-white space-y-6">
              <h1 className="text-4xl font-bold">{sessionData.sessionName}</h1>

              {/* Course Info */}
              <div className="text-gray-600 text-sm">
                <span>{sessionData.courseCode}</span> |{" "}
                <span>{sessionData.courseName}</span>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-lg font-semibold mb-1">Description</h2>
                <p className="text-gray-700">{sessionData.description}</p>
              </div>

              {/* Requirements */}
              <div>
                <h2 className="text-lg font-semibold mb-1">Requirements</h2>
                <ul className="list-disc list-inside text-gray-700">
                  {sessionData.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-700">
                <div>
                  <span className="font-semibold">Date:</span> {sessionData.date}
                </div>
                <div>
                  <span className="font-semibold">Start Time:</span>{" "}
                  {sessionData.startTime}
                </div>
                <div>
                  <span className="font-semibold">End Time:</span>{" "}
                  {sessionData.endTime}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-700">
                <div>
                  <span className="font-semibold">Max Students:</span>{" "}
                  {sessionData.maxStudents}
                </div>
                <div>
                  <span className="font-semibold">Enrolled:</span>{" "}
                  {sessionData.enrolledStudents.length}
                </div>
                <div>
                  <span className="font-semibold">Remaining Slots:</span>{" "}
                  {remainingSlots}
                </div>
              </div>

              <EnrolledStudents data={sessionData.enrolledStudents} />
            </div>
          </div>
  )
}

export default page