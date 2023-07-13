import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RedeemFundsRoutingModule } from './redeem-funds-routing.module';
import { RedeemFundsComponent } from './redeem-funds/redeem-funds.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { SharedModule } from 'src/app/shared/modules/shared.module';


@NgModule({
  declarations: [RedeemFundsComponent],
  imports: [
    CommonModule,
    RedeemFundsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    
    ModalModule.forRoot(),
    NgxTrimDirectiveModule,
    SharedModule
  ],
  providers: [BsModalRef]
})
export class RedeemFundsModule { }
