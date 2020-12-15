import { IRetailOrderDao } from "./daos"
import { Exception } from "../../Imports.app"

export class RetailOrderRepository {
  public async withId(id: number) {
    throw new Exception("TODO")
  }

  private async daoToOrder(order: IRetailOrderDao) {
    throw new Exception("TODO")
  }

  private async daoToProductVariants() {
    throw new Exception("TODO")
  }
}
