"use client";
import * as React from "react";
import {
	Box,
	Stepper,
	Step,
	StepLabel,
	Typography,
	Paper,
} from "@mui/material";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { Button as CustomButton } from "@/components/ui/button";

const steps = [
	"Academic Information",
	"Payment Setup",
	"Submit & Wait for Approval",
];

export default function HorizontalLinearStepper() {
	const [activeStep, setActiveStep] = React.useState(0);

	const handleNext = () => {
		setActiveStep((prev) => prev + 1);
	};

	const handleBack = () => {
		setActiveStep((prev) => prev - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	const renderStepContent = (step: number) => {
		switch (step) {
			case 0:
				return <Step1 />;
			case 1:
				return <Step2 />;
			case 2:
				return <Step3 />;
			default:
				return <Typography>Unknown step</Typography>;
		}
	};

	return (
		<Box
			sx={{
				width: "100%",
				maxWidth: 600,
				mx: "auto",
				mt: 6,
				px: 2,
			}}>
			<Typography variant="h5" fontWeight="bold" textAlign="center" mb={4}>
				Become a Tutor
			</Typography>

			<Stepper activeStep={activeStep} alternativeLabel>
				{steps.map((label) => (
					<Step key={label}>
						<StepLabel sx={{ typography: "caption", textAlign: "center"}}>
							{label}
						</StepLabel>
					</Step>
				))}
			</Stepper>

			<Paper
				elevation={3}
				sx={{
					mt: 4,
					p: 4,
					minHeight: 300,
					borderRadius: 3,
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
				}}>
				{activeStep === steps.length ? (
					<Box textAlign="center">
						<Typography variant="h6" gutterBottom>
							All steps completed 🎉
						</Typography>
						<Typography variant="body1" color="text.secondary">
							You &apos;re now waiting for your profile to be reviewed.
						</Typography>
						<CustomButton
							onClick={handleReset}
							variant="outline"
							className="mt-3">
							Start Over
						</CustomButton>
					</Box>
				) : (
					<>
						<Typography variant="subtitle1" mb={2}>
							Step {activeStep + 1}: {steps[activeStep]}
						</Typography>

						<Box>{renderStepContent(activeStep)}</Box>

						<Box display="flex" justifyContent="space-between" mt={4}>
							<CustomButton
								variant="ghost"
								onClick={handleBack}
								disabled={activeStep === 0}>
								Back
							</CustomButton>
							<CustomButton onClick={handleNext}>
								{activeStep === steps.length - 1 ? "Finish" : "Next"}
							</CustomButton>
						</Box>
					</>
				)}
			</Paper>
		</Box>
	);
}
