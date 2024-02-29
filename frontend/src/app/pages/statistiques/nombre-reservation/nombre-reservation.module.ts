import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NombreReservation } from './nombre-reservation.component';
import { ChartModule } from 'primeng/chart'
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { LoadingModule } from '../../../components/loading/loading.module';

@NgModule({
  declarations: [NombreReservation],
  imports: [
    CommonModule,
    FormsModule,
    ChartModule,
    DropdownModule,
    InputTextModule,
    CalendarModule,
    LoadingModule
  ]
})
export class NombreReservationModule { }
