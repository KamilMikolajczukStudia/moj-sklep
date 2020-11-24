export interface INewOperationDto {
  title: string
  amount: number
  userTo: number
}

export interface IOperationDto {
  id: number
  amount: number
  title: string
  isoDate: string
  userName: string
}
