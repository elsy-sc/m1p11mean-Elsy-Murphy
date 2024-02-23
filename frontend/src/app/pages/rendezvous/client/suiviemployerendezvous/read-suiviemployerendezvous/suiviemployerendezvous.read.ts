import { MessageService } from "primeng/api";
import { HttpResponseApi } from "../../../../../interfaces/http/HttpResponseApi";
import { Component, OnInit } from "@angular/core";
import { SuiviEmployeRendezVous } from "../../../../../models/suiviemployerendezvous.model";
import { SuiviEmployeRendezVousService } from "../../../../../services/suiviemployerendezvous/suiviemployerendezvous.service";
import { Employe } from "../../../../../models/employe.model";
import { Service } from "../../../../../models/service.model";
import { Utilisateur } from "../../../../../models/utilisateur.model";
import { Date } from "../../../../../beans/date.bean.util";
import { EmployeService } from "../../../../../services/employe/employe.service";
import { ServiceService } from "../../../../../services/service/service.service";
@Component({
    selector: "read-suiviemployerendezvous",
    templateUrl: "./suiviemployerendezvous.read.page.html",
    styleUrls: ["./suiviemployerendezvous.read.page.css"]
})
export class ReadSuiviEmployeRendezVous implements OnInit {

    suiviemployerendezvousSearch: SuiviEmployeRendezVous = new SuiviEmployeRendezVous();
    suiviemployerendezvouss: SuiviEmployeRendezVous[] = [];

    suiviemployerendezvousDelete: SuiviEmployeRendezVous = new SuiviEmployeRendezVous();

    suiviemployerendezvousUpdate: SuiviEmployeRendezVous = new SuiviEmployeRendezVous();

    loadingButtonUpdate: boolean = true;

    showDeletePopup: boolean = false;

    showUpdatePopup: boolean = false;

    errorsUpdate: any[] | undefined = [];

    employes: Employe[] = [];
    services: Service[] = [];
    clients: Utilisateur[] = [];

    UpdateSuiviEmployeRendezVous(suiviemployerendezvous: SuiviEmployeRendezVous) {

        this.showUpdatePopup = true;
        this.suiviemployerendezvousUpdate = Object.assign({}, suiviemployerendezvous);
    }

    CancelUpdateSuiviEmployeRendezVous() {

        this.showUpdatePopup = false;
        this.errorsUpdate = [];
    }


    ValidUpdateSuiviEmployeRendezVous() {
        if (this.suiviemployerendezvousUpdate.dateheurevalidation != null) {
            this.showUpdatePopup = false;
            this.messageService.add({ severity: "error", summary: "Erreur", detail: "Rendez-vous déjà validé" });
        }
        else {
            this.loadingButtonUpdate = true;
            this.suiviemployerendezvousUpdate.dateheurevalidation = new Date().date;
            this.suiviemployerendezvousService.updateSuiviEmployeRendezVous(this.suiviemployerendezvousUpdate).subscribe(
                (response: HttpResponseApi) => {
                    console.log(response)
                    if (response.message == "error" && response.status == 422) {
                        this.errorsUpdate = response.data;
                        this.loadingButtonUpdate = false;
                    } else if (response.status == 200) {
                        this.getSuiviEmployeRendezVouss();
                        this.showUpdatePopup = false;
                        this.loadingButtonUpdate = false;
                        this.messageService.add({ severity: "success", summary: "Succès", detail: "Validation du rendez-vous effectuée avec succès" });
                    } else {
                        this.loadingButtonUpdate = false;
                        this.messageService.add({ severity: "error", summary: "Erreur", detail: response.message });
                    }
                },
                (error) => {
                    this.loadingButtonUpdate = false;
                    console.error(error);
                }
            )
        }
    }

    onInput() {

        this.errorsUpdate = [];
    }

    ngOnInit(): void {
        this.getEmployes();
        this.getServices();
        this.getSuiviEmployeRendezVouss();
    }

    constructor(private suiviemployerendezvousService: SuiviEmployeRendezVousService, private messageService: MessageService, private employeService: EmployeService, private serviceService: ServiceService) {

    }

    getSuiviEmployeRendezVouss() {
        console.log(this.suiviemployerendezvousSearch)
        this.suiviemployerendezvousService.readSuiviEmployeRendezVous(this.suiviemployerendezvousSearch).subscribe((response: HttpResponseApi) => {
            if (response.data) {
                this.suiviemployerendezvouss = response.data;
            }
        });
    }

    rechercher() {

        this.getSuiviEmployeRendezVouss();
    }

    CancelDeleteSuiviEmployeRendezVous() {

        this.showDeletePopup = false;
    }

    DeleteSuiviEmployeRendezVous(suiviemployerendezvous: SuiviEmployeRendezVous) {

        this.showDeletePopup = true;
        this.suiviemployerendezvousDelete = suiviemployerendezvous;
    }

    ValidDeleteSuiviEmployeRendezVous() {

        this.showDeletePopup = false;
        this.suiviemployerendezvousService.deleteSuiviEmployeRendezVous(this.suiviemployerendezvousDelete).subscribe((response: HttpResponseApi) => {
            if (response.status == 200) {
                this.getSuiviEmployeRendezVouss();
                this.messageService.add({ severity: "success", summary: "Succès", detail: "Suppression effectuée avec succès" });
            }
        });
    }

    getEmployes() {
        this.employeService.readEmploye(new Employe()).subscribe((response: HttpResponseApi) => {
            if (response.data) {
                this.employes = response.data;
            }
        });
    }

    getServices() {
        this.serviceService.readService(new Service()).subscribe((response: HttpResponseApi) => {
            if (response.data) {
                this.services = response.data;
            }
        });
    }

}