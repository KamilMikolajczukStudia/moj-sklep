import { User } from "authentication/models"
import { OrderProposal } from "./Order"
import { Payment } from "./Payment"

export class PaidOrder {
  constructor(
    public readonly order: OrderProposal,
    public readonly payment: Payment
  ) {}
}
