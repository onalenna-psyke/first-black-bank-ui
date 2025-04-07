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
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzDropDownDirective, NzDropdownMenuComponent} from 'ng-zorro-antd/dropdown';
import {NzMenuDirective, NzMenuItemComponent} from 'ng-zorro-antd/menu';
import {NzTooltipDirective} from 'ng-zorro-antd/tooltip';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NzWaveDirective} from 'ng-zorro-antd/core/wave';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';

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
    NzOptionComponent
  ],
  templateUrl: './view-account.component.html',
  styleUrl: './view-account.component.scss'
})
export class ViewAccountComponent {

  accountFormGroup: FormGroup;
  accountTypes = [AccountType.SAVINGS,AccountType.CHEQUE];
  account: Account;
  idNumber = "9702120589089";
  clientAccounts: Account[];
  isAddAccountVisible = false;

  constructor(private accountService: AccountService, private modal: NzModalService) {
    this.account = new Account("", AccountType.CHEQUE, 0, this.idNumber);
    this.clientAccounts = [
       new Account("ACC1", AccountType.CHEQUE, 0, this.idNumber),
       new Account("ACC2", AccountType.SAVINGS, 0, this.idNumber),
       new Account("ACC3", AccountType.SAVINGS, 0, this.idNumber),
       new Account("ACC4", AccountType.SAVINGS, 0, this.idNumber),
       new Account("ACC5", AccountType.SAVINGS, 0, this.idNumber)];

    this.accountFormGroup = new FormBuilder().group({
      accountType: ['', [Validators.required]]});
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
    console.log(this.accountFormGroup.get('accountType')?.errors);
    this.isAddAccountVisible = true;
  }

  handleSubmit(): void {
    this.addAccount();
    this.isAddAccountVisible = false;
  }

  handleCancel(): void {
    this.isAddAccountVisible = false;
    this.accountFormGroup.reset();
  }

  getClientAccount(){
    this.accountService.getClientAccounts(this.account).subscribe(accounts => {
      if(accounts instanceof ErrorModel){
        this.err(accounts.message);
        //console.log(accounts.message);
      }else {
        this.clientAccounts = accounts;
        console.log(this.clientAccounts);
      }
    });
  }

  addAccount(){
    this.account.accountType = this.accountFormGroup.controls['accountType'].value;

    this.accountService.addAccount(this.account).subscribe(account => {
      if(account instanceof ErrorModel){
        //console.log(result.message);
        this.err(account.message)
      } else {
        //console.log(account);
        this.account = account;
        console.log(this.account);
        this.getClientAccount();
      }
    });
  }

  viewTransactions(accountNumber: string) {

  }
}
