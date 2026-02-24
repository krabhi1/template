// src/start.ts
import { createStart } from "@tanstack/react-start";
import { loggingMiddleware } from "@/server/middleware";

export const startInstance = createStart(() => {
	return {
		requestMiddleware: [loggingMiddleware],
	};
});
