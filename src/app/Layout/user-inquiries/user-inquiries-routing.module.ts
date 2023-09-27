import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserInquiriesComponent } from './user-inquiries/user-inquiries.component';


const routes: Routes = [
  {
    path: '',
    component: UserInquiriesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserInquiriesRoutingModule { }
