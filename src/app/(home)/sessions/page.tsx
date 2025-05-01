// app/(admin)/admin-dashboard/browse-sessions/page.tsx
import SessionCard from "@/components/custom/shared/session-card";

export default function BrowseSessionsPage() {
  const mockSessions = [
    {
      id: 1,
      image: "/session1.jpg",
      sessionName: "Next JS",
      courseCode: "10125",
      courseName: "Web development",
      school: "Applied Digital Science",
      major: "Computer Engineering",
      price: "400",
      remaining: "2hr",
      description:
        "This session will deep dive into advanced React concepts like hooks, context, and performance optimization.",
      tutor: "Eric",
      rating: "5",
      type: "free",
      from: "11:00 AM",
      to: "2:00 PM",
      date: "23 April 2025",
      status: "open", // session status, e.g., open or closed
      enrollments: 20,
      page: "admin", // this will route to `/session/admin/1/content`
    },
    {
      id: 2,
      image: "/session2.jpg",
      sessionName: "Machine Learning with SkitLearn",
      courseCode: "10125",
      courseName: "Web development",
      school: "Applied Digital Science",
      major: "Computer Engineering",
      price: "400",
      remaining: "2hr",
      description:
        "This session will deep dive into advanced React concepts like hooks, context, and performance optimization.",
      tutor: "Eric",
      rating: "5",
      type: "free",
      from: "11:00 AM",
      to: "2:00 PM",
      date: "23 April 2025",
      status: "closed", // session status
      enrollments: 15,
      page: "admin",
    },
    {
      id: 3,
      image: "/session3.jpg",
      sessionName: "Database Management Midterm Course",
      courseCode: "10125",
      courseName: "Web development",
      school: "Applied Digital Science",
      major: "Computer Engineering",
      price: "400",
      remaining: "2hr",
      description:
        "This session will deep dive into advanced React concepts like hooks, context, and performance optimization.",
      tutor: "Eric",
      rating: "5",
      type: "free",
      from: "11:00 AM",
      to: "2:00 PM",
      date: "23 April 2025",
      status: "trashed", // trashed status
      enrollments: 10,
      page: "admin",
    },
    // Add more sessions with similar structure as needed
  ];

  return (
    <div className="p-6 grid md:grid-cols-2 xl:grid-cols-3 gap-4">
      {mockSessions.map((session) => (
        <SessionCard key={session.id} {...session} />
      ))}
    </div>
  );
}
