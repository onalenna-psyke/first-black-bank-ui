import {TransactionType} from './enums/TransactionType';

export class Transaction {

  public transactionNumber: string;
  public accountNumber: string;
  public recipientAccountNumber: string;
  public transactionType: TransactionType;
  public amount: number;
  public dateTime: string;



  constructor(transactionNumber: string, accountNumber: string, recipientAccountNumber: string, transactionType: TransactionType,
              amount: number, dateTime: string){
    this.transactionNumber = transactionNumber;
    this.accountNumber = accountNumber;
    this.recipientAccountNumber = recipientAccountNumber;
    this.transactionType = transactionType;
    this.amount = amount;
    this.dateTime = dateTime;
  }
}
