import {
	inferAdditionalFields,
	usernameClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import type { BetterAuth } from "@/server/auth";
export const authClient = createAuthClient({
	plugins: [inferAdditionalFields<BetterAuth>(), usernameClient()],
});

export type Session = typeof authClient.$Infer.Session;
