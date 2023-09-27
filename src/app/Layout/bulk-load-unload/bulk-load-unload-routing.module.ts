import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BulkLoadUnloadComponent } from './bulk-load-unload/bulk-load-unload.component';


const routes: Routes = [
  {
    path: '',
    component: BulkLoadUnloadComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BulkLoadUnloadRoutingModule { }
