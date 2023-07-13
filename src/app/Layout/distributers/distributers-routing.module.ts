import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DistributersComponent } from './distributers/distributers.component';


const routes: Routes = [{ path: "", component: DistributersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistributersRoutingModule { }
