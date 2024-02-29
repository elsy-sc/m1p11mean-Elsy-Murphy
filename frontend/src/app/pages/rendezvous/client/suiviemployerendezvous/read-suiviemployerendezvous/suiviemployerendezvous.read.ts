import { MessageService } from "primeng/api";
import { HttpResponseApi } from "../../../../../interfaces/http/HttpResponseApi";
import { AfterViewInit, Component, OnInit } from "@angular/core";
import { SuiviEmployeRendezVous } from "../../../../../models/suiviemployerendezvous.model";
import { SuiviEmployeRendezVousService } from "../../../../../services/suiviemployerendezvous/suiviemployerendezvous.service";
import { Employe } from "../../../../../models/employe.model";
import { Service } from "../../../../../models/service.model";
import { Utilisateur } from "../../../../../models/utilisateur.model";
import { Date } from "../../../../../beans/date.bean.util";
import { EmployeService } from "../../../../../services/employe/employe.service";
import { ServiceService } from "../../../../../services/service/service.service";
import { Rendezvous } from "../../../../../models/rendezvous.model";
import { Paiement } from "../../../../../models/paiement.model";
import { PaiementService } from "../../../../../services/paiement/paiement.service";
import { response } from "express";
import { UtilisateurService } from "../../../../../services/utilisateur/utilisateur.service";
import { ActivatedRoute } from "@angular/router";
@Component({
    selector: "read-suiviemployerendezvous",
    templateUrl: "./suiviemployerendezvous.read.page.html",
    styleUrls: ["./suiviemployerendezvous.read.page.css"]
})
export class ReadSuiviEmployeRendezVous implements OnInit,AfterViewInit {

    isLoading: boolean = false;

    suiviemployerendezvousSearch: SuiviEmployeRendezVous = new SuiviEmployeRendezVous();
    suiviemployerendezvouss: SuiviEmployeRendezVous[] = [];

    suiviemployerendezvousDelete: SuiviEmployeRendezVous = new SuiviEmployeRendezVous();

    suiviemployerendezvousUpdate: SuiviEmployeRendezVous = new SuiviEmployeRendezVous();

    suiviemployerendezvousPaiement: SuiviEmployeRendezVous = new SuiviEmployeRendezVous();

    paiement: Paiement = new Paiement();

    utilisateur?: Utilisateur;

    loadingButtonUpdate: boolean = true;

    showDeletePopup: boolean = false;

    showUpdatePopup: boolean = false;

    showPaiementPopup: boolean = false;

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
        this.loadingButtonUpdate = true;
        this.suiviemployerendezvousUpdate.dateheurevalidation = new Date().date;
        this.suiviemployerendezvousService.updateSuiviEmployeRendezVous(this.suiviemployerendezvousUpdate).subscribe(
            (response: HttpResponseApi) => {
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

    onInput() {

        this.errorsUpdate = [];
    }

    ngOnInit(): void {
        this.utilisateurSerivce.getUserConnecte();
        this.utilisateurSerivce.utilisateurConnecte.subscribe(
            (user) => {
                this.utilisateur = user;
            }
        );
        this.getEmployes();
        this.getServices();
        this.getSuiviEmployeRendezVouss();
    }

    ngAfterViewInit(): void {
        this.route.queryParamMap.subscribe(params => {     
            if (params.get('message')) {
                this.messageService.add({severity:"success", summary:"Succès", detail: params.get('message')?.toString()});
            }
        });
    }

    constructor(private suiviemployerendezvousService: SuiviEmployeRendezVousService, private messageService: MessageService, private employeService: EmployeService, private serviceService: ServiceService, private paiementService: PaiementService, private utilisateurSerivce: UtilisateurService, private route: ActivatedRoute) {

    }

    getSuiviEmployeRendezVouss() {
        this.isLoading = true;
        const userStorage = this.suiviemployerendezvousService.getUserConnecte();
        if (userStorage) {
            const user = JSON.parse(userStorage);
            this.suiviemployerendezvousSearch.idclient = user._id;
        }
        this.suiviemployerendezvousService.readSuiviEmployeRendezVous(this.suiviemployerendezvousSearch).subscribe((response: HttpResponseApi) => {
            if (response.data) {
                this.suiviemployerendezvouss = response.data;
                this.isLoading = false;
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

    PaierRendezVous(rendezvous: Rendezvous) {
        this.showPaiementPopup = true;
        this.suiviemployerendezvousPaiement = JSON.parse(JSON.stringify(rendezvous));
        this.paiement.idclient = this.suiviemployerendezvousPaiement.idclient;
        this.paiement.idrendezvous = this.suiviemployerendezvousPaiement._id;
        this.paiement.dateheurepaiement = undefined;
        if (this.suiviemployerendezvousPaiement.service) {
            this.paiement.montantpaye = this.suiviemployerendezvousPaiement.service[0].prix;
        }
    }

    CancelPaierRendezVous() {
        this.showPaiementPopup = false;
    }

    ValidPaiementRendezVous() {
        if (this.paiement.montantpaye && this.utilisateur && this.utilisateur.solde) {
            if (this.paiement.montantpaye > this.utilisateur.solde) {
                this.showPaiementPopup = false;
                this.messageService.add({ severity: "error", summary: "Erreur", detail: "solde insuffisant !!!" });
            }
            else {
                this.paiementService.createPaiement(this.paiement).subscribe(
                    (response) => {
                        this.showPaiementPopup = false;
                        if (response.status == 201) {
                            if (this.utilisateur && this.utilisateur.solde && this.paiement.montantpaye) {
                                this.utilisateur.solde -= parseInt(this.paiement.montantpaye.toString());
                                this.utilisateurSerivce.update(this.utilisateur).subscribe();
                                this.utilisateurSerivce.setUserConnecte(this.utilisateur);
                            }
                            this.getSuiviEmployeRendezVouss();
                            this.messageService.add({ severity: "success", summary: "Succès", detail: "Paiement du rendez-vous effectuée avec succès" });
                        }
                        else if (response.status == 422) {
                            if (response.data) {
                                this.messageService.add({ severity: "error", summary: "Erreur", detail: response.data[0].message });
                            }
                        }
                        else {
                            this.messageService.add({ severity: "error", summary: "Erreur", detail: response.message });
                        }
                    },
                    (error) => {
                        console.error(error);
                    }
                );
            }
        }
    }

}