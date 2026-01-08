import { Router } from "express";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";
const userController = new UserController(
  new UserService(new UserRepository()),
);
const userRouter = Router();

userRouter.get("/:userId", userController.getUserProfile.bind(userController));

export default userRouter;
