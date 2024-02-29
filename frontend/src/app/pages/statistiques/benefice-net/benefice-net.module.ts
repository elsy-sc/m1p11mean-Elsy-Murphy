import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeneficeNet } from './benefice-net.component';
import { ChartModule } from 'primeng/chart'
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [BeneficeNet],
  imports: [
    CommonModule,
    FormsModule,
    ChartModule,
    DropdownModule,
    InputTextModule,
    CalendarModule
  ]
})
export class BeneficeNetModule { }
