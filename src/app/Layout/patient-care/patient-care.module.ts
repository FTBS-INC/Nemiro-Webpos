import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PatientCareRoutingModule } from "./patient-care-routing.module";
import { PatientCareComponent } from "./patient-care/patient-care.component";

@NgModule({
  declarations: [PatientCareComponent],
  imports: [CommonModule, PatientCareRoutingModule],
})
export class PatientCareModule {}
