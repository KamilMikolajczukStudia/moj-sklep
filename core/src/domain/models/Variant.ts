import { IVariantDto } from "../dtos"

export class Variant {
  constructor(public readonly name: string, public readonly quantity: number) {}

  isAvailableIn(quantity = 1) {
    return this.quantity >= quantity
  }

  dto(): IVariantDto {
    return {
      ...this,
    }
  }
}
