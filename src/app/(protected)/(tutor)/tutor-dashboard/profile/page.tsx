import TutorBioBox from "@/components/app/features/tutor/tutor-profile/tutor-bio-box";
import TutorHighLightBox from "@/components/app/features/tutor/tutor-profile/tutor-highlight-box";
import TutorBankBox from "@/components/app/features/tutor/tutor-profile/tutor-bank-box";
import { TutorInfo } from "@/components/app/features/tutor/tutor-profile/tutor-info";
import { FormWrapper } from "@/components/app/features/tutor/tutor-profile/form-wrapper";
import { createClient } from "@/utils/supabase/server";
import { getUserSession } from "@/utils/get-user-session";
import { getBankInfoJoinUser } from "@/data/queries/bank-info/get-bank-info-join-user";

export default async function page() {
	const user = await getUserSession();
	if (!user) {
		return (
			<div className="max-w-4xl mx-auto p-6 flex h-full flex-col items-center justify-center">
				<span className="text-xl text-red-500">Something went wrong ❌</span>
			</div>
		);
	}

	const supabase = await createClient();
	const tutor_data = await getBankInfoJoinUser(supabase, {
		user_id: user.user_id,
		account_type: ["refund_transfer", "tutor_transfer"],
	});

	if (!tutor_data || tutor_data.length === 0) {
		return (
			<div className="max-w-4xl mx-auto p-6 flex h-full flex-col items-center justify-center">
				<span className="text-xl text-red-500">Something went wrong ❌</span>
			</div>
		);
	}

	const tutor = tutor_data[0];
	const tuturInfo = {
		image: tutor.user.profile_url,
		name: tutor.user.username,
		email: tutor.user.email,
		school: tutor.user.school,
		major: tutor.user.major,
		year: tutor.user.year,
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
