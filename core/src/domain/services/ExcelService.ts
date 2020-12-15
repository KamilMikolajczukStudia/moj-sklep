export class DiscountRow {
  public readonly discount: number

  constructor(public readonly quantity: number, discount: number) {
    this.discount = discount / 100
  }
}

export class DiscountDelaysRow {
  public readonly discount: number
  constructor(public readonly days: number, discount: number) {
    this.discount = discount / 100
  }
}

const file1 = [
  new DiscountRow(10000, 10),
  new DiscountRow(500, 8),
  new DiscountRow(200, 6),
  new DiscountRow(100, 5),
]

const file2 = [
  new DiscountDelaysRow(21, -5),
  new DiscountDelaysRow(14, -4),
  new DiscountDelaysRow(12, -2),
  new DiscountDelaysRow(10, -1),
  new DiscountDelaysRow(8, 0),
  new DiscountDelaysRow(7, 1),
  new DiscountDelaysRow(5, 2),
  new DiscountDelaysRow(3, 4),
  new DiscountDelaysRow(1, 5),
]

const file3 = ["Szalikpol", "Świat czapek", "Spodniex"]

export class ExcelService {
  getDiscounts() {
    return file1
  }

  getDiscountsForDelays() {
    return file2
  }

  getBlackList() {
    return file3
  }
}
