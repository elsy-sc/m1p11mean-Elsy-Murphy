import { MessageService } from "primeng/api";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Employe } from "../../models/employe.model";
import { EmployeService } from "../../services/employe/employe.service";
import { HttpResponseApi } from "../../interfaces/http/HttpResponseApi";
@Component({
    selector: "create-employe",
    templateUrl: "./profil.page.html",
    styleUrls: ["./profil.page.css"]
})
export class Profil implements OnInit {

    isLoading: boolean = false;
    employe: Employe = new Employe();
    errors: any[] | undefined = [];

    constructor(private employeService: EmployeService, private messageService: MessageService, private router: Router) { }

    submit() {
        this.isLoading = true;
        this.employeService.updateEmploye(this.employe).subscribe(
            (response: HttpResponseApi) => {
                if (response.message == "error" && response.status == 422) {
                    this.errors = response.data;
                    this.isLoading = false;
                } else if (response.status == 200) {
                    this.isLoading = false;
                    this.employeService.setUserConnecte(this.employe);
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
        let employe = this.employeService.getUserConnecte();
        if (employe) {
            this.employe = JSON.parse(employe);
        }
        console.log("profile ==", this.employe);
    }

}