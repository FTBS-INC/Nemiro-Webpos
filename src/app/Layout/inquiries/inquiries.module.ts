import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InquiriesRoutingModule } from './inquiries-routing.module';
import { InquiriesComponent } from './inquiries/inquiries.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';


@NgModule({
  declarations: [InquiriesComponent],
  imports: [
    CommonModule,
    InquiriesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DatepickerModule,
    NgxPaginationModule,
    NgxTrimDirectiveModule,
    ModalModule.forRoot(),

  ]
})
export class InquiriesModule { }
