import { IRow } from "../../../IRow"

export interface IProductDao extends IRow {
  productId: number
  name: string
  description: string
  price: number
  discount: number
  img: string
  unit: string
}

export interface IVariantDao extends IRow {
  variantId: number
  name: string
  description: string
}

export interface IProductVariantDao extends IRow {
  variantId: number
  productId: number
  quantity: number
}

export interface IVarintsOfProduct extends IVariantDao, IProductVariantDao {
  
}