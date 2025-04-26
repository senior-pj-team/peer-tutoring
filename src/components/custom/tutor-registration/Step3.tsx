"use client";
import React from "react";
import { Box, Typography, CircularProgress, Paper } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import { Button } from "@/components/ui/button";

export default function Step3ApprovalPending() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={3}
      alignItems="center"
      sx={{
        fontFamily: "'Poppins', sans-serif", // Apply Poppins font family globally
      }}
    >
      <Typography variant="h6" sx={{ fontFamily: "'Poppins', sans-serif" }}>
        Application Submitted
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        textAlign="center"
        sx={{ fontFamily: "'Poppins', sans-serif" }}
      >
        Your information is being reviewed by our team
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          border: "1px solid rgba(0,0,0,0.1)",
          maxWidth: 400,
          width: "100%",
          bgcolor: "background.paper",
          fontFamily: "'Poppins', sans-serif", // Apply Poppins font family to Paper
        }}
      >
        <PendingActionsIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />

        <CircularProgress size={50} thickness={4} sx={{ mb: 3 }} />

        <Typography
          variant="body1"
          gutterBottom
          sx={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Your application is under review
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 3, fontFamily: "'Poppins', sans-serif" }}
        >
          This typically takes 1-2 business days. We`&apos;`ll notify you once
          your account is approved.
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <Button>Edit Application</Button>
          <Button>Contact Support</Button>
        </Box>
      </Paper>

      <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
        <CheckCircleOutlineIcon color="success" fontSize="small" />
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ ml: 1, fontFamily: "'Poppins', sans-serif" }}
        >
          You`&apos;`ll receive an email notification when your application is
          processed
        </Typography>
      </Box>
    </Box>
  );
}
