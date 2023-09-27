import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerInquiryComponent } from './customer-inquiry/customer-inquiry.component';


const routes: Routes = [
  {
    path: '',
    component: CustomerInquiryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerInquiryRoutingModule { }
