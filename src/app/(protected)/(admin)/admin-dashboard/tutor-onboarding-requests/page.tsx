"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

type Tutor = {
  id: number;
  name: string;
  email: string;
  university: string;
  universityYear: string;
  major: string;
  gpa: string;
  verificationPhoto: string; // Combined face + ID photo
  bankDetails: {
    name: string;
    number: string;
    bankName: string;
  };
  isApproved: boolean;
};

const tutorOnboardingRequests: Tutor[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@university.edu",
    university: "Mae Fah Luang University",
    universityYear: "3rd Year",
    major: "Computer Science",
    gpa: "3.8",
    verificationPhoto: "/studentID.jpg",
    bankDetails: {
      name: "John Doe",
      number: "•••• •••• 7890",
      bankName: "Chase Bank",
    },
    isApproved: false,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@university.edu",
    university: "Mae Fah Luang University",
    universityYear: "2nd Year",
    major: "Mathematics",
    gpa: "3.9",
    verificationPhoto: "/verification/jane-verification.jpg",
    bankDetails: {
      name: "Jane Snitch",
      number: "•••• •••• 4321",
      bankName: "Bank of America",
    },
    isApproved: false,
  },
];

export default function TutorOnboardingRequestsPage() {
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleAction = (tutorId: number, action: "approve" | "reject") => {
    console.log(
      `${
        action === "approve" ? "Approved" : "Rejected"
      } tutor with ID: ${tutorId}`
    );
    setShowPreview(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tutor Onboarding</h1>
        <p className="text-gray-600 mt-2">
          Verify tutor applications by checking name consistency across system,
          ID, and bank details
        </p>
      </header>

      <div className="grid gap-6">
        {tutorOnboardingRequests.map((tutor) => (
          <Card
            key={tutor.id}
            className="p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left Section - Profile and Basic Info */}
              <div className="flex items-start gap-4 flex-1">
                <Avatar
                  className="cursor-pointer border-2 border-blue-100"
                  onClick={() => {
                    setSelectedTutor(tutor);
                    setShowPreview(true);
                  }}
                >
                  <AvatarImage src="/profile.jpg" alt={tutor.name} />
                  <AvatarFallback>{tutor.name[0]}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold">{tutor.name}</h3>
                  <p className="text-sm text-gray-600">{tutor.email}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="secondary">{tutor.universityYear}</Badge>
                    <Badge variant="secondary">{tutor.major}</Badge>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700"
                    >
                      GPA: {tutor.gpa}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {tutor.university}
                  </p>
                </div>
              </div>

              {/* Right Section - Verification and Actions */}
              <div className="md:w-64 flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm mb-1">
                      Name Verification
                    </h4>
                    <Card className="p-3 bg-gray-50">
                      <div className="space-y-1 text-sm">
                        <p className="flex justify-between">
                          <span className="text-gray-600">System:</span>
                          <span className="font-medium">{tutor.name}</span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-600">Bank:</span>
                          <span className="font-medium">
                            {tutor.bankDetails.name}
                          </span>
                        </p>
                      </div>
                    </Card>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-1">Bank Details</h4>
                    <Card className="p-3 bg-gray-50">
                      <div className="space-y-1 text-sm">
                        <p>{tutor.bankDetails.bankName}</p>
                        <p className="text-gray-600">
                          {tutor.bankDetails.number}
                        </p>
                      </div>
                    </Card>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      setSelectedTutor(tutor);
                      setShowPreview(true);
                    }}
                  >
                    View Verification
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleAction(tutor.id, "reject")}
                      disabled={tutor.isApproved}
                    >
                      Reject
                    </Button>
                    <Button
                      variant="success"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleAction(tutor.id, "approve")}
                      disabled={tutor.isApproved}
                    >
                      Approve
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Verification Preview Modal */}
      {/* Verification Preview Modal */}
      {showPreview && selectedTutor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold">{selectedTutor.name}</h2>
                  <p className="text-gray-600">{selectedTutor.university}</p>
                </div>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-gray-500 hover:text-gray-700 p-1"
                >
                  ✕
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Verification Photo */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Verification Photo</h3>
                    <Card className="overflow-hidden">
                      <img
                        src={selectedTutor.verificationPhoto}
                        alt="Verification"
                        className="w-full h-auto max-h-[500px] object-contain"
                      />
                    </Card>
                  </div>
                  <p className="text-sm text-gray-600">
                    Verify that the face matches the ID and the name is clearly
                    visible
                  </p>
                </div>

                {/* Name Match Verification */}
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Name Verification</h3>
                    <Card className="p-4 space-y-3">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">System Name</p>
                        <p className="font-medium">{selectedTutor.name}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">
                          Bank Account Name
                        </p>
                        <p className="font-medium">
                          {selectedTutor.bankDetails.name}
                        </p>
                      </div>
                      <div className="pt-2">
                        {selectedTutor.name ===
                        selectedTutor.bankDetails.name ? (
                          <Badge variant="success">Names Match</Badge>
                        ) : (
                          <Badge variant="destructive">Name Mismatch</Badge>
                        )}
                      </div>
                    </Card>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={() => handleAction(selectedTutor.id, "reject")}
                >
                  Reject Application
                </Button>
                <Button
                  variant="success"
                  className="flex-1"
                  onClick={() => handleAction(selectedTutor.id, "approve")}
                >
                  Approve Tutor
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
