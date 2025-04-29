"use client";
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const videoConstraints = {
  width: 300,
  height: 300,
  facingMode: "user",
};

export default function Step1AcademicInfo() {
  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [photoConfirmed, setPhotoConfirmed] = useState(false);

  const [isClient, setIsClient] = useState(false);

  const handleCapture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setPhotoConfirmed(false);
  };

  const handleConfirm = () => {
    setPhotoConfirmed(true);
    // Save image logic here
  };

  useEffect(() => {
    setIsClient(true);
  }, [])

  return (
    <div className="flex flex-col gap-6 font-sans">
      <h2 className="text-lg font-bold">Academic Information</h2>

      <div className="grid gap-4">
        <div className="grid gap-1">
          <Label htmlFor="university">University Name</Label>
          <Input id="university" placeholder="Enter your university" />
        </div>

        <div className="grid gap-1">
          <Label htmlFor="major">Major</Label>
          <Input id="major" placeholder="Enter your major" />
        </div>

        <div className="grid gap-1">
          <Label htmlFor="year">Year</Label>
          <Input id="year" placeholder="Enter your year" />
        </div>

        <div className="grid gap-1">
          <Label htmlFor="gpa">GPA</Label>
          <Input id="gpa" placeholder="Enter your GPA" />
        </div>
      </div>

      <div className="mt-6">
        <p className="text-sm mb-2">
          Take a photo holding your Student ID clearly.
        </p>

        {capturedImage ? (
          <div>
            <Image
              src={capturedImage}
              alt="Captured"
              width={300}
              height={300}
              style={{ borderRadius: "0.5rem", objectFit: "cover" }}
            />
            <div className="flex gap-2 mt-3">
              <Button variant="outline" onClick={handleRetake}>
                Retake
              </Button>
              <Button onClick={handleConfirm} disabled={photoConfirmed}>
                {photoConfirmed ? "Photo Saved ✅" : "Use Photo"}
              </Button>
            </div>
          </div>
        ) : (
          <div>
            {
              isClient &&
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={300}
                height={300}
                videoConstraints={videoConstraints}
                style={{ borderRadius: 8 }}
              />
            }
            <Button onClick={handleCapture} className="mt-2">
              Capture Photo
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
