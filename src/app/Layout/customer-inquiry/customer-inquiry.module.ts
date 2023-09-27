import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerInquiryRoutingModule } from './customer-inquiry-routing.module';
import { CustomerInquiryComponent } from './customer-inquiry/customer-inquiry.component';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { SharedModule } from 'src/app/shared/modules/shared.module';


@NgModule({
  declarations: [CustomerInquiryComponent],
  imports: [
    CommonModule,
    CustomerInquiryRoutingModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    NgxTrimDirectiveModule,
    FormsModule,
    SharedModule
  ],
  providers: [BsModalRef]
})
export class CustomerInquiryModule { }
