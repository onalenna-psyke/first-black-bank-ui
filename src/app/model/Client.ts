import {Account} from "./Account";

export class Client{
  public idNumber: string;
  public name: string;
  public surname: string;
  public email: string;
  public cellphoneNumber: string;
  public dateOfBirth: string;
  public account: Account[];

  constructor (idNumber: string, name: string, surname: string, email: string,
               cellphoneNumber: string, dateOfBirth: string, account){
      this.idNumber = idNumber;
      this.name = name;
      this.surname = surname;
      this.email = email;
      this.cellphoneNumber = cellphoneNumber;
      this.dateOfBirth = dateOfBirth;
      this.account = account;
      }
  }
