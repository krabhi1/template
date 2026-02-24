import { defineConfig } from "drizzle-kit";
import fs from 'node:fs';
import path from 'node:path';

// Helper to find the local D1 SQLite file
function getLocalD1() {
  const basePath = path.resolve('.wrangler/state/v3/d1/miniflare-D1DatabaseObject');
  if (fs.existsSync(basePath)) {
    const files = fs.readdirSync(basePath);
    const sqliteFile = files.find((f) => f.endsWith('.sqlite'));
    if (sqliteFile) return path.join(basePath, sqliteFile);
  }
  return null;
}
const localD1Path = getLocalD1();
export default defineConfig({
  out: "./migrations",
  schema: "./src/server/db/schema/index.ts",
  dialect: "sqlite",
  // For Cloudflare D1, we don't need to provide dbCredentials here 
  // as migrations are generated based on the schema and applied 
  // via the wrangler CLI.
  // However, we can specify the local SQLite file for development purposes.
  ...(localD1Path ? { dbCredentials: { url: `file:${localD1Path}` } } : {})
});