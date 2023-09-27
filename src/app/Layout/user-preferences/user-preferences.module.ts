import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPreferencesRoutingModule } from './user-preferences-routing.module';
import { UserPreferencesComponent } from './user-preferences/user-preferences.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { SharedModule } from 'src/app/shared/modules/shared.module';


@NgModule({
  declarations: [UserPreferencesComponent],
  imports: [
    CommonModule,
    UserPreferencesRoutingModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    NgxTrimDirectiveModule,
    FormsModule,
    SharedModule
  ],
  providers: [BsModalRef]
})
export class UserPreferencesModule { }
