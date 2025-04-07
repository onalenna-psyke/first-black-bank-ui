import { Injectable } from '@angular/core';
import {Account} from '../model/Account';
import {catchError, Observable, of} from 'rxjs';
import {ErrorModel} from '../model/ErrorModel';
import {HttpClient} from '@angular/common/http';

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
    return  this.httpClient.post(this.baseUrl + '/get-client-account', account).pipe(
      catchError(err => this.handleError(err)));
  }

  public handleError(err: any) : Observable<any> {
    return of(new ErrorModel(err.error));
  }
}
