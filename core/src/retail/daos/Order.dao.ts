import { IRow } from '../../../interfaces/db'

export interface IOrderDao extends IRow {
  id: number
  userId: number
  price: number
  variants: string
  products: string
}
