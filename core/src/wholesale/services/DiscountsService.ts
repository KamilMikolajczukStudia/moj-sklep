import { User } from "../../authentication/models"
import { Discount } from "../../wholesale/models/Discount"

export class DiscountsService {
  discountsFor(user: User): Discount[] {
    return []
  }
}