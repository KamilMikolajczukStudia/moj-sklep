import { Money } from "../../domain"

export class Discount {
  constructor(public readonly value: Money) {}
}
