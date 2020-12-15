import { User } from "../../authentication/models"
import { OrderProposal } from "../../wholesale/models"
import { Discount } from "../../wholesale/models/Discount"
import { ExcelService } from "../../domain/services/ExcelService"
import { StatisticsService } from "../../domain/services/StatisticsServis"

export class DiscountsService {
  private readonly blackListFactor = 0.5

  private readonly excel = new ExcelService()
  private readonly blackList = this.excel.getBlackList()

  async discountsFor(user: User, order: OrderProposal) {
    const discounts: Discount[] = []

    for (const position of order.positions) {
      for (const discount of this.excel.getDiscounts()) {
        if (position.quantity >= discount.quantity) {
          discounts.push(new Discount(position.price.times(discount.discount)))
          break
        }
      }
    }

    const statistics = new StatisticsService()

    const userDelays = await statistics.delays(user.id)

    for (const discount of this.excel.getDiscountsForDelays()) {
      if (userDelays >= discount.days) {
        let discountValue = order.price.times(discount.discount)

        if (this.blackList.includes(user.login)) {
          discountValue = discountValue.times(this.blackListFactor)
        }

        discounts.push(new Discount(discountValue))

        break
      }
    }

    return discounts
  }
}
