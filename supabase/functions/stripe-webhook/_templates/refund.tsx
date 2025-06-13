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
export const RefundEmail = ({
	sessionImage,
	sessionName,
	price,
	purchaseDate,
	supportEmail = "support@orion.com",
	appUrl = "https://localhost:3000/home",
}: {
	sessionImage: string | null;
	sessionName: string;
	price: number;
	purchaseDate: string;
	sessionStartTime: string;
	supportEmail?: string;
	appUrl?: string;
}) => (
	<Html>
		<Head />
		<Preview>Enrollment for {sessionName} is failed</Preview>

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
						fontSize: "20px",
						fontWeight: "800",
						color: "#ff0000",
						padding: "16px",
						marginBottom: "40px",
					}}>
					Enrollment failed due to simultaneously requests.
				</Text>

				{/* Session info labels (desktop) */}
				<Row
					style={{
						padding: "0 16px",
						// hidden for mobile: use email CSS preprocessing
					}}>
					<Column
						style={{
							width: "50%",
							color: "#777777",
							fontSize: "14px",
							fontWeight: "600",
						}}>
						Session
					</Column>
					<Column
						style={{
							width: "25%",
							color: "#777777",
							fontSize: "14px",
							fontWeight: "600",
						}}>
						Price
					</Column>
					<Column
						style={{
							width: "25%",
							color: "#777777",
							fontSize: "14px",
							fontWeight: "600",
						}}>
						Purchased At
					</Column>
				</Row>

				{/* Session info values */}
				<Row style={{ padding: "16px" }}>
					<Column style={{ display: "flex", alignItems: "center" }}>
						{sessionImage && (
							<Img
								src={sessionImage}
								alt={sessionName}
								width="80"
								height="60"
								style={{
									borderRadius: "4px",
									marginRight: "12px",
									display: "block",
								}}
							/>
						)}

						<Text
							style={{
								fontSize: "13px",
								color: "#333333",
								margin: 0,
								fontWeight: 600,
								width: "100%",
							}}>
							{sessionName}
						</Text>
					</Column>
					<Column style={{ width: "25%" }}>
						<Text
							style={{
								fontSize: "13px",
								color: "#333333",
								fontWeight: 600,
								margin: 0,
							}}>
							{price}฿
						</Text>
					</Column>
					<Column style={{ width: "25%" }}>
						<Text
							style={{
								fontSize: "13px",
								color: "#333333",
								fontWeight: 600,
								margin: 0,
							}}>
							{purchaseDate}
						</Text>
					</Column>
				</Row>

				{/* Session start time */}
				<Text
					style={{
						padding: "0 16px 24px",
						fontSize: "12px",
						color: "#333333",
						fontWeight: 800,
					}}>
					Your payment is received by Orion. Though, we could not successfully
					process your enrollment due to mutiple simultaneous enrollments. We
					are deeply sorry and we will refund to you within 5 to 7 business
					days. If you have not set up payment info in Orion, please set up so
					that we can refund to you in a jit.
				</Text>

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
