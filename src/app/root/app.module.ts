import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './root-component/app.component';
import { SharedModule } from '../shared/modules/shared.module';
import { ModalModule } from "ngx-bootstrap/modal";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AgGridModule } from "ag-grid-angular";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { Interceptor } from '../shared/interceptors';
import { APP_BASE_HREF } from '@angular/common';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    SimpleNotificationsModule.forRoot({
      position: ['top', 'right'],
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: false,
      clickIconToClose: true,
      preventDuplicates: true
    }),
    SharedModule,
    ModalModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(), 
    AgGridModule,

  


  ],
  declarations: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true, },
    // { provide: APP_BASE_HREF, useValue: '/app/' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
