export class Money {
  private readonly value: number

  constructor(value: number, private currency = "PLN") {
    this.value = Math.round(value * 100)
  }

  public add(other: Money) {
    if (this.currency != other.currency) {
      throw new Error(
        `Waluty nie są zgodne ${this.currency} i ${other.currency}`
      )
    }

    return new Money(this.toNumber() + other.toNumber(), this.currency)
  }

  public times(many: number) {
    return new Money(this.toNumber() * many, this.currency)
  }

  public toNumber() {
    return this.value / 100
  }

  public toString(firstValue = true) {
    return `${firstValue ? "" : this.currency + " "}${this.value}${
      firstValue ? " " + this.currency : ""
    }`
  }
}
