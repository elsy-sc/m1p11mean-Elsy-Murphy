import { Component, OnInit } from '@angular/core';
import { Date } from '../../../beans/date.bean.util';
import { Utilisateur } from '../../../models/utilisateur.model';
import { Table } from 'primeng/table';
import { MessageService, SelectItem } from 'primeng/api';
import { UtilisateurService } from '../../../services/utilisateur/utilisateur.service';
import { HttpResponseApi } from '../../../interfaces/http/HttpResponseApi';


@Component({
  selector: 'app-liste-utilisateur',
  templateUrl: './liste-utilisateur.component.html',
  styleUrl: './liste-utilisateur.component.css'
})
export class ListeUtilisateurComponent implements OnInit {

  utilisateurSearch: Utilisateur = new Utilisateur();
  utilisateurDelete: Utilisateur = new Utilisateur();
  utilisateurs: Utilisateur[] = [];
  loading: boolean = true;

  expanded: boolean = false;

  types: SelectItem[] = [];

  showPopUp: boolean = false;

  constructor (private utilisateurService :UtilisateurService, private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.getListUtilisateur();

    this.types = [
      { label: 'Employe', value: { id: 1, name: 'Employe', code: 'Emp' } },
      { label: 'Client', value: { id: 1, name: 'Client', code: 'Cli' } },
      { label: 'Manager', value: { id: 1, name: 'Manager', code: 'Mg' } },
    ]

    this.loading = false;
  }

  getListUtilisateur () {
    this.utilisateurService.read(this.utilisateurSearch).subscribe(
      (response: HttpResponseApi) => {
        console.log("params,",this.utilisateurSearch);
        console.log("response ==",response);
        if (response.data) {
          this.utilisateurs = response.data;
        }
      },
      (error) => {
        console.error(error);
      }
    )
  }

  recherche () {
    this.getListUtilisateur();
  }

  DeleteUtilisateur (utilisateur: Utilisateur) {
    this.showPopUp = true;
    this.utilisateurDelete = utilisateur;    
  }

  handleClose() {
    this.showPopUp = false;
  }

  CancelDeleteUtilisateur () {
    this.showPopUp = false;
  }

  ValidDeleteUtilisateur () {
    this.showPopUp = false;
    this.loading = true;
    this.utilisateurService.delete(this.utilisateurDelete).subscribe(
      (response: HttpResponseApi) => {
        if (response.status == 200 && response.message == "OK") {
          this.getListUtilisateur();
          this.loading = false;
          this.messageService.add({severity:'success',summary:'Success',detail: "L'utilisateur a été supprimé avec succès."});
        }
      },
      (error) => {
        this.loading = false;
        console.error(error);
      }
    )
  }

}
