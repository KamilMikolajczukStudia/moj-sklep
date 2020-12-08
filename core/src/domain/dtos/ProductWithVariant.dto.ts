import { IVariantDto } from './Variant.dto'

export interface ProductWithVariant {
  id: number
  name: string
  description: string
  price: number
  img: string
  unit: string
  discount: number
  variant: IVariantDto
}
