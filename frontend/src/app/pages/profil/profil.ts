import { MessageService } from "primeng/api";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Employe } from "../../models/employe.model";
import { EmployeService } from "../../services/employe/employe.service";
import { HttpResponseApi } from "../../interfaces/http/HttpResponseApi";
import { UtilisateurService } from "../../services/utilisateur/utilisateur.service";
import { Utilisateur } from "../../models/utilisateur.model";
@Component({
    selector: "create-employe",
    templateUrl: "./profil.page.html",
    styleUrls: ["./profil.page.css"]
})
export class Profil implements OnInit {

    isLoading: boolean = false;
    utilisateur!: Employe;
    errors: any[] | undefined = [];
    showAddSoldePopup: boolean = false;

    solde?: number;

    constructor(private utilisateurService: UtilisateurService, private messageService: MessageService, private router: Router) { }

    submit() {
        this.isLoading = true;
        this.utilisateurService.update(this.utilisateur).subscribe(
            (response: HttpResponseApi) => {
                if (response.message == "error" && response.status == 422) {
                    this.errors = response.data;
                    this.isLoading = false;
                } else if (response.status == 200) {
                    this.isLoading = false;
                    this.utilisateurService.setUserConnecte(this.utilisateur);
                    this.messageService.add({ severity: "success", summary: "Succès", detail: "Modification effectuée avec succès" });
                } else {
                    this.isLoading = false;
                    this.messageService.add({ severity: "error", summary: "Erreur", detail: response.message });
                }
            },
            (error) => {
                this.isLoading = false;
                console.error(error);
            }
        )
    }

    onInput() {
        this.errors = [];
    }

    ngOnInit(): void {
        let utilisateur = this.utilisateurService.getUserConnecte();
        if (utilisateur) {
            this.utilisateur = JSON.parse(utilisateur);
            if (this.utilisateur.solde == undefined) {
                this.utilisateur.solde = 0;
            }
            this.utilisateur.motdepasse = undefined;
            console.log(this.utilisateur);
            
        }
    }

    CancelAddSolde() {
        this.showAddSoldePopup = false;
        this.solde = undefined;
    }

    ValidAddSolde() {
        if (this.solde) {
            const solde = parseInt(this.solde.toString());
            if (solde < 0) {
                this.showAddSoldePopup = false;
                this.messageService.add({ severity: "warn", summary: "", detail: "Le montant du solde ne doit pas être negatif" });
            } else {
                if (this.utilisateur.solde != undefined) {
                    this.utilisateur.solde += solde;
                }
                this.utilisateurService.update(this.utilisateur).subscribe(
                    (response: HttpResponseApi) => {
                        this.showAddSoldePopup = false;
                        if (response.status == 422) {
                            if (response.data) {
                                this.messageService.add({ severity: "error", summary: "Erreur", detail: response.data[0].message });
                            }
                        } else if (response.status == 200) {
                            this.utilisateurService.setUserConnecte(this.utilisateur);
                            this.messageService.add({ severity: "success", summary: "Succès", detail: "Solde ajouté  avec succès" });
                        } else {
                            this.messageService.add({ severity: "error", summary: "Erreur", detail: response.message });
                        }
                    },
                    (error) => {
                        console.error(error);
                    }
                )
            }
        } else {
            this.showAddSoldePopup = false;
            this.solde = undefined;
            this.messageService.add({ severity: "warn", summary: "", detail: "Veuillez ajouter le montant du solde" });
        }
    }

    AddSolde() {
        this.showAddSoldePopup = true;
    }

}