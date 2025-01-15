export class Transaction {
  designation: string
  createdDate: Date
  amount: number
  type: TransactionType
  id: string
  author: string
  media: string

  constructor(init?: Partial<Transaction>) {
    Object.assign(this, init);
  }
}

export enum TransactionType {
  EXPENSE = "EXPENSE",
  RECIPE = "RECIPE"
}
