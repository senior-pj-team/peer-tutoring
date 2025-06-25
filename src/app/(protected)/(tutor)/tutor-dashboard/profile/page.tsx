import TutorBioBox from "@/components/app/features/tutor-profile/tutor-bio-box";
import TutorHighLightBox from "@/components/app/features/tutor-profile/tutor-highlight-box";
import TutorBankBox from "@/components/app/features/tutor-profile/tutor-bank-box";
import { TutorInfo } from "@/components/app/features/tutor-profile/tutor-info";
import { FormWrapper } from "@/components/app/features/tutor-profile/form-wrapper";
import { getTutorWithStats } from "@/data/queries/tutors/get-tutor-with-stats";
import { createClient } from "@/utils/supabase/server";
import { getUserSession } from "@/utils/get-user-session";

export default async function page() {
	const user = await getUserSession();
	if (!user) {
		return (
			<div className="max-w-4xl mx-auto p-6 flex h-full flex-col items-center justify-center">
				<span className="text-xl text-red-500">Somemthing went wrong ❌</span>
			</div>
		);
	}
	const supabase = await createClient();
	const tutor_data = await getTutorWithStats(supabase, {
		p_filter_tutor_id: user.user_id,
	});
	if (!tutor_data || tutor_data.length === 0) {
		return (
			<div className="max-w-4xl mx-auto p-6 flex h-full flex-col items-center justify-center">
				<span className="text-xl text-red-500">Somemthing went wrong ❌</span>
			</div>
		);
	}
	const tutor = tutor_data[0];
	const tuturInfo = {
		image: tutor.profile_url,
		name: tutor.username,
		email: tutor.email,
		school: tutor.school,
		major: tutor.major,
		year: tutor.year,
	};

	return (
		<div className="max-w-4xl mx-auto p-6">
			<TutorInfo tutorInfo={tuturInfo} />
			<hr />

			<FormWrapper values={tutor_data}>
				<TutorBankBox />
				<TutorHighLightBox />
				<TutorBioBox />
			</FormWrapper>
		</div>
	);
}
