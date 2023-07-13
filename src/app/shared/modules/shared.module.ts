import { NgModule } from "@angular/core";
import { CommonModule, CurrencyPipe, DecimalPipe } from "@angular/common";
import { RouterModule } from "@angular/router";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { TopnavComponent } from "./topnav/topnav.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { FooterComponent } from "./footer/footer.component";
import { ColorSwitcherComponent } from "./color-switcher/color-switcher.component";
import { HeadingComponent } from "./heading/heading.component";
import { StudioSidebarComponent } from "./studio-sidebar/studio-sidebar.component";
import { AlertModalComponent } from "./alert-modal/alert-modal.component";
import { DropzoneModule } from "ngx-dropzone-wrapper";
import { AlertModule } from "ngx-bootstrap/alert";
import { NgxTrimDirectiveModule } from "ngx-trim-directive";
import { ApplicationMenuComponent } from "./application-menu/application-menu.component";
import { AllowFunctionPipe } from "./pipes/allowFunctionPipe";
import { StatusPipe } from "./pipes/status.pipe";
import { PopUpComponent } from './pop-up/pop-up/pop-up.component';
import { CurrencyFormatPipe } from "./pipes/currency-format.pipe";
import { DecimalFormatDirective } from "./directives/DecimalFormatDirective";
import { ModalModule } from "ngx-bootstrap/modal";
import { TimerFormatPipe } from "./pipes/timer-format.pipe";
import { ComponentsStateButtonModule } from "../shared-components/state-button/components.state-button.module";
// import { PopUpModule } from "./pop-up/pop-up.module";
@NgModule({
  declarations: [
    SidebarComponent,
    HeadingComponent,
    ApplicationMenuComponent,
    TopnavComponent,
    ColorSwitcherComponent,
    FooterComponent,
    PopUpComponent,
    StudioSidebarComponent,
    AllowFunctionPipe,
    AlertModalComponent,
    StatusPipe,
    CurrencyFormatPipe,
    DecimalFormatDirective,
    TimerFormatPipe
    // PopUpComponent
  ],
  imports: [
    CommonModule,
    DropzoneModule,
    PerfectScrollbarModule,
    RouterModule,
    CollapseModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentsStateButtonModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    AlertModule.forRoot(),
ModalModule.forRoot()
  ],
  exports: [
    AllowFunctionPipe,
    PerfectScrollbarModule,
    RouterModule,
    StudioSidebarComponent,
    StatusPipe,
    CurrencyPipe,
    DecimalPipe,
    DecimalFormatDirective,
    CurrencyFormatPipe,
    CommonModule,
    ColorSwitcherComponent,
    TopnavComponent,
    SidebarComponent,
    FooterComponent,
    HeadingComponent,
    ApplicationMenuComponent,
    AlertModalComponent,
    NgxTrimDirectiveModule,
    
    // PopUpModule
  ],
})
export class SharedModule { }
