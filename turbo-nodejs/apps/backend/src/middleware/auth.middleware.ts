import { Request, Response, NextFunction } from "express";

/**
 * Middleware to protect routes and ensure the user is authenticated using Better Auth.
 * It validates the session from cookies or the Authorization header.
 */
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  //TODO: Implement authentication logic here
  next();
};
