import { UserRepository } from "./user.repository";

export class UserService {
  constructor(private userRepository: UserRepository) {}
  async getUserProfile(userId: string) {
    throw new Error("Method not implemented.");
  }
}
