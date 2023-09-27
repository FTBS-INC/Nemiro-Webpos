import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoadFundsComponent } from './load-funds/load-funds.component';


const routes: Routes = [
  {
    path: '',
    component: LoadFundsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoadFundsRoutingModule { }
