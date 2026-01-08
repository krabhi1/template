import { Router } from "express";
import authRouter from "./auth/auth.routes";
import userRouter from "./user/user.routes";

const apiRouter = Router();
apiRouter.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});
apiRouter.use("/auth", authRouter);
apiRouter.use("/users", userRouter);

export default apiRouter;
