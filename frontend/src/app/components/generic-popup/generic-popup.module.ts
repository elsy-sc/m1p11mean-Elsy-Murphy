import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericPopup } from './generic-popup.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';


@NgModule({
  declarations: [GenericPopup],
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    RippleModule
  ],
  exports: [
    GenericPopup
  ]
})
export class GenericPopupModule { }
