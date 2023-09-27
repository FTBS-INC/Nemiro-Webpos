import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UserManagementRoutingModule } from "./user-management-routing.module";
import { UserManagementComponent } from "./user-management-component/user-management.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalModule } from "ngx-bootstrap/modal";
import { ComponentsStateButtonModule } from "src/app/shared/shared-components/state-button/components.state-button.module";
import { NgxTrimDirectiveModule } from "ngx-trim-directive";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { SharedModule } from "src/app/shared/modules/shared.module";


@NgModule({
  declarations: [UserManagementComponent],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule.forRoot(),
    ComponentsStateButtonModule,
    NgxTrimDirectiveModule,
    BsDropdownModule.forRoot(),
    SharedModule,
    
  ],
})
export class UserManagementModule {}
