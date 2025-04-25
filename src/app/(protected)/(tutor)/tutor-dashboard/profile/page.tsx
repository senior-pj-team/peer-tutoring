import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Pencil, CreditCard, Sparkles, BookText } from "lucide-react";
import TutorBioBox from "@/components/custom/profile-settings/tutor-bio-box";
import TutorHighLightBox from "@/components/custom/profile-settings/tutor-highlight-box";
import TutorBankBox from "@/components/custom/profile-settings/tutor-bank-box";

export default function TutorProfilePage() {

    const studentInfo = {
        image: "/profile.jpg",
        name: "John Doe",
        faculty: "Information Technology",
        major: "Computer Science",
        year: "3",
        email: "john.doe@mfu.ac.th",
    };

    const tutorInfo = {
        bankName: "Bangkok Bank",
        bankNumber: "123-456-7890",
        highlight: "Patient and friendly with strong math skills.",
        bio: "I've been tutoring high school students for 2 years. I specialize in simplifying complex topics and helping students feel confident in their studies.",
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">

            <div className="flex flex-col md:flex-row items-center gap-6">
                <Avatar className="h-24 w-24">
                    <AvatarImage src={studentInfo.image} alt={studentInfo.name} />
                    <AvatarFallback>{studentInfo.name[0]}</AvatarFallback>
                </Avatar>
                <div className="text-center md:text-left">
                    <h1 className="text-2xl font-semibold">{studentInfo.name}</h1>
                    <div className="text-muted-foreground">{studentInfo.email}</div>
                    <div className="flex flex-wrap gap-2 mt-15 text-sm text-muted-foreground md:mt-2">
                        <span className="bg-muted px-2 py-1 rounded">Faculty: {studentInfo.faculty}</span>
                        <span className="bg-muted px-2 py-1 rounded">Major: {studentInfo.major}</span>
                        <span className="bg-muted px-2 py-1 rounded">Year: {studentInfo.year}</span>
                    </div>
                </div>
            </div>

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
