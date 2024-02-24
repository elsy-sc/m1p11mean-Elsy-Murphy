import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateHorraireTravail } from './horrairetravail-create.component';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppLayoutModule } from '../../../components/layout/app.layout.module';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { PasswordModule } from 'primeng/password';
import { LabelInputModule } from '../../../components/labelinput/labelinput.module';



@NgModule({
  declarations: [CreateHorraireTravail],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppLayoutModule,
    InputTextModule,
    ButtonModule,
    InputTextareaModule,
    DropdownModule,
    RadioButtonModule,
    CheckboxModule,
    MultiSelectModule,
    PasswordModule,
    ToastModule,
    LabelInputModule
  ]
})
export class CreateHorrairetravailModule { }
