import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistributersRoutingModule } from './distributers-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DistributersComponent } from './distributers/distributers.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/modules/shared.module';



@NgModule({
  declarations: [DistributersComponent],
  imports: [
    CommonModule,
    DistributersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    SharedModule

  ]
})
export class DistributersModule { }
