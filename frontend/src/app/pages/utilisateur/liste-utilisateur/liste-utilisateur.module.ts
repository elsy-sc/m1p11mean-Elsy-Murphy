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


@NgModule({
  declarations: [ListeUtilisateurComponent],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    AccordionModule,
    DropdownModule,
    ToastModule
  ]
})
export class ListeUtilisateurModule { }
