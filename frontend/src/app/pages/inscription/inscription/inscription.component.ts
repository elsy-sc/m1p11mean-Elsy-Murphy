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

  isLoading: boolean = false;
  utilisateur!: Utilisateur;
  errors: any[] | undefined = [];

  constructor(public layoutService: LayoutService, private utilisateurService: UtilisateurService, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    this.utilisateur = new Utilisateur();
  }

  onInput() {
    this.errors = [];
  }

  // incription() {
  //   this.isLoading = true;
  //   let isValide = this.isInscriptioValide();
  //   if (isValide) {
  //     this.utilisateur.datenaissance = new Date(this.datenaissance);
  //     this.utilisateur.role = 2;
  //     this.utilisateurService.inscription(this.utilisateur).subscribe(
  //       ((response: HttpResponseApi) => {
  //         this.isLoading = false;
  //         if (response.status == 201) {
  //           if (response.data) {
  //             this.utilisateurService.setUserConnecte(response.data[0]);
  //             this.router.navigate(['/firstpage']);
  //           }
  //         } 
  //         else if (response.status == 400) {
  //           this.errorEmail = response.message;
  //         }
  //         else {
  //           this.messageService.add({severity:'error',summary:'Erreur',detail: response.message});
  //         }
  //       }),
  //       ((error) => {
  //         this.isLoading = false;
  //         console.error(error);
  //       })
  //     )
  //   } else {
  //     this.isLoading = false;
  //   }
  // }

  incription() {
    this.isLoading = true;
    this.utilisateur.role = 2;
    this.utilisateurService.inscription(this.utilisateur).subscribe(
      (response: HttpResponseApi) => {
        console.log("input ==",this.utilisateur);
        console.log("response ==",response);
        if (response.message == "error" && response.status == 422) {
          this.errors = response.data;
          this.isLoading = false;
        } else if (response.status == 201) {
          if (response.data) {
            this.utilisateurService.setUserConnecte(response.data[0]);
            this.router.navigate(['/firstpage']);
          }
        } else {
          this.isLoading = false;
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: response.message });
        }
      },
      (error) => {
        this.isLoading = false;
        console.error(error);
      }
    )
  }

}
