import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DispenserRoutingModule } from './dispenser-routing.module';
import { DispenserComponent } from './dispenser.component';

@NgModule({
  declarations: [DispenserComponent],
  imports: [
    CommonModule,
    DispenserRoutingModule
  ]
})
export class DispenserModule { }
