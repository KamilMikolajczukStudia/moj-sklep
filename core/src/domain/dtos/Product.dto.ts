import { IVariantDto } from './Variant.dto'

export interface IProductDto {
  id: number
  name: string
  description: string
  price: number
  img: string
  unit: string
  discount: number
  variants: IVariantDto[]
}
