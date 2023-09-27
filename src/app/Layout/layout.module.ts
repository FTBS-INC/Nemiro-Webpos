import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LayoutRoutingModule } from "./layout-routing.module";
import { LayoutComponent } from "./layout-component/layout.component";
import { SharedModule } from "../shared/modules/shared.module";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { ModalModule } from "ngx-bootstrap/modal";



@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, LayoutRoutingModule, SharedModule, ModalModule.forRoot(), BsDatepickerModule, ReactiveFormsModule, PerfectScrollbarModule,
    FormsModule],
  exports: [
    PerfectScrollbarModule,
  ]
})
export class LayoutModule { }
