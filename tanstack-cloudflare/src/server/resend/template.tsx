import * as React from "react";

interface VerifyEmailTemplateProps {
	otp: string;
}

export function VerifyEmailTemplate({ otp }: VerifyEmailTemplateProps) {
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
					padding: "20px",
					borderRadius: "8px",
				}}
			>
				<div style={{ textAlign: "center", marginBottom: "30px" }}>
					<h1>Verify Your Email</h1>
				</div>
				<p>
					Welcome! Please verify your email address to complete your signup.
				</p>
				<div
					style={{
						backgroundColor: "#f0f0f0",
						padding: "20px",
						textAlign: "center",
						borderRadius: "6px",
						margin: "20px 0",
					}}
				>
					<p>Your verification code is:</p>
					<div
						style={{
							fontSize: "32px",
							fontWeight: "bold",
							letterSpacing: "5px",
							color: "#333",
						}}
					>
						{otp}
					</div>
					<p style={{ color: "#999", fontSize: "14px" }}>
						This code expires in 15 minutes
					</p>
				</div>
				<p>
					If you didn't sign up for this account, you can safely ignore this
					email.
				</p>
				<div
					style={{
						textAlign: "center",
						color: "#666",
						fontSize: "12px",
						marginTop: "30px",
					}}
				>
					<p>&copy; 2026 Your App. All rights reserved.</p>
				</div>
			</div>
		</div>
	);
}

interface ForgotPasswordTemplateProps {
	firstName: string;
	resetLink: string;
}

export function ForgotPasswordTemplate({
	firstName,
	resetLink,
}: ForgotPasswordTemplateProps) {
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
					padding: "20px",
					borderRadius: "8px",
				}}
			>
				<div style={{ textAlign: "center", marginBottom: "30px" }}>
					<h1>Reset Your Password</h1>
				</div>
				<p>Hi {firstName},</p>
				<p>
					We received a request to reset your password. Click the button below
					to create a new password.
				</p>
				<div style={{ textAlign: "center", margin: "20px 0" }}>
					<a
						href={resetLink}
						style={{
							display: "inline-block",
							backgroundColor: "#007bff",
							color: "white",
							padding: "12px 30px",
							textDecoration: "none",
							borderRadius: "6px",
						}}
					>
						Reset Password
					</a>
				</div>
				<p style={{ textAlign: "center", color: "#666", fontSize: "14px" }}>
					Or copy this link: <a href={resetLink}>{resetLink}</a>
				</p>
				<div
					style={{
						backgroundColor: "#fff3cd",
						padding: "15px",
						borderRadius: "6px",
						margin: "20px 0",
						color: "#856404",
					}}
				>
					<strong>⚠️ Security Note:</strong> This link expires in 1 hour. If you
					didn't request this, ignore this email.
				</div>
				<div
					style={{
						textAlign: "center",
						color: "#666",
						fontSize: "12px",
						marginTop: "30px",
					}}
				>
					<p>&copy; 2026 Your App. All rights reserved.</p>
				</div>
			</div>
		</div>
	);
}

interface ChangePasswordOTPTemplateProps {
	firstName: string;
	otp: string;
	expiresAt: string; // e.g., "15 minutes from now"
}

export function ChangePasswordOTPTemplate({
	firstName,
	otp,
	expiresAt,
}: ChangePasswordOTPTemplateProps) {
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
					padding: "20px",
					borderRadius: "8px",
				}}
			>
				<div style={{ textAlign: "center", marginBottom: "30px" }}>
					<h1>Change Your Password</h1>
				</div>
				<p>Hi {firstName},</p>
				<p>
					You requested to change your password. Use the OTP below to proceed.
				</p>
				<div
					style={{
						backgroundColor: "#f0f0f0",
						padding: "20px",
						textAlign: "center",
						borderRadius: "6px",
						margin: "20px 0",
					}}
				>
					<p>Your one-time password is:</p>
					<div
						style={{
							fontSize: "32px",
							fontWeight: "bold",
							letterSpacing: "5px",
							color: "#333",
						}}
					>
						{otp}
					</div>
					<p style={{ color: "#999", fontSize: "14px" }}>
						Expires in {expiresAt}
					</p>
				</div>
				<p>Enter this code in your app to complete the password change.</p>
				<div
					style={{
						backgroundColor: "#fff3cd",
						padding: "15px",
						borderRadius: "6px",
						margin: "20px 0",
						color: "#856404",
					}}
				>
					<strong>⚠️ Security Note:</strong> Do not share this code. If you
					didn’t request this, ignore this email.
				</div>
				<div
					style={{
						textAlign: "center",
						color: "#666",
						fontSize: "12px",
						marginTop: "30px",
					}}
				>
					<p>&copy; 2026 Your App. All rights reserved.</p>
				</div>
			</div>
		</div>
	);
}
