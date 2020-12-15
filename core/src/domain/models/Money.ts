/**
 * Money value object
 */
export class Money {
  static readonly Zero = new Money(0)
  
  private readonly value: number

  constructor(value: number, private currency = "PLN") {
    this.value = Math.round(value * 100)
  }

  /**
   * +
   */
  add(other: Money) {
    if (this.currency != other.currency) {
      throw new Error(
        `Waluty nie są zgodne ${this.currency} i ${other.currency}`
      )
    }

    return new Money(this.toNumber() + other.toNumber(), this.currency)
  }

  /**
   * -
   */
  subtract(other: Money) {
    if (this.currency != other.currency) {
      throw new Error(
        `Waluty nie są zgodne ${this.currency} i ${other.currency}`
      )
    }

    return new Money(this.toNumber() - other.toNumber(), this.currency)
  }

  /**
   * *
   */
  times(many: number) {
    return new Money(this.toNumber() * many, this.currency)
  }

  toNumber() {
    return this.value / 100
  }

  /**
   * @param locate default 'pl-PL' - Localization eg
   */
  toString(locate = "pl-PL") {
    return Money.ToMoneyString(this.value, false, locate)
  }

  equal(other: Money) {
    return this.value == other.value
  }

  lessThen(other: Money) {
    return this.value < other.value
  }

  lessThenEqual(other: Money) {
    return this.value <= other.value
  }

  greaterThen(other: Money) {
    return this.value > other.value
  }

  greaterThenEquals(other: Money) {
    return this.value >= other.value
  }

  static from(value: number, currency?: string) {
    return new Money(value, currency)
  }

  private static readonly currencyOptions = {
    style: "currency",
    currency: "PLN",
  }

  private static readonly nonCurrencyOptions = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }

  static ToMoneyString(amount: number, currency = true, location = "pl-PL") {
    return amount.toLocaleString(
      location,
      currency ? Money.currencyOptions : Money.nonCurrencyOptions
    )
  }
}
