export interface IOperation {
  id: number
  userFrom: number
  userTo: number
  amount: number
  title: string
  isoDate: string
}

export default class Operation
  implements Pick<IOperation, Exclude<keyof IOperation, 'isoDate'>> {
  id: number
  userFrom: number
  userTo: number
  amount: number
  title: string
  date: Date

  constructor(operation: IOperation) {
    this.id = operation.id
    this.title = operation.title
    this.userTo = operation.userTo
    this.amount = operation.amount
    this.userFrom = operation.userFrom

    this.date = new Date(operation.isoDate)
  }

  public getData(): IOperation {
    const { date, ...rest } = this


    return { ...rest, isoDate: date.toISOString() }
  }
}
