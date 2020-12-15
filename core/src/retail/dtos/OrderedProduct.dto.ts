import { IProductDto, IVariantDto } from "../../domain/dtos"

export interface IOrderedProductDto {
  product: IProductDto
  variant: IVariantDto
  quantity: number
}
