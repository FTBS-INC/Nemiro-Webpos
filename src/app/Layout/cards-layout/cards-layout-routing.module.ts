import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardsLayoutComponent } from './cards-layout/cards-layout.component';


const routes: Routes = [
  {
    path: '',
    component: CardsLayoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardsLayoutRoutingModule { }
