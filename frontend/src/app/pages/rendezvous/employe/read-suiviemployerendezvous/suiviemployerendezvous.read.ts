import { MessageService } from "primeng/api";
import { HttpResponseApi } from "../../../../interfaces/http/HttpResponseApi";
import { Component, OnInit } from "@angular/core";
import { SuiviEmployeRendezVous } from "../../../../models/suiviemployerendezvous.model";
import { SuiviEmployeRendezVousService } from "../../../../services/suiviemployerendezvous/suiviemployerendezvous.service";
import { Employe } from "../../../../models/employe.model";
import { Service } from "../../../../models/service.model";
import { Utilisateur } from "../../../../models/utilisateur.model";
import { Date } from "../../../../beans/date.bean.util";
import { EmployeService } from "../../../../services/employe/employe.service";
import { ServiceService } from "../../../../services/service/service.service";
import { UtilisateurService } from "../../../../services/utilisateur/utilisateur.service";
import { response } from "express";
@Component({
    selector: "read-suiviemployerendezvous",
    templateUrl: "./suiviemployerendezvous.read.page.html",
    styleUrls: ["./suiviemployerendezvous.read.page.css"]
})
export class ReadSuiviEmployeRendezVousEmploye implements OnInit {

    nonCommences: SuiviEmployeRendezVous[] = [];
    enCours: SuiviEmployeRendezVous[] = [];
    termines: SuiviEmployeRendezVous[] = [];

    draggedRendezVousNonCommence: SuiviEmployeRendezVous | undefined | null;
    draggedRendezVousEnCour: SuiviEmployeRendezVous | undefined | null;
    draggedRendezVousTermine: SuiviEmployeRendezVous | undefined | null;
    dragged: SuiviEmployeRendezVous | undefined | null;


    constructor(private suiviEmployeRendezvousService: SuiviEmployeRendezVousService, private messageService: MessageService) { }

    getRendezVous() {
        this.nonCommences = [];
        this.enCours = [];
        this.termines = [];
        this.suiviEmployeRendezvousService.readSuiviEmployeRendezVous(new SuiviEmployeRendezVous()).subscribe(
            (response) => {
                if (response.data) {
                    for (let index = 0; index < response.data.length; index++) {
                        const rendezvous = response.data[index];
                        if (rendezvous.dateheurevalidation) {
                            if (rendezvous.dateheuredebutsuivi) {
                                if (rendezvous.dateheurefinsuivi) {
                                    this.termines.push(rendezvous);
                                } else {
                                    this.enCours.push(rendezvous);
                                }
                            }
                            else {
                                this.nonCommences.push(rendezvous);
                            }
                        }
                    }
                }
            },
            (error) => {
                console.error(error);
            }
        )
    }

    ngOnInit(): void {
        this.getRendezVous();
    }

    dragStartNonCommence(suiviEmployeRendezVous: SuiviEmployeRendezVous) {
        this.draggedRendezVousNonCommence = suiviEmployeRendezVous;
    }

    dragStartEnCour(suiviEmployeRendezVous: SuiviEmployeRendezVous) {
        this.draggedRendezVousEnCour = suiviEmployeRendezVous;
    }

    dragStartTermine(suiviEmployeRendezVous: SuiviEmployeRendezVous) {
        this.draggedRendezVousTermine = suiviEmployeRendezVous;
    }

    dragEnd() {
        this.draggedRendezVousNonCommence = null;
        this.draggedRendezVousEnCour = null;
        this.draggedRendezVousTermine = null;
        this.dragged = undefined;
    }

    drop(toDrop: SuiviEmployeRendezVous[]) {
        if (this.draggedRendezVousNonCommence) {
            if (toDrop !== this.nonCommences) {
                this.dragged = this.draggedRendezVousNonCommence;

                if (toDrop === this.enCours) {
                    delete this.dragged.client;
                    delete this.dragged.service;
                    delete this.dragged.employe;
                    this.dragged.dateheuredebutsuivi = new Date().date;
                    this.suiviEmployeRendezvousService.updateSuiviEmployeRendezVous(this.dragged).subscribe(
                        (response) => {
                            if (response.status == 200) {
                                this.getRendezVous();
                            }
                        }
                    );
                }

                if (toDrop === this.termines) {
                    if (!this.dragged.dateheuredebutsuivi) {
                        this.messageService.add({ severity: "error", summary: "Erreur", detail: "Ce rendez-vous ne peut être terminé parce qu'il n'est pas encore commencé !!!", life: 5000 });
                    }
                }

            }
        }
        if (this.draggedRendezVousEnCour) {
            if (toDrop !== this.enCours) {
                this.dragged = this.draggedRendezVousEnCour;
                delete this.dragged.client;
                delete this.dragged.service;
                delete this.dragged.employe;

                if (toDrop === this.termines) {
                    this.dragged.dateheurefinsuivi = new Date().date;
                }

                this.suiviEmployeRendezvousService.updateSuiviEmployeRendezVous(this.dragged).subscribe(
                    (response) => {
                        if (response.status == 200) {
                            this.getRendezVous();
                        }
                    }
                );
            }
        }

        this.dragEnd();
    }

    getMontantCommission(service: Service): number {
        if (service && service.prix && service.commission) {
            return (service.prix * service.commission) / 100;
        }
        return 0;
    }

}