import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { username } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { db } from "./db";
export const auth = betterAuth({
	database: drizzleAdapter(db, { provider: "sqlite" }),
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
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
	plugins: [tanstackStartCookies(), username()],
});

export function getServerSession(request: Request) {
	return auth.api.getSession({
		headers: request.headers,
	});
}

export type BetterAuth = typeof auth;

export type User = (typeof auth.$Infer)["Session"]["user"];
