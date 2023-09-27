import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComplianceRoutingModule } from './compliance-routing.module';
import { ComplianceComponent } from './compliance/compliance.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';


@NgModule({
  declarations: [ComplianceComponent],
  imports: [
    CommonModule,
    ComplianceRoutingModule,
  
  ]
})
export class ComplianceModule { }
