import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardsLayoutRoutingModule } from './cards-layout-routing.module';
import { CardsLayoutComponent } from './cards-layout/cards-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { LoadFundsComponent } from '../load-funds/load-funds/load-funds.component';


@NgModule({
  declarations: [CardsLayoutComponent],
  imports: [
    CommonModule,
    CardsLayoutRoutingModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    NgxTrimDirectiveModule,
    FormsModule
    
  ],
  // entryComponents: [LoadFundsComponent]
})
export class CardsLayoutModule { }
