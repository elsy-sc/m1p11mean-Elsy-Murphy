import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ListeUtilisateurComponent } from './liste-utilisateur.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { AccordionModule } from 'primeng/accordion';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { GenericPopupModule } from '../../../components/generic-popup/generic-popup.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListeUtilisateurComponent,
  ],
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
    GenericPopupModule
  ]
})
export class ListeUtilisateurModule { }
