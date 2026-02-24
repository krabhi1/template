import path from "node:path";
import {
	defineWorkersProject,
	readD1Migrations,
} from "@cloudflare/vitest-pool-workers/config";
import viteTsConfigPaths from "vite-tsconfig-paths";

export default defineWorkersProject(async () => {
	// Read all migrations in the `migrations` directory
	const migrationsPath = path.join(__dirname, "migrations");
	const migrations = await readD1Migrations(migrationsPath);

	return {
		test: {
			setupFiles: ["src/test/apply-migrations.ts"],
			poolOptions: {
				workers: {
					singleWorker: true,
					wrangler: {
						configPath: "./wrangler.jsonc",
					},
					miniflare: {
						// Add a test-only binding for migrations, so we can apply them in a
						// setup file
						bindings: { TEST_MIGRATIONS: migrations },
					},
				},
			},
		},
		plugins: [
			viteTsConfigPaths({
				projects: ["./tsconfig.json"],
			}),
		],
	};
});
