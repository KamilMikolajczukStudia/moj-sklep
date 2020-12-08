import { User } from "authentication/models"
import { OrderProposal } from "./Order"

export class AcceptedOrder {
  constructor(
    public readonly order: OrderProposal,
    public readonly user: User
  ) {}
}
