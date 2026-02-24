import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { username, emailOTP } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { db } from "./db";
import { sendVerifyEmail } from "./resend";
export const auth = betterAuth({
	database: drizzleAdapter(db, { provider: "sqlite" }),
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
	},
	emailVerification: {
		sendOnSignUp: false,
	},
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID ?? "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
		},
	},
	// Advanced session configuration
	session: {
		expiresIn: 60 * 60 * 24 * 7, // 7 days
		updateAge: 60 * 60 * 24, // 1 day
	},
	user: {
		additionalFields: {
			isOnboarded: {
				type: "boolean",
				defaultValue: false,
				required: true,
			},
		},
	},
	plugins: [
		tanstackStartCookies(),
		username(),
		emailOTP({
			async sendVerificationOTP({ email, otp, type }) {
				console.log(`Sending OTP ${otp} to ${email} for ${type}`);
				if (
					type === "email-verification" ||
					type === "sign-in" ||
					type === "forget-password"
				) {
					// await sendVerifyEmail(email, otp, type);
				}
			},
			overrideDefaultEmailVerification: true,
			sendVerificationOnSignUp: false,
		}),
	],
});

export function getServerSession(request: Request) {
	return auth.api.getSession({
		headers: request.headers,
	});
}

export type BetterAuth = typeof auth;

export type User = (typeof auth.$Infer)["Session"]["user"];
