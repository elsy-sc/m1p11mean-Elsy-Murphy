import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HttpResponseApi } from '../../interfaces/http/HttpResponseApi';
import { Utilisateur } from '../../models/utilisateur.model';
import { LayoutService } from '../../services/layout/app.layout.service';
import { UtilisateurService } from '../../services/utilisateur/utilisateur.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employe } from '../../models/employe.model';
import { MessageService } from 'primeng/api';


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
export class LoginComponent implements OnInit,AfterViewInit {

    isLoading: boolean = false;
    utilisateur!: Utilisateur;
    emailError: string | undefined;
    motdepasseError: string | undefined;
    employe: Employe = new Employe();
    employeSearch: Employe = new Employe();
    numeroCarteBancaire: string | undefined;
    employeListe: Employe[] = [];

    rechercher() {

    }



    constructor(public layoutService: LayoutService, private utilisateurService: UtilisateurService, private router: Router, private route: ActivatedRoute, private messageService: MessageService) { }

    ngOnInit(): void {
        this.utilisateur = new Utilisateur();
        this.utilisateurService.setUserConnecteInStorage();
        this.utilisateurService.utilisateurConnecte.subscribe(
            (user) => {
                if (user) {
                    this.router.navigate(['/beauty-salon']);
                }
            }
        );
    }

    ngAfterViewInit(): void {
        this.route.queryParamMap.subscribe(params => {     
            if (params.get('message')) {
                this.messageService.add({severity:"success", summary:"Succès", detail: params.get('message')?.toString()});
            }
        });
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
                        this.router.navigate(['/beauty-salon']);
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