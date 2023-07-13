import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KycReviewRoutingModule } from './kyc-review-routing.module';
import { KycReviewComponent } from './kyc-review/kyc-review.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ComponentsStateButtonModule } from 'src/app/shared/shared-components/state-button/components.state-button.module';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [KycReviewComponent],
  imports: [
    CommonModule,
    KycReviewRoutingModule,
  ReactiveFormsModule,
  FormsModule,
  ModalModule.forRoot(),
    ComponentsStateButtonModule,
    NgxTrimDirectiveModule,
    BsDropdownModule.forRoot(),
    NgxPaginationModule
  ]
})
export class KycReviewModule { }
