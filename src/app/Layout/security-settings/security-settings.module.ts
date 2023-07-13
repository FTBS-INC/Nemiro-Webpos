import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecuritySettingsRoutingModule } from './security-settings-routing.module';
import { SecuritySettingsComponent } from './security-settings/security-settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { SharedModule } from 'src/app/shared/modules/shared.module';


@NgModule({
  declarations: [SecuritySettingsComponent],
  imports: [
    CommonModule,
    SecuritySettingsRoutingModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    NgxTrimDirectiveModule,
    FormsModule,
    SharedModule
  ],
  providers: [BsModalRef]
})
export class SecuritySettingsModule { }
