import handler from "@tanstack/react-start/server-entry";

/**
 * Cloudflare Worker Entry Point
 * Handles both HTTP requests (TanStack Start) and Cron Triggers (Automation Engine).
 */
export default {
	// Standard TanStack Start fetch handler
	async fetch(request: Request, _env: Env, _ctx: ExecutionContext) {
		return handler.fetch(request);
	},

	// Cloudflare Cron Trigger handler
	async scheduled(
		controller: ScheduledController,
		_env: Env,
		_ctx: ExecutionContext,
	): Promise<void> {
		console.log(
			`Cron Heartbeat Triggered: ${controller.cron} at ${new Date().toISOString()}`,
		);

		/**
		 * We use ctx.waitUntil to ensure the Worker doesn't terminate
		 * before the automation logic finishes processing all users.
		 */
		// ctx.waitUntil();
	},
};
