import {
	Body,
	Button,
	Column,
	Container,
	Head,
	Heading,
	Html,
	Img,
	Link,
	Preview,
	Row,
	Text,
} from "npm:@react-email/components@0.0.22";
import * as React from "npm:react@18.3.1";
export const ReminderEmail = ({
	sessionName,
	sessionStartTime,
	receipent,
	topic,
	supportEmail = "support@orion.com",
	appUrl = "https://localhost:3000/home",
}: {
	sessionName: string;
	sessionStartTime: string;
	supportEmail?: string;
	receipent: "student" | "tutor";
	topic?: string;
	appUrl?: string;
}) => (
	<Html>
		<Head />
		<Preview>
			{topic === "send reminders"
				? "Reminder for upcoming session ⏳"
				: "Session Completed 🚀"}
		</Preview>

		<Body
			style={{
				margin: 0,
				padding: 0,
				backgroundColor: "#f0f0f0",
				fontFamily: "Arial, sans-serif",
			}}>
			<Container
				style={{
					width: "100%",
					maxWidth: "450px",
					margin: "0 auto",
					backgroundColor: "#ffffff",
					borderRadius: "8px",
					overflow: "hidden",
					border: "1px solid #eee",
					boxShadow: "0 5px 10px rgba(20,50,70,.2)",
					marginTop: "30px",
					padding: "0px 0 50px",
				}}>
				{/* Orion Header */}
				<Container
					style={{
						backgroundColor: "#f97316",
						padding: "24px 16px",
						textAlign: "center",
					}}>
					<Heading
						style={{
							margin: 0,
							fontSize: "32px",
							color: "#ffffff",
							lineHeight: "1.2",
						}}>
						Orion
					</Heading>
				</Container>

				{/* Enrollment sub-header */}
				<Text
					style={{
						fontSize: "18px",
						fontWeight: "600",
						color: "#333333",
						padding: "16px 16px 0px 16px",
					}}>
					{topic === "send reminders"
						? `Reminder for Upcoming Session ${sessionName} ⏳`
						: `Congrats, ${sessionName} session Completed 🚀`}
				</Text>

				<Row style={{ padding: "0 16px 24px" }}>
					<Column style={{ width: "100%" }}>
						<Text
							style={{
								fontSize: "14px",
								color: "#555555",
								margin: "8px 0 0",
							}}>
							{receipent === "student" && topic === "send reminders" ? (
								<>
									Wishes you learn the best for tomorrow session📖. Your session
									starts at {sessionStartTime}.
								</>
							) : receipent === "tutor" && topic === "send reminders" ? (
								<>
									Share your knowlege and skills to students the best for
									tomorrow session💡. Your session starts at {sessionStartTime}.
								</>
							) : receipent === "student" &&
							  topic === "send session complete" ? (
								<></>
							) : (
								<></>
							)}
						</Text>
					</Column>
				</Row>
				{/* Button */}
				<Container style={{ padding: "0 16px 32px", textAlign: "center" }}>
					<Button
						href={appUrl}
						style={{
							backgroundColor: "#f97316",
							color: "#ffffff",
							fontSize: "16px",
							padding: "12px 24px",
							borderRadius: "4px",
							textDecoration: "none",
							display: "inline-block",
						}}>
						Explore Orion
					</Button>
				</Container>

				{/* Support info */}
				<Text
					style={{
						fontSize: "12px",
						color: "#888888",
						textAlign: "center",
						padding: "0 16px 24px",
					}}>
					If you have any problems or questions, please contact our support team
					at{" "}
					<Link
						href={`mailto:${supportEmail}`}
						style={{ color: "#f97316", textDecoration: "none" }}>
						{supportEmail}
					</Link>
					.
				</Text>
			</Container>
		</Body>
	</Html>
);
