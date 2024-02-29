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
import { Date } from "../../../../../beans/date.bean.util";
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
        this.suiviemployerendezvousService.prendreRendezvous(this.suiviemployerendezvous).subscribe(
            (response: HttpResponseApi) => {
                console.log(response);
                if (response.message == "error" && response.status == 422) {
                    this.errors = response.data;
                    this.isLoading = false;
                } else if (response.status == 201) {
                    this.router.navigate(["/beauty-salon/rendezvous/client/read"],{ queryParams: { message: "Prise de rendez-vous bien reservé, rendez-vous ajouté avec succes"} });
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
        this.getServices();
    }

    getEmployes(event: any) {
        console.log(event);
        console.log( new Date(event).date);
        const dateheurerendezvous = new Date(event).date;  
        this.suiviemployerendezvous.dateheurerendezvous = dateheurerendezvous;
        this.suiviemployerendezvousService.prendreEmployeDisponible(dateheurerendezvous).subscribe((response: HttpResponseApi) => {
            console.log(response)
            if (response.data) {
                const flattenedData = response.data.flat();
                this.employes = flattenedData;
            }
        });
    }

    onEmployeChange(event: any) {
        console.log(event.value);
        this.suiviemployerendezvous.idemploye = event.value;
    }

    getServices() {
        this.isLoading = true;
        this.serviceService.readService(this.serviceSearch).subscribe((response: HttpResponseApi) => {
            if (response.data) {
                this.services = response.data;
                this.isLoading = false;
            }
        });
    }

    rechercher() {
        this.getServices();
    }

    reserver(service: SuiviEmployeRendezVous) {
        this.suiviemployerendezvous.idservice = service._id
        this.showConfirmService = true;
    }

}