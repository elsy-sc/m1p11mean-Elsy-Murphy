import { Component, OnInit } from '@angular/core';
import { HttpResponseApi } from '../../interfaces/http/HttpResponseApi';
import { Utilisateur } from '../../models/utilisateur.model';
import { LayoutService } from '../../services/layout/app.layout.service';
import { UtilisateurService } from '../../services/utilisateur/utilisateur.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent implements OnInit {

    utilisateur!: Utilisateur;

    emailError: string|undefined;
    motdepasseError: string|undefined;


    constructor(public layoutService: LayoutService, private utilisateurService: UtilisateurService) { }

    ngOnInit(): void {
        this.utilisateur = new Utilisateur(); 
    }

    onInput() {
        this.emailError = undefined;
        this.motdepasseError = undefined;
    }

    login() {
        this.utilisateurService.authentifications(this.utilisateur).subscribe
        ((response: HttpResponseApi) => {
            if (response.message == '' && response.status == 200) {
                if (response.data) {
                    let utilisateurLogin = Object.assign(new Utilisateur(),response.data[0]);
                    this.utilisateurService.updateUtilisateurConnecte(utilisateurLogin);
                    this.utilisateurService.setToken(utilisateurLogin.tokenValue);
                    console.log("utilisateur ==",this.utilisateurService.utilisateurConnecte);
                }
            } else {
                if (response.status == 401) {
                    this.motdepasseError = response.message;
                } else {
                    this.emailError = response.message;
                }
            }
        }),
        ((error: any) => {
            console.error(error);
        })
    }

}
