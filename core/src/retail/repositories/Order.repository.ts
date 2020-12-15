import { select } from "../../Imports"

import { Order } from "../models"
import { IOrderDao } from "../daos"
import { Exception } from "../../utils"
import { OrderedProduct } from "../models"
import { OrderNotFoundExeception } from "../exceptions"

export class OrderRepository {
  public async withId(id: number) {
    const daos = await select<IOrderDao>()
      .from("retailOrders")
      .where(`orderId = ${id}`)
      .run()

    if (daos.length === 0) {
      throw new OrderNotFoundExeception(id)
    }

    return this.daoToOrder(daos[0])
  }

  private async daoToOrder(order: IOrderDao): Promise<Order> {
    throw new Exception("TODO")
  }

  private async daoToProductVariants(): Promise<OrderedProduct[]> {
    throw new Exception("TODO")
  }

  public async allProductsOf(userId: number) {
    return select<IOrderDao>()
      .from("retailOrders")
      .where(`userId = ${userId}`)
      .run()
  }
}
