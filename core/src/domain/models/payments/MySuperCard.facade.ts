import { Cause } from "./Cause"
import { Payer } from "./Payer"
import { Money } from "../Money"
import { Payment } from "../../../wholesale/models/Payment"
import { User, ERoles } from "../../../authentication/models"

export class MySuperCardFacade {
  // private static Company = new Payer('Moje ciuszki', Money.Zero, Money.Zero)

  constructor() {}

  cardPayment(payer: Payer, amount: Money, cause: Cause) {
    // MasterCard.pay(
    //   new MasterCard.Payer(payer.description),
    //   MySuperCardFacade.Company,
    //   amount.toNumber(),
    //   cause.description
    // )

    return new Payment(amount)
  }

  loadPayerFrom(user: User) {
    // const payer = MasterCard.loadPayer(user.id)
    // const aviableMoney = payer.AviableMoney()
    const aviableMoney = Math.floor(Math.random() * 10000) + 200

    // const limit = payer.Limit()
    const limit = Math.floor(Math.random() * 100) + 200

    return new Payer( `${user.login} ${ERoles[user.role]}`, Money.from(aviableMoney), Money.from(limit) )
  }
}
