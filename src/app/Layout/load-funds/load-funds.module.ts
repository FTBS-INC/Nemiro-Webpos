import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadFundsRoutingModule } from './load-funds-routing.module';
import { LoadFundsComponent } from './load-funds/load-funds.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { SharedModule } from 'src/app/shared/modules/shared.module';


@NgModule({
  declarations: [LoadFundsComponent],
  imports: [
    CommonModule,
    LoadFundsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  
    ModalModule.forRoot(),
    NgxTrimDirectiveModule,
    SharedModule
  ],
  // entryComponents: [LoadFundsComponent]
  providers: [BsModalRef]
})
export class LoadFundsModule { }
