import * as React from "react";

export type EmailTemplateType =
	| "email-verification"
	| "sign-in"
	| "forget-password"
	| "change-password";

interface EmailTemplateProps {
	otp: string;
	type: EmailTemplateType;
}

const CONFIG = {
	"email-verification": {
		title: "Verify Your Email",
		description:
			"Welcome! Please verify your email address to complete your signup.",
		otpLabel: "Your verification code is:",
		footer:
			"If you didn't sign up for this account, you can safely ignore this email.",
	},
	"sign-in": {
		title: "Sign In to Your Account",
		description: "Use the one-time password below to sign in to your account.",
		otpLabel: "Your sign-in code is:",
		footer:
			"If you didn't request this code, someone may be trying to access your account.",
	},
	"forget-password": {
		title: "Reset Your Password",
		description:
			"We received a request to reset your password. Use the OTP below to proceed.",
		otpLabel: "Your reset code is:",
		footer:
			"If you didn't request a password reset, you can safely ignore this email.",
	},
	"change-password": {
		title: "Change Your Password",
		description:
			"You requested to change your password. Use the OTP below to proceed.",
		otpLabel: "Your one-time password is:",
		footer: "Enter this code in your app to complete the password change.",
	},
} as const;

export function EmailTemplate({ otp, type }: EmailTemplateProps) {
	const content = CONFIG[type] || CONFIG["email-verification"];

	return (
		<div
			style={{
				fontFamily: "Arial, sans-serif",
				backgroundColor: "#f4f4f4",
				padding: "20px",
			}}
		>
			<div
				style={{
					maxWidth: "600px",
					margin: "0 auto",
					backgroundColor: "white",
					padding: "30px",
					borderRadius: "8px",
					boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
				}}
			>
				<div style={{ textAlign: "center", marginBottom: "30px" }}>
					<h1 style={{ color: "#333", margin: "0" }}>{content.title}</h1>
				</div>

				<p style={{ color: "#555", fontSize: "16px", lineHeight: "1.5" }}>
					{content.description}
				</p>

				<div
					style={{
						backgroundColor: "#f9f9f9",
						padding: "30px",
						textAlign: "center",
						borderRadius: "8px",
						margin: "25px 0",
						border: "1px solid #eee",
					}}
				>
					<p style={{ color: "#666", marginBottom: "15px", fontSize: "14px" }}>
						{content.otpLabel}
					</p>
					<div
						style={{
							fontSize: "36px",
							fontWeight: "bold",
							letterSpacing: "6px",
							color: "#1a73e8",
							fontFamily: "monospace",
						}}
					>
						{otp}
					</div>
					<p style={{ color: "#999", fontSize: "12px", marginTop: "15px" }}>
						This code expires in 15 minutes
					</p>
				</div>

				<p style={{ color: "#555", fontSize: "14px", lineHeight: "1.5" }}>
					{content.footer}
				</p>

				{type === "change-password" && (
					<div
						style={{
							backgroundColor: "#fff3cd",
							padding: "15px",
							borderRadius: "6px",
							margin: "20px 0",
							color: "#856404",
							fontSize: "13px",
							border: "1px solid #ffeeba",
						}}
					>
						<strong>⚠️ Security Note:</strong> Do not share this code with
						anyone.
					</div>
				)}

				<div
					style={{
						textAlign: "center",
						color: "#888",
						fontSize: "12px",
						marginTop: "40px",
						borderTop: "1px solid #eee",
						paddingTop: "20px",
					}}
				>
					<p>
						&copy; {new Date().getFullYear()} Your App. All rights reserved.
					</p>
				</div>
			</div>
		</div>
	);
}
