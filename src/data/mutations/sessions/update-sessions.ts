import { SessionSchemaT } from "@/schema/session-schema";

type UpdateSessionArgs = {
	values?: Partial<SessionSchemaT>;
	uploadedUrl?: string | null;
	start?: Date;
	end?: Date;
	tutor_id?: string;
	status?: TSessionStatus;
	paid_out_at?: string;
	payment_evidence?: string | null;
	transferred_amount?: number;
};

export const updateSession = async (
	supabase: TSupabaseClient,
	session_id: number,
	{
		values,
		uploadedUrl,
		start,
		end,
		tutor_id,
		status,
		paid_out_at,
		payment_evidence,
		transferred_amount,
	}: UpdateSessionArgs,
): Promise<boolean> => {
	if (!session_id) return false;

	const updateData: Record<string, string | number | null> = {};

	if (values?.sessionName !== undefined)
		updateData.session_name = values.sessionName;
	if (values?.courseCode !== undefined)
		updateData.course_code = values.courseCode;
	if (values?.courseName !== undefined)
		updateData.course_name = values.courseName;
	if (values?.school !== undefined) updateData.school = values.school;
	if (values?.major !== undefined) updateData.major = values.major;
	if (uploadedUrl !== undefined) updateData.image = uploadedUrl;
	if (values?.description !== undefined)
		updateData.description = values.description;
	if (values?.requirements !== undefined)
		updateData.requirement = values.requirements;
	if (start !== undefined) updateData.start_time = start.toISOString();
	if (end !== undefined) updateData.end_time = end.toISOString();
	if (values?.maxStudents !== undefined)
		updateData.max_students = values.maxStudents;
	if (values?.location !== undefined) updateData.location = values.location;
	if (values?.category !== undefined)
		updateData.category_id = Number(values.category);
	if (values?.paid !== undefined) {
		updateData.price = values.paid ? (values.amount ?? 0) : 0;
		updateData.service_fee = values.paid ? ((values.amount ?? 0) * 0.15) : 0;
	}
	if(values?.learning_materials != undefined){
		updateData.learning_materials= JSON.stringify(values.learning_materials);
	}
	if (tutor_id !== undefined) updateData.tutor_id = tutor_id;
	if (status !== undefined) updateData.status = status;
	if (paid_out_at !== undefined) updateData.paid_out_at = paid_out_at;
	if (payment_evidence !== undefined)
		updateData.payment_evidence = payment_evidence;
	if (transferred_amount !== undefined)
		updateData.transferred_amount = transferred_amount;

	const { error } = await supabase
		.from("sessions")
		.update(updateData)
		.eq("id", session_id);

	if (error) {
		console.error("Update session failed:", error.message);
		return false;
	}

	return true;
};
