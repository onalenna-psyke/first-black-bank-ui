import { Injectable } from '@angular/core';
import {Account} from '../model/Account';
import {catchError, Observable, of} from 'rxjs';
import {ErrorModel} from '../model/ErrorModel';
import {HttpClient} from '@angular/common/http';
import {Transaction} from '../model/Transaction';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'http://localhost:8080/client-account';

  constructor(private httpClient: HttpClient) {}

  public addAccount(account: Account): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/add-account', account).pipe(
      catchError(err => this.handleError(err)));
  }

  public getClientAccounts(account: Account): Observable<any>{
    return  this.httpClient.post(this.baseUrl + '/get-client-accounts', account).pipe(
      catchError(err => this.handleError(err)));
  }

  public transaction(transaction: Transaction): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/transaction', transaction).pipe(
      catchError(err => this.handleError(err)));
  }

  public getTransactions(transaction: Transaction): Observable<any> {
    return this,this.httpClient.post(this.baseUrl + '/transaction/get-transactions', transaction).pipe(
      catchError(err=>this.handleError(err)));
  }

  public handleError(err: any) : Observable<any> {
    return of(new ErrorModel(err.error));
  }
}
