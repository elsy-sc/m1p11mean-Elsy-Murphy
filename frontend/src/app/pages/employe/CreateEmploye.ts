import { MessageService } from "primeng/api";
import { HttpResponseApi } from "../../interfaces/http/HttpResponseApi";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Utilisateur } from "../../models/utilisateur.model";
import { UtilisateurService } from "../../services/utilisateur/utilisateur.service";
@Component({
    selector: "create-utilisateur",
    templateUrl: "./create-utilisateur.component.html",
    styleUrls: ["./create-utilisateur.component.css"]
})
export class CreateUtilisateur implements OnInit {

    isLoading: boolean = false;
    utilisateur: Utilisateur = new Utilisateur();
    errors: any[] | undefined = [];

    constructor(private utilisateurService: UtilisateurService, private messageService: MessageService, private router: Router) { }

    submit() {
        this.isLoading = true;
        this.utilisateurService.create(this.utilisateur).subscribe(
            (response: HttpResponseApi) => {
                if (response.message == "error" && response.status == 422) {
                    this.errors = response.data;
                    this.isLoading = false;
                } else if (response.status == 201) {
                    this.router.navigate(["/firstpage"]);
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

    }

}