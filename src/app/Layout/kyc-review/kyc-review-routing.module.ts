import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KycReviewComponent } from './kyc-review/kyc-review.component';


const routes: Routes = [
  {
    path: '',
    component: KycReviewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KycReviewRoutingModule { }
