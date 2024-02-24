import { MessageService } from "primeng/api";
import { HttpResponseApi } from "../../../../../interfaces/http/HttpResponseApi";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { SuiviEmployeRendezVous } from "../../../../../models/suiviemployerendezvous.model";
import { SuiviEmployeRendezVousService } from "../../../../../services/suiviemployerendezvous/suiviemployerendezvous.service";
import { Employe } from "../../../../../models/employe.model";
import { Service } from "../../../../../models/service.model";
import { Utilisateur } from "../../../../../models/utilisateur.model";
import { EmployeService } from "../../../../../services/employe/employe.service";
import { ServiceService } from "../../../../../services/service/service.service";
import { CategorieService } from "../../../../../models/categorieservice.model";
import { Offrespeciale } from "../../../../../models/offrespeciale.model";
@Component({
    selector: "create-suiviemployerendezvous",
    templateUrl: "./suiviemployerendezvous.create.page.html",
    styleUrls: ["./suiviemployerendezvous.create.page.css"]
})
export class CreateSuiviEmployeRendezVous implements OnInit {

    isLoading: boolean = false;
    suiviemployerendezvous: SuiviEmployeRendezVous = new SuiviEmployeRendezVous();

    errors: any[] | undefined = [];

    employes: Employe[] = [];
    services: Offrespeciale[] = [];
    clients: Utilisateur[] = [];

    serviceSearch: Offrespeciale = new Offrespeciale();
    categorieservices: CategorieService[] = [];

    constructor(private suiviemployerendezvousService: SuiviEmployeRendezVousService, private messageService: MessageService, private router: Router, private employeService: EmployeService, private serviceService: ServiceService) { }

    showConfirmService: boolean = false;
    CancelConfirmService() {
        this.showConfirmService = false;
    }
    ValidConfirmService() {
        this.showConfirmService = false;
        this.submit();
    }

    submit() {
        this.isLoading = true;
        this.suiviemployerendezvousService.createSuiviEmployeRendezVous(this.suiviemployerendezvous).subscribe(
            (response: HttpResponseApi) => {
                if (response.message == "error" && response.status == 422) {
                    this.errors = response.data;
                    this.isLoading = false;
                } else if (response.status == 201) {
                    this.router.navigate(["/beauty-salon/rendezvous/employe/read"]);
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
        const userStorage = this.suiviemployerendezvousService.getUserConnecte();
        if (userStorage) {
            const user = JSON.parse(userStorage);
            this.suiviemployerendezvous.idclient = user._id;
        }
        console.log(this.suiviemployerendezvous);
        this.getEmployes();
        this.getServices();
    }

    getEmployes() {
        this.employeService.readEmploye(new Employe()).subscribe((response: HttpResponseApi) => {
            if (response.data) {
                const employeNull = new Employe();
                employeNull.nom = "Aucun employe";
                this.employes = [employeNull, ...response.data];
            }
        });
    }

    getServices() {
        this.serviceService.readService(this.serviceSearch).subscribe((response: HttpResponseApi) => {
            if (response.data) {
                this.services = response.data;
            }
        });
    }

    rechercher() {
        this.getServices();
    }

    reserver() {
        this.showConfirmService = true;
        
    }

}