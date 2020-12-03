export interface IVariantDto {
  name: string
  quantity: number
}

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
