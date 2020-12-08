import { IRow } from "../../../interfaces/db"

export interface IWarehouseDao extends IRow {
  productId: number
  variant: string
  quantity: number
}
