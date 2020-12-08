import { Money } from "../../domain"

export class Payment {
  constructor(public readonly sum: Money) {}
}
