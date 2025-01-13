export class Transaction {
  designation: string
  createdDate: string
  amount: number
  type: TransactionType
  id: string
  author: string
  media: string
}

export enum TransactionType {
  EXPENSE = "EXPENSE",
  RECIPE = "RECIPE"
}
