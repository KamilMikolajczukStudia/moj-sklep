import { cmp, select } from "../../Imports"

import { Order } from "../models"
import { IOrderDao } from "../daos"
import { OrderNotFoundExeception } from "../exceptions"

export class OrderRepository {
  public async withId(id: number) {
    const daos = await select<IOrderDao>()
      .from("retailOrders")
      .where(cmp<IOrderDao>("orderId", "=", id))
      .run()

    if (daos.length === 0) {
      throw new OrderNotFoundExeception(id)
    }

    return new Order(daos[0])
  }

  public async allProductsOf(userId: number) {
    return select<IOrderDao>().from("retailOrders").where(cmp<IOrderDao>('userId', '=', userId)).run()
  }
}
