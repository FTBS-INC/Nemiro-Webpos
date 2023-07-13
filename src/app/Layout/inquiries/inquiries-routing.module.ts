import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InquiriesComponent } from './inquiries/inquiries.component';


const routes: Routes = [

  {
    path: '',
    component: InquiriesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InquiriesRoutingModule { }
