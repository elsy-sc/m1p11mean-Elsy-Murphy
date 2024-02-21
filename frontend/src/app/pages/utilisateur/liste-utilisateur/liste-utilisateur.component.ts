import { Component, OnInit } from '@angular/core';
import { Date } from '../../../beans/date.bean.util';
import { Utilisateur } from '../../../models/utilisateur.model';
import { Table } from 'primeng/table';
import { MessageService, SelectItem } from 'primeng/api';
import { UtilisateurService } from '../../../services/utilisateur/utilisateur.service';
import { HttpResponseApi } from '../../../interfaces/http/HttpResponseApi';
import { Employe } from '../../../models/employe.model';


@Component({
  selector: 'app-liste-utilisateur',
  templateUrl: './liste-utilisateur.component.html',
  styleUrl: './liste-utilisateur.component.css'
})
export class ListeUtilisateurComponent implements OnInit {



  isLoading: boolean = false;
  utilisateur!: Utilisateur;
  emailError: string | undefined;
  motdepasseError: string | undefined;
  numeroCarteBancaire: string | undefined;    
  employeListe: Employe[] = [];
  employeSearch: Employe = new Employe();

  rechercher() {

  }



  utilisateurSearch: Utilisateur = new Utilisateur();
  
  utilisateurDelete: Utilisateur = new Utilisateur();
  
  utilisateurUpdate: Utilisateur = new Utilisateur();
  
  utilisateurs: Utilisateur[] = [];
  
  loading: boolean = true;
  loadingButtonUpdate: boolean = true;

  showPopUp: boolean = false;
  
  showPopUpUpdate: boolean = false;

  errorsUpdate: any[]|undefined = [];

  constructor (private utilisateurService :UtilisateurService, private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.getListUtilisateur();
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

  UpdateUtilisateur(utilisateur: Utilisateur) {
    this.showPopUpUpdate = true;
    this.utilisateurUpdate = Object.assign({}, utilisateur);
  }

  CancelUpdateUtilisateur () {
    this.showPopUpUpdate = false;
    this.errorsUpdate = [];
  }

  ValidUpdateUtilisateur () {
    this.loadingButtonUpdate = true;
    console.log("utilisateurUpdate ==",this.utilisateurUpdate);
    this.utilisateurService.update(this.utilisateurUpdate).subscribe(
      (response: HttpResponseApi) => {
        if (response.message=="error" && response.status == 422) {
          this.errorsUpdate = response.data;
          this.loadingButtonUpdate = false;
        } else if (response.status == 200 && response.message == "OK") {
          this.getListUtilisateur();
          this.loadingButtonUpdate = false;
          this.showPopUpUpdate = false;
          this.messageService.add({severity:'success',summary:'Success',detail: "L'utilisateur a été modifié avec succès."});
        }
        else {
          this.loadingButtonUpdate = false;
          this.messageService.add({severity:'error',summary:'Erreur',detail: response.message});
        }
      },
      (error) => {
        this.loadingButtonUpdate = false;
        console.error(error);
      }
    )
  }

  onInput () {
    this.errorsUpdate = [];
  }

}
