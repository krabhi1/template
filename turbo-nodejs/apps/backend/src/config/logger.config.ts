import pino from "pino";
import { ENV } from "./env.config";
// Determine the logging level based on the environment
const isProduction = ENV.NODE_ENV === "production";

// Create Pino logger instance
export const logger = pino({
  level: isProduction ? "info" : "debug",
  transport: isProduction
    ? undefined // Disable transport for production, write logs as JSON
    : {
        target: "pino-pretty", // Use pino-pretty for development logs
        options: {
          colorize: true, // Highlight log levels with colors
          levelFirst: true, // Show the level first in log output
          translateTime: "yyyy-mm-dd HH:MM:ss", // Readable timestamps
          ignore: "pid,hostname", // Hide irrelevant metadata like pid/host
        },
      },
});
