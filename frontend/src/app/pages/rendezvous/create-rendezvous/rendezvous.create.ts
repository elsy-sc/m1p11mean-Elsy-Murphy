import { MessageService } from "primeng/api";
import { HttpResponseApi } from "../../../interfaces/http/HttpResponseApi";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Rendezvous } from "../../../models/rendezvous.model";
import { RendezvousService } from "../../../services/rendezvous/rendezvous.service";
import { Service } from "../../../models/service.model";
import { Utilisateur } from "../../../models/utilisateur.model";
import { ServiceService } from "../../../services/service/service.service";
import { UtilisateurService } from "../../../services/utilisateur/utilisateur.service";
@Component({
    selector: "create-rendezvous",
    templateUrl: "./rendezvous.create.page.html",
    styleUrls: ["./rendezvous.create.page.css"]
})
export class CreateRendezvous implements OnInit {

    isLoading: boolean = false;
    rendezvous: Rendezvous = new Rendezvous();
    errors: any[] | undefined = [];
    services: Service[] = [];
    clients: Utilisateur[] = [];

    constructor(private rendezvousService: RendezvousService, private messageService: MessageService, private router: Router, private serviceService: ServiceService, private utilisateurService: UtilisateurService) { }

    submit() {
        this.isLoading = true;
        this.rendezvousService.createRendezvous(this.rendezvous).subscribe(
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
        this.getServices();
        this.getClients();
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