import { Component, OnInit } from '@angular/core';
import { HttpResponseApi } from '../../interfaces/http/HttpResponseApi';
import { Utilisateur } from '../../models/utilisateur.model';
import { LayoutService } from '../../services/layout/app.layout.service';
import { UtilisateurService } from '../../services/utilisateur/utilisateur.service';
import { Router } from '@angular/router';


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

    isLoading: boolean = false;
    utilisateur!: Utilisateur;
    emailError: string | undefined;
    motdepasseError: string | undefined;


    constructor(public layoutService: LayoutService, private utilisateurService: UtilisateurService, private router: Router) { }

    ngOnInit(): void {
        this.utilisateur = new Utilisateur();
    }

    onInput() {
        this.emailError = undefined;
        this.motdepasseError = undefined;
    }

    login() {
        this.isLoading = true;
        this.utilisateurService.authentications(this.utilisateur).subscribe(
            (response: HttpResponseApi) => {
                if (response.message == '' && response.status == 200) {
                    if (response.data) {
                        let utilisateurLogin = Object.assign(new Utilisateur(), response.data[0]);
                        this.utilisateurService.setUserConnecte(utilisateurLogin);
                        this.isLoading = false;
                        this.router.navigate(['/firstpage']);
                    }
                } else {
                    this.isLoading = false;
                    if (response.status == 401) {
                        this.motdepasseError = response.message;
                    } 
                    else if (response.status == 422) {
                        if (this.utilisateur.email != undefined && this.utilisateur.email.trim() != '') {
                            this.motdepasseError = response.message;
                        } else {
                            this.emailError = response.message;
                        }
                    }
                    else if (response.status == 404) {
                        this.emailError = response.message;
                    }
                }
            },
            (error: any) => {
                this.isLoading = false;
                console.error(error);
            }
        )
    }
}