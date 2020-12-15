import { Cause } from "./Cause"
import { Money } from "../Money"
import { Exception } from "../../../utils"
import { MySuperCardFacade } from "./MySuperCard.facade"

export class Payer {
  readonly description: string
  readonly balance: Money
  readonly debitLimit: Money

  constructor(description: string, balance: Money, debitLimit = Money.Zero) {
    this.debitLimit = debitLimit
    this.description = description
    this.balance = balance
  }

  canAfford(amount: Money) {
    return this.balance
      .add(this.debitLimit)
      .subtract(amount)
      .greaterThenEquals(Money.Zero)
  }

  charge(amount: Money, cause: Cause) {
    if (!this.canAfford(amount)) {
      throw new Exception(`Nie stać cie`)
    }

    const paymentSystem = new MySuperCardFacade()

    return paymentSystem.cardPayment(this, amount, cause)
  }
}
