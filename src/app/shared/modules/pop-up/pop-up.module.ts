import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PopUpRoutingModule } from './pop-up-routing.module';
import { PopUpComponent } from './pop-up/pop-up.component';


@NgModule({
  declarations: [PopUpComponent],
  imports: [
    CommonModule,
    PopUpRoutingModule,
    BrowserModule,
    AlertModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule,

  ],
  // providers: [AlertConfig, BsDatepickerConfig, BsDropdownConfig,BsModalService],
  //  bootstrap: [AppComponent]
})
export class PopUpModule { }
