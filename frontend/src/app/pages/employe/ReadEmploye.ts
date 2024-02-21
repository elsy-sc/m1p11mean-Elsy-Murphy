import { MessageService } from "primeng/api";
import { HttpResponseApi } from "../../interfaces/http/HttpResponseApi";
import { Component, OnInit } from "@angular/core";
import { Utilisateur } from "../../models/utilisateur.model";
import { UtilisateurService } from "../../services/utilisateur/utilisateur.service";
@Component({
    selector: "read-utilisateur",
    templateUrl: "./read-utilisateur.component.html",
    styleUrls: ["./read-utilisateur.component.css"]
})
export class ReadUtilisateur implements OnInit {

    utilisateurSearch: Utilisateur = new Utilisateur();
    utilisateurs: Utilisateur[] = [];

    utilisateurDelete: Utilisateur = new Utilisateur();

    showDeletePopup: boolean = false;

    ngOnInit(): void {

        this.getUtilisateurs();
    }

    constructor(private utilisateurService: UtilisateurService, private messageService: MessageService) {

    }

    getUtilisateurs() {

        this.utilisateurService.readUtilisateur(this.utilisateurSearch).subscribe((response: HttpResponseApi) => {
            if (response.data) {
                this.utilisateurs = response.data;
            }
        });
    }

    rechercher() {

        this.getUtilisateurs();
    }

    CancelDeleteUtilisateur() {

        this.showDeletePopup = false;
    }

    DeleteUtilisateur(utilisateur: Utilisateur) {

        this.showDeletePopup = true;
        this.utilisateurDelete = utilisateur;
    }

    ValidDeleteUtilisateur() {

        this.showDeletePopup = false;
        this.utilisateurService.deleteUtilisateur(this.utilisateurDelete).subscribe((response: HttpResponseApi) => {
            if (response.status == 200) {
                this.getUtilisateurs();
                this.messageService.add({ severity: "success", summary: "Succès", detail: "Suppression effectuée avec succès" });
            }
        });
    }

}