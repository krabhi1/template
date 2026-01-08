import { logger } from "@/config";
import { Request, Response, NextFunction } from "express";

/**
 * Global Error Handler Middleware
 * Intercepts all 'throw' statements or next(err) calls
 */
export const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const error = err instanceof Error ? err : new Error(String(err));
  const status = (err as { status?: number })?.status || 500;

  // 1. Log the full error for debugging (Server-side only)
  logger.error(
    {
      message: error.message,
      stack: error.stack,
      path: req.path,
      method: req.method,
      userId: (req as any).user?.id,
    },
    "Unhandled Exception Caught",
  );

  // 2. Determine the Status Code
  const statusCode = status;

  // 3. Send a clean, standardized response to the client
  res.status(statusCode).json({
    success: false,
    error: {
      message: statusCode === 500 ? "INTERNAL_SERVER_ERROR" : error.message,
      // Only send stack trace in development mode for security
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    },
    timestamp: Date.now(),
  });
};
