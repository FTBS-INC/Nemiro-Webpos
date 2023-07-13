import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionInquiriesComponent } from './transaction-inquiries/transaction-inquiries.component';


const routes: Routes = [
  {
    path: '',
    component: TransactionInquiriesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionInquiriesRoutingModule { }
