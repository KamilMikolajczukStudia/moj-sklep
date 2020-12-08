import { IRow } from "../../../interfaces/db"

export interface IProductDao extends IRow {
  productId: number
  name: string
  description: string
  discount: number
  variants: string
  variantsQuantity: string
  price: number
  img: string
  unit: string
}
