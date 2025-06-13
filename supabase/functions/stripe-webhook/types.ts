export type TSS_Data = {
	id: number;
	session_id: number;
	student_id: number;
	amount_from_student: number | null;
	amount_to_tutor: number | null;
	ss_status: string;
	sessions: {
		id: number;
		image: string | null;
		session_name: string;
		max_students: number;
		start_time: string;
		status: string;

		tutor: {
			id: number;
			email: string;
		};
	};
	student: {
		id: number;
		email: string;
	};
} | null;
