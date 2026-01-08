import { z } from "zod";
import dotenv from "dotenv";

// Load environment variables from a `.env` file into `process.env`
dotenv.config();

// Define a schema for environment variables using Zod
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  PORT: z.string().regex(/^\d+$/, "PORT must be a number").transform(Number),
  ALLOWED_ORIGINS: z.string().default("http://localhost:5173"),
});

// Parse and validate the environment variables
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  // If validation fails, throw an error with details
  console.error(
    "Invalid environment variables:",
    z.treeifyError(parsedEnv.error),
  );
  process.exit(1); // Exit the application on validation error
}

// Export the validated environment variables
export const ENV = parsedEnv.data;
