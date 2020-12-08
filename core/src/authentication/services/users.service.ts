import { User } from "../models"
import { UserRepository } from "../repositories"

export class UserService {
  private userRepository = new UserRepository()
  static Menager = new User({ userId: -1, login: "Menager", password: "-" })
}
