import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./migrations",
  schema: "./src/server/db/schema/index.ts",
  dialect: "sqlite",
  // For Cloudflare D1, we don't need to provide dbCredentials here 
  // as migrations are generated based on the schema and applied 
  // via the wrangler CLI.
});