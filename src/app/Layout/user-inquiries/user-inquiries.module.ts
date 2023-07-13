import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserInquiriesRoutingModule } from './user-inquiries-routing.module';
import { UserInquiriesComponent } from './user-inquiries/user-inquiries.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxPaginationModule } from 'ngx-pagination';

import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [UserInquiriesComponent],
  imports: [
    CommonModule,
    UserInquiriesRoutingModule,
    BsDropdownModule.forRoot(),
    FormsModule,
    ModalModule.forRoot(),
    DatepickerModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    BsDropdownModule,
    BsDatepickerModule

  ]
})
export class UserInquiriesModule { }
