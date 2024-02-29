import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadHorrairetravail } from './horrairetravail-read.component';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { GenericPopupModule } from '../../../components/generic-popup/generic-popup.module';
import { LabelInputModule } from '../../../components/labelinput/labelinput.module';
import { LoadingModule } from '../../../components/loading/loading.module';



@NgModule({
  declarations: [ReadHorrairetravail],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    AccordionModule,
    DropdownModule,
    ToastModule,
    GenericPopupModule,
    InputTextareaModule,
    DialogModule,
    LabelInputModule,
    LoadingModule
  ]

})
export class ReadHorrairetravailModule { }
