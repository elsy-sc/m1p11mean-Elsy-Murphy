import { Component, OnInit } from '@angular/core';
import { Date } from '../../../beans/date.bean.util';
import { Utilisateur } from '../../../models/utilisateur.model';
import { Table } from 'primeng/table';
import { SelectItem } from 'primeng/api';


@Component({
  selector: 'app-liste-utilisateur',
  templateUrl: './liste-utilisateur.component.html',
  styleUrl: './liste-utilisateur.component.css'
})
export class ListeUtilisateurComponent implements OnInit {

  utilisateurs: Utilisateur[] = [];

  loading: boolean = true;

  expanded: boolean = false;

  types: SelectItem[] = [];

  showPopUp: boolean = false;

  ngOnInit(): void {
    this.utilisateurs = [
      new Utilisateur('RAKOTO','Jean','jean.rakoto@gmail.com',new Date('2000-01-01'),'032 89 768 67',undefined,1),
      new Utilisateur('RASOA','Jeanne','jeanne.rasoa@gmail.com',new Date('2000-01-01'),'032 89 768 67',undefined,1),
      new Utilisateur('RABAO','Be','be.rabao@gmail.com',new Date('2000-01-01'),'032 89 768 67',undefined,1),
      new Utilisateur('RASETA','Soa','soa.raseta@gmail.com',new Date('2000-01-01'),'032 89 768 67',undefined,1),
    ];

    this.types = [
      { label: 'Employe', value: { id: 1, name: 'Employe', code: 'Emp' } },
      { label: 'Client', value: { id: 1, name: 'Client', code: 'Cli' } },
      { label: 'Manager', value: { id: 1, name: 'Manager', code: 'Mg' } },
    ]

    this.loading = false;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  DeleteUtilisateur () {
    this.showPopUp = true;    
  }

  handleClose() {
    this.showPopUp = false;
  }

  CancelDeleteUtilisateur () {
    this.showPopUp = false;
  }

  ValidDeleteUtilisateur () {

  }

}
