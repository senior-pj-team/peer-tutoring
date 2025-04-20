"use client";
import React, { useRef, useState } from "react";
import { Box, TextField, Typography, Button, Stack } from "@mui/material";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 300,
  height: 300,
  facingMode: "user",
};

export default function Step1AcademicInfo() {
  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [photoConfirmed, setPhotoConfirmed] = useState(false);

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
    // Save the captured image to state, backend, etc.
  };

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Typography variant="h6">Academic Information</Typography>

      <Stack spacing={2}>
        <TextField label="University Name" variant="outlined" fullWidth />
        <TextField label="Major" variant="outlined" fullWidth />
        <TextField label="Year" variant="outlined" fullWidth />
        <TextField label="GPA" variant="outlined" fullWidth />
      </Stack>

      <Box mt={4}>
        <Typography variant="subtitle1" gutterBottom>
          Take a photo holding your Student ID clearly.
        </Typography>

        {capturedImage ? (
          <>
            <img
              src={capturedImage}
              alt="Captured"
              style={{
                width: 300,
                height: 300,
                objectFit: "cover",
                borderRadius: 8,
              }}
            />
            <Stack direction="row" spacing={2} mt={2}>
              <Button onClick={handleRetake} variant="outlined">
                Retake
              </Button>
              <Button
                onClick={handleConfirm}
                variant="contained"
                disabled={photoConfirmed}
              >
                {photoConfirmed ? "Photo Saved ✅" : "Use Photo"}
              </Button>
            </Stack>
          </>
        ) : (
          <Box>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={300}
              height={300}
              videoConstraints={videoConstraints}
              style={{ borderRadius: 8 }}
            />
            <Button onClick={handleCapture} variant="contained" sx={{ mt: 2 }}>
              Capture Photo
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
