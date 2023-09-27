import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionInquiriesRoutingModule } from './transaction-inquiries-routing.module';
import { TransactionInquiriesComponent } from './transaction-inquiries/transaction-inquiries.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap/datepicker';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


@NgModule({
  declarations: [TransactionInquiriesComponent],
  imports: [
    CommonModule,
    TransactionInquiriesRoutingModule,
    FormsModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    DatepickerModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule
  
  ]
})
export class TransactionInquiriesModule { }
