import SessionCard from "@/components/custom/shared/session-card";

export default function BrowseSessionsPage() {
  const mockSessions = [
    {
      id: 1,
      image: "/session-one.jpg",
      sessionName: "Next JS",
      courseCode: "10125",
      courseName: "Web development",
      date: "2025-05-01",
      start_time: "09:00",
      end_time: "11:00",
      tutor_name: "John Doe",
      tutor_rating: 4.7,
      status: "open",
      enrollments: 20,
      page: "admin", // 👈 this makes routing go to /session/admin/1/content
    },
    {
      id: 2,
      image: "/session-two.jpg",
      sessionName: "Intro to Physics",
      courseCode: "PHYS100",
      courseName: "Basic Mechanics",
      date: "2025-05-03",
      start_time: "13:00",
      end_time: "15:00",
      tutor_name: "Jane Smith",
      tutor_rating: 4.2,
      status: "closed",
      enrollments: 15,
      page: "admin",
    },
    // Add more sessions as needed
  ];

  return (
    <div className="p-6 grid md:grid-cols-2 xl:grid-cols-3 gap-4">
      {mockSessions.map((session) => (
        <SessionCard key={session.id} {...session} />
      ))}
    </div>
  );
}
