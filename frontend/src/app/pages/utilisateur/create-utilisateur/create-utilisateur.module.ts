import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUtilisateurComponent } from './create-utilisateur.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { AppLayoutModule } from '../../../components/layout/app.layout.module';



@NgModule({
  declarations: [CreateUtilisateurComponent],
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
  ]
})
export class CreateUtilisateurModule { }
