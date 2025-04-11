import {Component} from '@angular/core';
import {AccountService} from '../service/account.service';
import {Account} from '../model/Account';
import {AccountType} from '../model/enums/AccountType';
import {ErrorModel} from '../model/ErrorModel';
import {NzModalComponent, NzModalContentDirective, NzModalService} from 'ng-zorro-antd/modal';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {NzDividerComponent} from 'ng-zorro-antd/divider';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzIconDirective, NzIconModule} from 'ng-zorro-antd/icon';
import {NzDropDownDirective, NzDropdownMenuComponent} from 'ng-zorro-antd/dropdown';
import {NzMenuDirective, NzMenuItemComponent} from 'ng-zorro-antd/menu';
import {NzTooltipDirective} from 'ng-zorro-antd/tooltip';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NzWaveDirective} from 'ng-zorro-antd/core/wave';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {NzInputDirective, NzInputGroupComponent} from 'ng-zorro-antd/input';
import {TransactionType} from '../model/enums/TransactionType';
import {Transaction} from '../model/Transaction';

@Component({
  selector: 'app-view-account',
  imports: [
    NzCardComponent,
    NzRowDirective,
    NzColDirective,
    NgForOf,
    NzDividerComponent,
    NzButtonComponent,
    NzIconDirective,
    NzDropDownDirective,
    NzDropdownMenuComponent,
    NzMenuDirective,
    NzMenuItemComponent,
    NzTooltipDirective,
    NzModalComponent,
    NzModalContentDirective,
    FormsModule,
    NgIf,
    NzWaveDirective,
    ReactiveFormsModule,
    NgClass,
    NzIconModule,
    NzSelectComponent,
    NzOptionComponent,
    NzInputDirective,
    NzInputGroupComponent
  ],
  templateUrl: './view-account.component.html',
  styleUrl: './view-account.component.scss'
})
export class ViewAccountComponent {

  accountFormGroup: FormGroup;
  transactionFormGroup: FormGroup;
  accountTypes = [AccountType.SAVINGS,AccountType.CHEQUE];
  account: Account;
  transactionTypes = [TransactionType.WITHDRAWAL, TransactionType.DEPOSIT, TransactionType.TRANSFER];
  transaction: Transaction;
  transactions: Transaction[];
  idNumber = '9702120589089';
  clientAccounts: Account[];
  isAddAccountVisible = false;
  isTransactionVisible = false;

  constructor(private accountService: AccountService, private modal: NzModalService) {
    this.account = new Account('', AccountType.CHEQUE, 0, this.idNumber);
    this.transaction = new Transaction('','','', TransactionType.WITHDRAWAL, 0,'');
    this.clientAccounts = [
       new Account('ACC1', AccountType.CHEQUE, 0, this.idNumber),
       new Account('ACC2', AccountType.SAVINGS, 0, this.idNumber),
       new Account('ACC3', AccountType.SAVINGS, 0, this.idNumber),
       new Account('ACC4', AccountType.SAVINGS, 0, this.idNumber),
       new Account('ACC5', AccountType.SAVINGS, 0, this.idNumber)];
    this.transactions = [
      new Transaction('','','', TransactionType.DEPOSIT, 0,'')
    ];
    this.accountFormGroup = new FormBuilder().group({
      accountType: ['', [Validators.required]]});

    this.transactionFormGroup = new FormBuilder().group({
      amount: ['', [Validators.required]],
      transactionType: ['', [Validators.required]],
      recipientAccountNumber: ['', [Validators.required]]
    });
  }

  err(message: string): void{
    this.modal.error({
      nzTitle: 'Error',
      nzContent: message,
      nzOnOk: ()=>console.log('OK')
    });
  }

  success(message: string): void{
    this.modal.success({
      nzTitle: 'Success',
      nzContent: message,
      nzOnOk: ()=>console.log('OK')
    });
  }

  showAddAccountModal(): void {
    this.isAddAccountVisible = true;
  }

  showTransactionModal(accountNumber: string): void {
    this.isTransactionVisible = true;
    this.account.accountNumber = accountNumber;
  }

  handleAddAccountSubmit(): void {
    this.addAccount();
    this.isAddAccountVisible = false;
  }

  handleTransactionSubmit(): void {
    this.makeTransaction();
    this.isTransactionVisible = false;
  }

  handleCancel(): void {
    this.isTransactionVisible = false;
    this.isAddAccountVisible = false;
    this.accountFormGroup.reset();
    this.transactionFormGroup.reset();
  }

  addAccount(){
    this.account.accountType = this.accountFormGroup.get('accountType')?.value;

    this.accountService.addAccount(this.account).subscribe(account => {
      if(account instanceof ErrorModel){
        this.err(account.message)
      } else {
        this.account = account;
        this.getClientAccount();
        this.success('Successfully added account!');
      }
    });
  }

  makeTransaction(): void {
    this.transaction.accountNumber = this.account.accountNumber;
    this.transaction.amount = this.transactionFormGroup.get('amount')?.value;
    this.transaction.transactionType = this.transactionFormGroup.get('transactionType')?.value;
    this.transaction.recipientAccountNumber = this.transactionFormGroup.get('recipientAccountNumber')?.value;

    this.accountService.transaction(this.transaction).subscribe(transaction => {
      if(transaction instanceof ErrorModel){
        this.err(transaction.message);
      }else{
        this.transaction = transaction;
        this.getClientAccount();
        this.success('Transaction was successfully!');
      }
    })
  }

  getClientAccount(){
    this.accountService.getClientAccounts(this.account).subscribe(accounts => {
      if(accounts instanceof ErrorModel){
        this.err(accounts.message);
      }else {
        this.clientAccounts = accounts;
      }
    });
  }

  getTransactions(accountNumber: string) {
    this.transaction.accountNumber = accountNumber;

    this.accountService.getTransactions(this.transaction).subscribe(transactions => {
      if(transactions instanceof ErrorModel){
        this.err(transactions.message);
      } else {
        this.transactions = transactions;
        console.log(this.transactions);
        this.success('Successfully retrieved transactions!');
      }
    })
  }
}
