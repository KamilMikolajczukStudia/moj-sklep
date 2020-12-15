import { ERoles, User } from "../models"
import { UserRepository } from "../../Imports"

export class UserService {
  private userRepository = new UserRepository()
  
  static Menager = new User(-1, "Menager", "-", ERoles.manager)
}
