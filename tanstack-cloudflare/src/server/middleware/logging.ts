import { createMiddleware } from "@tanstack/react-start";

export const loggingMiddleware = createMiddleware().server(
	async ({ request, next }) => {
		const startTime = Date.now();
		const result = await next();
		const endTime = Date.now();
		const duration = endTime - startTime;

		console.log(
			`[${new Date().toISOString()}] ${request.method} ${request.url} - ${duration}ms`,
		);

		return result;
	},
);
