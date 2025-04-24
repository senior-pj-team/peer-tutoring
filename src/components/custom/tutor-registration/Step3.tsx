"use client";
import React from "react";
import {
	Box,
	Typography,
	Button,
	CircularProgress,
	Paper,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

export default function Step3ApprovalPending() {
	return (
		<Box display="flex" flexDirection="column" gap={3} alignItems="center">
			<Typography variant="h6">Application Submitted</Typography>
			<Typography variant="body2" color="text.secondary" textAlign="center">
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
				}}>
				<PendingActionsIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />

				<CircularProgress size={50} thickness={4} sx={{ mb: 3 }} />

				<Typography variant="body1" gutterBottom>
					Your application is under review
				</Typography>
				<Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
					This typically takes 1-2 business days. We`&apos;`ll notify you once
					your account is approved.
				</Typography>

				<Box sx={{ display: "flex", gap: 2, mt: 2 }}>
					<Button
						variant="outlined"
						size="medium"
						sx={{
							borderRadius: 2,
							textTransform: "none",
						}}>
						Edit Application
					</Button>
					<Button
						variant="contained"
						size="medium"
						sx={{
							borderRadius: 2,
							textTransform: "none",
						}}>
						Contact Support
					</Button>
				</Box>
			</Paper>

			<Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
				<CheckCircleOutlineIcon color="success" fontSize="small" />
				<Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
					You`&apos;`ll receive an email notification when your application is
					processed
				</Typography>
			</Box>
		</Box>
	);
}
