import { UserService } from "./user.service";
import { Request, Response } from "express";

export class UserController {
  constructor(private userService: UserService) {}

  async getUserProfile(req: Request, res: Response) {}
}
