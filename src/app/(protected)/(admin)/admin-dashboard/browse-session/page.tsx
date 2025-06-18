"use client";

import { useEffect, useState } from "react";
import { FiSearch, FiFilter, FiCalendar } from "react-icons/fi";
import SessionCard from "@/components/app/shared/sessions/session-card";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { getSessionsMatView } from "@/data/queries/sessions/get-sessions-mat-view";
import type {
  Database,
  TSessionStatus,
} from "../../../../../lib/database.types";

type SessionRow = {
  id: string;
  title: string;
  description?: string | null;
  start_time: string;
  end_time: string;
  location?: string | null;
  status: TSessionStatus;
  price: number;
  image: string;
  enrollments: number;
  tutor_id: string;
  tutor_name: string;
  tutor_rating?: number | null;
  category?: string | null;
};

export default function BrowseSessionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | TSessionStatus>(
    "all"
  );
  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSessions = async () => {
      setIsLoading(true);
      const supabase = createClientComponentClient<Database>();

      try {
        const data = await getSessionsMatView(supabase, {
          search: searchTerm.trim() || undefined,
          status: statusFilter === "all" ? undefined : [statusFilter],
          limit: 100,
        });
        console.log("Fetched data", data);
        if (data?.rows) {
          const mappedSessions: SessionRow[] = data.rows.map((row: any) => ({
            id: row.session_id, // Map session_id to id
            title: row.session_name ?? "Untitled", // Map session_name to title
            description: row.course_name ?? null, // Map course_name to description
            start_time: row.start_time,
            end_time: row.end_time,
            location: row.location ?? null,
            status: row.status ?? "open",
            price: row.price ?? 0,
            image: row.image ?? "/React.png",
            enrollments: row.enrollments ?? 0, // Assuming enrollments might come from the view, otherwise it will be 0
            tutor_id: row.tutor?.tutor_id ?? "", // Access nested tutor_id
            tutor_name: row.tutor?.name ?? "Unknown", // Access nested tutor name
            tutor_rating: row.tutor?.tutor_rating ?? 0, // Access nested tutor_rating
            category: row.session_category ?? row.course_code ?? null, // Prefer session_category, fallback to course_code
          }));

          setSessions(mappedSessions);
        } else {
          setSessions([]);
        }
      } catch (error) {
        console.error("Failed to fetch sessions:", error);
        setSessions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessions();
  }, [searchTerm, statusFilter]);

  const totalEnrollments = sessions.reduce(
    (sum, session) => sum + (session.enrollments || 0),
    0
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Browse Sessions
        </h1>
        <p className="text-gray-600">View and manage all tutoring sessions</p>
      </div>

      {/* Search & Filter */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search sessions..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search sessions"
          />
        </div>

        <div className="flex items-center gap-2">
          <FiFilter className="text-gray-500" />
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as "all" | TSessionStatus)
            }
            aria-label="Filter sessions by status"
          >
            <option value="all">All Statuses</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard label="Total Sessions" value={sessions.length} />
        <StatCard
          label="Open Sessions"
          value={sessions.filter((s) => s.status === "open").length}
          textColor="text-green-600"
        />
        <StatCard label="Total Enrollments" value={totalEnrollments} />
      </div>

      {/* Sessions List */}
      {isLoading ? (
        <p className="text-center text-gray-500">Loading sessions...</p>
      ) : sessions.length > 0 ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {sessions.map((session) => {
            const studentSession = {
              session_id: session.id,
              ss_status: session.status,
              sessions: {
                image: session.image,
                session_name: session.title,
                course_code: session.category ?? "N/A",
                course_name: session.description ?? "N/A",
                start_time: session.start_time,
                end_time: session.end_time,
                tutor: {
                  id: session.tutor_id,
                  username: session.tutor_name,
                  tutor_rating: session.tutor_rating ?? 0,
                  profile_url: `/profiles/${session.tutor_id}.jpg`,
                },
              },
            };

            return (
              <SessionCard
                key={session.id}
                student_session={studentSession}
                status={session.status}
                enrollments={session.enrollments}
                page="student"
              />
            );
          })}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

type StatCardProps = {
  label: string;
  value: number;
  textColor?: string;
};
function StatCard({
  label,
  value,
  textColor = "text-gray-900",
}: StatCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <div className="text-sm text-gray-500">{label}</div>
      <div className={`text-2xl font-bold ${textColor}`}>{value}</div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
      <FiCalendar className="mx-auto text-gray-400 w-12 h-12 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-1">
        No sessions found
      </h3>
      <p className="text-gray-500">Try adjusting your search or filters</p>
    </div>
  );
}
