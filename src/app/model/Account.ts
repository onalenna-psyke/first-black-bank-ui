import {AccountType} from "./enums/AccountType";

export class Account{
  public accountNumber: string;
  public accountType: string;
  public balance: number;
  public idNumber: string;

  constructor(accountNumber: string, accountType: AccountType, balance: number, idNumber: string){
    this.accountNumber = accountNumber;
    this.accountType = accountType;
    this.balance = balance;
    this.idNumber = idNumber;
  }


}
