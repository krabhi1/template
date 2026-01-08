import express from "express";
import cors from "cors";
import { ENV } from "./config";
import apiRouter from "./api";
import { errorMiddleware, loggerMiddleware } from "./middleware";

const app = express();

app.use(
  cors({
    origin: ENV.ALLOWED_ORIGINS.split(","),
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);
// Routes
app.use("/api", apiRouter);
// Must be the last middleware
app.use(errorMiddleware);

export default app;
