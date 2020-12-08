import { Exception } from "../../utils"
import { User } from "../../authentication/models"
import { Money } from "../../domain"
import { AcceptedOrder } from "./AcceptedOrder"
import { OrderPosition } from "./OrderPosition"
import { PaidOrder } from "./PaidOrder"
import { Payment } from "./Payment"
import { Discount } from "./Discount"

export class OrderProposal {
  readonly user: User
  readonly price: Money
  readonly deliveryDate: Date
  readonly discounts: Discount[]
  readonly positions: OrderPosition[]

  constructor(positions: OrderPosition[], user: User, discounts: Discount[] = []) {
    this.positions = positions
    this.price = this.calculatePrice()
    this.deliveryDate = this.calculateDeliveryDate()
    this.user = user
    this.discounts = discounts
  }

  checkAvailability() {
    for (const position of this.positions) {
      if (!position.isAviable()) {
        return false
      }
    }

    return true
  }

  proposeNewOrderProposal(): OrderProposal {
    return new OrderProposal(this.positions.map((p) => p.proposeNewPosition()), this.user)
  }

  requiresAcceptance() {
    return this.price.lessThen(Money.from(50000))
  }

  acceptOrderBy(manager: User): AcceptedOrder {
    return new AcceptedOrder(this, manager)
  }

  payForOrder(payment: Payment): PaidOrder {
    if (payment.sum.isEqual(this.price)) {
      return new PaidOrder(this, payment)
    }

    throw new Exception(`Za mało pieniędzy`)
  }

  addDiscounts(discounts: Discount[]) {
    return new OrderProposal(this.positions, this.user, [...this.discounts, ...discounts])
  }

  save() {
    throw new Exception('TODO')
  }

  private calculatePrice() {
    let sum = Money.from(0)

    for (const position of this.positions) {
      sum = sum.add(position.price)
    }

    return sum
  }

  private calculateDeliveryDate() {
    let deliveryDate = new Date()

    for (const position of this.positions) {
      if (position.deliveryDate > deliveryDate) {
        deliveryDate = position.deliveryDate
      }
    }

    return deliveryDate
  }
}
