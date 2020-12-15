import { IRow } from '../../../IRow'

export interface IRetailOrderDao extends IRow {
  retailOrderId: number
  userId: number
  price: number
  date: Date
}
