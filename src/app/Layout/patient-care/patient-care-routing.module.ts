import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientCareComponent } from './patient-care/patient-care.component';


const routes: Routes = [{ path: "", component: PatientCareComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientCareRoutingModule { }
