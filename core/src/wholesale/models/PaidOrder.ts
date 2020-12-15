import { OrderProposal } from "./OrderProposal"
import { Payment } from "./Payment"

export class PaidOrder {
  constructor(
    public readonly order: OrderProposal,
    public readonly payment: Payment
  ) {}
}
