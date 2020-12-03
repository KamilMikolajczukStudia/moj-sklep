import { IProductDto } from '../Imports'

export class Variant {
  constructor(public readonly name: string, public readonly quantity: number) {
  }

  isAvailableIn(quantity = 1) {
    return this.quantity >= quantity
  }
}

export class ProductData {
  readonly id: number
  readonly name: string
  readonly nameLower: string
  readonly description: string[]
  readonly discount: number | null
  readonly unit: string
  readonly img: string
  readonly price: number
  readonly variants: Variant[]

  constructor(private readonly _product: IProductDto) {
    this.id = _product.id
    this.name = _product.name
    this.nameLower = _product.name.toLowerCase()
    this.description = _product.description.split('[br]')
    this.discount = _product.discount <= 0 ? null : _product.discount
    this.unit = _product.unit
    this.img = _product.img
    this.price = _product.price
    this.variants = _product.variants.map(v => new Variant(v.name, v.quantity))
  }
}
