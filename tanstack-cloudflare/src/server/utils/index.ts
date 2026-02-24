import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { auth } from "../auth";

/**
 * Server function to fetch the current session.
 * This can be called from loaders or beforeLoad hooks to check authentication status.
 */
export const getSession = createServerFn({ method: "GET" }).handler(
	async () => {
		const request = getRequest();
		if (!request) return null;

		const session = await auth.api.getSession({
			headers: request.headers,
		});

		return session;
	},
);
