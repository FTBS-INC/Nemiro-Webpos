import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RedeemFundsComponent } from './redeem-funds/redeem-funds.component';


const routes: Routes = [
  {
    path: '',
    component: RedeemFundsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RedeemFundsRoutingModule { }
