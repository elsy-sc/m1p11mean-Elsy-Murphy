import { Component, OnInit } from '@angular/core';
import { response } from 'express';
import { MessageService } from 'primeng/api';
import { HttpResponseApi } from '../../../interfaces/http/HttpResponseApi';
import { Utilisateur } from '../../../models/utilisateur.model';
import { LayoutService } from '../../../services/layout/app.layout.service';
import { UtilisateurService } from '../../../services/utilisateur/utilisateur.service';
import { Router } from '@angular/router';
import { Date } from "../../../beans/date.bean.util";


@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent implements OnInit {

  utilisateur!: Utilisateur;

  confirmotdepasse: string | undefined;
  datenaissance : string | undefined;

  errorNom: string | undefined;
  errorPrenom: string | undefined;
  errorEmail: string | undefined;
  errrorDateNaissance: string | undefined;
  errorNumeroTelephone: string | undefined;
  errorMotDePasse: string | undefined;
  errorConfirmMotDePasse: string | undefined;

  constructor(public layoutService: LayoutService, private utilisateurService: UtilisateurService, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    this.utilisateur = new Utilisateur();
  }

  isValideNom() {
    if (this.utilisateur.nom == null || this.utilisateur.nom == undefined || this.utilisateur.nom.trim() == '') {
      this.errorNom = "Le champ nom est requis";
      return false;
    }
    return true;
  }

  isValidePrenom() {
    if (this.utilisateur.prenom == null || this.utilisateur.prenom == undefined || this.utilisateur.prenom.trim() == '') {
      this.errorPrenom = "Le champ prenom est requis";
      return false;
    }
    return true;
  }

  isValideMail() {
    if (this.utilisateur.email == null || this.utilisateur.email == undefined || this.utilisateur.email.trim() == '') {
      this.errorEmail = "Le champ email est requis";
      return false;
    }
    return true;
  }

  isValideDateNaissance() {
    if (this.datenaissance != null && this.datenaissance != undefined && this.datenaissance.trim() != '') {
      return true;
    }
    this.errrorDateNaissance = "Le champ date de naissance est requis";
    return false;
  }

  isValideNumeroTelephone() {
    if (this.utilisateur.numerotelephone == null || this.utilisateur.numerotelephone == undefined || this.utilisateur.numerotelephone.trim() == '') {
      this.errorNumeroTelephone = "Le champ numero de telephone est requis";
      return false;
    }
    return true;
  }

  isValideMotDePasse() {
    if (this.utilisateur.motdepasse == null || this.utilisateur.motdepasse == undefined || this.utilisateur.motdepasse.trim() == '') {
      this.errorMotDePasse = "Le champ mot de passe est requis";
      return false;
    }
    return true;
  }

  isMotDePasseConfirme() {
    if (this.utilisateur.motdepasse) {
      if (this.confirmotdepasse == null || this.confirmotdepasse == undefined || this.utilisateur.motdepasse.trim() == '') {
        this.errorConfirmMotDePasse = "Le champ de confirmation de mot de passe est requis";
      }
      else {
        if (this.utilisateur.motdepasse != this.confirmotdepasse) {
          this.errorConfirmMotDePasse = "Les mots de passe ne correspondent pas";
          return false;
        }
      }
      return true;
    }
    return false;
  }

  isInscriptioValide() {  
    if (this.isValideNom() && this.isValidePrenom() && this.isValideMail() && this.isValideDateNaissance() && this.isValideNumeroTelephone() && this.isValideMotDePasse() && this.isMotDePasseConfirme()) {
      return true;
    }
    return false;
  }

  onInput() {
    this.errorNom = undefined;
    this.errorPrenom = undefined;
    this.errorEmail = undefined;
    this.errrorDateNaissance = undefined;
    this.errorNumeroTelephone = undefined;
    this.errorMotDePasse = undefined;
    this.errorConfirmMotDePasse = undefined;
  }

  incription() {
    let isValide = this.isInscriptioValide();
    if (isValide) {
      this.utilisateur.datenaissance = new Date(this.datenaissance);
      this.utilisateur.role = 2;
      this.utilisateurService.inscription(this.utilisateur).subscribe(
        ((response: HttpResponseApi) => {
          console.log("response ==", response);
          if (response.status == 201) {
            if (response.data) {
              this.utilisateurService.setUserConnecte(response.data[0]);
              this.router.navigate(['/firstpage']);
            }
          } else {
            this.messageService.add({severity:'error',summary:'Erreur',detail: response.message});
          }
        }),
        ((error) => {
          console.error(error);
        })
      )
    }
  }

}
