import { query } from "../../Query"
import { IOrderProposalDao } from "./daos"
import { Exception } from "../../Imports.app"

export class OrderProposalRepository {
  public async withId(id: number) {
    const daos = await query<IOrderProposalDao>(
      `
    select *
    from
    wholesaleOrders
    where orderId = ?
    `,
      [id]
    )

    throw new Exception(`Product not found id = ${id}`)
  }

  // daoToOrder(order: IOrderProposalDao): OrderProposal {
  //   throw new Exception("TODO")
  // }
}
