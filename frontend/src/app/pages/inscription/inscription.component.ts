import { Component, OnInit } from '@angular/core';
import { response } from 'express';
import { Message, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Utilisateur } from '../../models/utilisateur.model';
import { HttpResponseApi } from '../../interfaces/http/HttpResponseApi';
import { LayoutService } from '../../services/layout/app.layout.service';
import { UtilisateurService } from '../../services/utilisateur/utilisateur.service';


@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent implements OnInit {

  isLoading: boolean = false;
  utilisateur!: Utilisateur;
  errors: any[] | undefined = [];

  inValidation: boolean = false;
  messageValidation!: Message[];

  codeemail: string = '';
  codevalidation?: string;

  constructor(public layoutService: LayoutService, private utilisateurService: UtilisateurService, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    this.utilisateur = new Utilisateur();
    this.messageValidation = [
      { severity: 'info', summary: 'Info', detail: "Nous vous avons envoyé un code de validation à l'adresse e-mail que vous avez fournie lors de votre inscription. Ce code est nécessaire pour confirmer votre adresse e-mail et activer votre compte." }
    ];
  }

  onInput() {
    this.errors = [];
  }

  incription() {
    this.isLoading = true;
    this.utilisateur.role = 2;
    this.utilisateur._state = "2"; 
    this.utilisateurService.inscription(this.utilisateur).subscribe(
      (response: HttpResponseApi) => {
        if (response.message == "error" && response.status == 422) {
          this.errors = response.data;
          this.isLoading = false;
        } else if (response.status == 201) {
          if (this.utilisateur.email) {
            this.utilisateurService.sendEmail(this.utilisateur.email).subscribe(
              (response) => {
                if (response.status == 201) {
                  if (response.data) {
                    this.codeemail = response.data[0];
                    this.isLoading = false;
                    this.inValidation = true;
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
            );
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

  valideInscription() {
    this.isLoading = true;
    this.errors = [];
    if (this.codeemail != this.codevalidation) {
      this.errors?.push({
        field: "code",
        message: "non valide !!!"
      });
      this.isLoading = false;
    } else {
      this.utilisateur._state = undefined;
      this.utilisateurService.inscription(this.utilisateur).subscribe(
        (response: HttpResponseApi) => {
          if (response.status == 201) {
            this.router.navigate(['/'],{ queryParams: { message: "Vous êtes bien inscrit, veuillez vous reconnecter" } });
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

}
