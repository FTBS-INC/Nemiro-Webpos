import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BulkLoadUnloadRoutingModule } from './bulk-load-unload-routing.module';
import { BulkLoadUnloadComponent } from './bulk-load-unload/bulk-load-unload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { SharedModule } from 'src/app/shared/modules/shared.module';


@NgModule({
  declarations: [BulkLoadUnloadComponent],
  imports: [
    CommonModule,
    BulkLoadUnloadRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule.forRoot(),
    NgxTrimDirectiveModule,
    SharedModule
  ],
  providers: [BsModalRef]
})
export class BulkLoadUnloadModule { }
