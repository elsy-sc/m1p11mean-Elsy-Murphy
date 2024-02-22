import { MessageService } from "primeng/api";
import { HttpResponseApi } from "../../../interfaces/http/HttpResponseApi";
import { Component, OnInit } from "@angular/core";
import { Rendezvous } from "../../../models/rendezvous.model";
import { RendezvousService } from "../../../services/rendezvous/rendezvous.service";
import { Service } from "../../../models/service.model";
import { Utilisateur } from "../../../models/utilisateur.model";
import { ServiceService } from "../../../services/service/service.service";
import { UtilisateurService } from "../../../services/utilisateur/utilisateur.service";
@Component({
    selector: "read-rendezvous",
    templateUrl: "./rendezvous.read.page.html",
    styleUrls: ["./rendezvous.read.page.css"]
})
export class ReadRendezvous implements OnInit {

    rendezvousSearch: Rendezvous = new Rendezvous();
    rendezvouss: Rendezvous[] = [];
    services: Service[] = [];
    clients: Utilisateur[] = [];

    rendezvousDelete: Rendezvous = new Rendezvous();

    rendezvousUpdate: Rendezvous = new Rendezvous();

    loadingButtonUpdate: boolean = true;

    showDeletePopup: boolean = false;

    showUpdatePopup: boolean = false;

    errorsUpdate: any[] | undefined = [];

    UpdateRendezvous(rendezvous: Rendezvous) {

        this.showUpdatePopup = true;
        this.rendezvousUpdate = Object.assign({}, rendezvous);
    }

    CancelUpdateRendezvous() {

        this.showUpdatePopup = false;
        this.errorsUpdate = [];
    }

    ValidUpdateRendezvous() {

        this.loadingButtonUpdate = true;
        this.rendezvousService.updateRendezvous(this.rendezvousUpdate).subscribe(
            (response: HttpResponseApi) => {
                if (response.message == "error" && response.status == 422) {
                    this.errorsUpdate = response.data;
                    this.loadingButtonUpdate = false;
                } else if (response.status == 200) {
                    this.getRendezvouss();
                    this.showUpdatePopup = false;
                    this.loadingButtonUpdate = false;
                    this.messageService.add({ severity: "success", summary: "Succès", detail: "Modification effectuée avec succès" });
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

    onInput() {

        this.errorsUpdate = [];
    }

    ngOnInit(): void {

        this.getRendezvouss();
        this.getServices();
        this.getClients();
    }

    constructor(private rendezvousService: RendezvousService, private messageService: MessageService, private serviceService: ServiceService, private utilisateurService: UtilisateurService) {

    }

    getRendezvouss() {

        this.rendezvousService.readRendezvous(this.rendezvousSearch).subscribe((response: HttpResponseApi) => {
            if (response.data) {
                this.rendezvouss = response.data;
            }
        });
    }

    rechercher() {

        this.getRendezvouss();
    }

    CancelDeleteRendezvous() {

        this.showDeletePopup = false;
    }

    DeleteRendezvous(rendezvous: Rendezvous) {

        this.showDeletePopup = true;
        this.rendezvousDelete = rendezvous;
    }

    ValidDeleteRendezvous() {

        this.showDeletePopup = false;
        this.rendezvousService.deleteRendezvous(this.rendezvousDelete).subscribe((response: HttpResponseApi) => {
            if (response.status == 200) {
                this.getRendezvouss();
                this.messageService.add({ severity: "success", summary: "Succès", detail: "Suppression effectuée avec succès" });
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

    getClients() {
        this.utilisateurService.read(new Utilisateur()).subscribe((response: HttpResponseApi) => {
            if (response.data) {
                this.clients = response.data;
            }
        });
    }

}