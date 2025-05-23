export type Sessions = {
  session_id: string,
  image: string;
  session_name: string;
  course_code: string;
  course_name: string;
  date: Date;
  start_time: string;
  end_time: string;
  tutor_name: string;
  tutor_rating: number;
  status: string;
}[];
