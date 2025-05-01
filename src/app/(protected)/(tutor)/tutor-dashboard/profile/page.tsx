import { Button } from "@/components/ui/button";
import TutorBioBox from "@/components/custom/features/profile-settings/tutor-bio-box";
import TutorHighLightBox from "@/components/custom/features/profile-settings/tutor-highlight-box";
import TutorBankBox from "@/components/custom/features/profile-settings/tutor-bank-box";
import StudentInfo from "@/components/custom/shared/student-info";

export default function TutorProfilePage() {
    const tutorInfo = {
        bankName: "Bangkok Bank",
        bankNumber: "123-456-7890",
        highlight: "Patient and friendly with strong math skills.",
        bio: "I've been tutoring high school students for 2 years. I specialize in simplifying complex topics and helping students feel confident in their studies.",
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">

            <StudentInfo/>

            <hr />

            <TutorBankBox bankName={tutorInfo.bankName} bankNumber={tutorInfo.bankNumber} />

            <TutorHighLightBox highlight={tutorInfo.highlight} />
            
            <TutorBioBox bio={tutorInfo.bio} />

            <div className="flex justify-end">
                <Button className="mt-4 cursor-pointer">Save Changes</Button>
            </div>
        </div>
    );
}
