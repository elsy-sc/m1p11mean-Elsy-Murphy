import { MessageService } from "primeng/api";
import { HttpResponseApi } from "../../../interfaces/http/HttpResponseApi";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Service } from "../../../models/service.model";
import { ServiceService } from "../../../services/service/service.service";
import { CategorieService } from "../../../models/categorieservice.model";
import { CategorieServiceService } from "../../../services/categorieservice/categorieservice.service";
import { Offrespeciale } from "../../../models/offrespeciale.model";
import { OffrespecialeService } from "../../../services/offrespeciale/offrespeciale.service";
@Component({
    selector: "create-service",
    templateUrl: "./service.create.page.html",
    styleUrls: ["./service.create.page.css"]
})
export class CreateService implements OnInit {

    isLoading: boolean = false;
    service: Offrespeciale = new Offrespeciale();
    categorieservices: CategorieService[] = [];
    errors: any[] | undefined = [];
    isSpeciale = false;

    imageUpload: any;


    constructor(private offrespecialeService: OffrespecialeService, private messageService: MessageService, private router: Router, private servicecategorieService: CategorieServiceService, private serviceService: ServiceService) { }

    submit() {
        this.isLoading = true;

        if (this.isSpeciale) {
            this.offrespecialeService.createOffrespeciale(this.service).subscribe(
                (response: HttpResponseApi) => {
                    console.log(response);
                    if (response.message == "error" && response.status == 422) {
                        this.errors = response.data;
                        this.isLoading = false;
                    } else if (response.status == 201) {
                        this.router.navigate(["beauty-salon/service/read"]);
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
        else {
            this.serviceService.createService(this.service as Service).subscribe(
                (response: HttpResponseApi) => {
                    console.log(response);
                    if (response.message == "error" && response.status == 422) {
                        this.errors = response.data;
                        this.isLoading = false;
                    } else if (response.status == 201) {
                        this.router.navigate(["beauty-salon/service/read"]);
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

    }

    getServiceCategories() {
        this.servicecategorieService.readCategorieService(new CategorieService()).subscribe((response: HttpResponseApi) => {
            if (response.data) {
                this.categorieservices = response.data;
            }
        });
    }

    onInput() {
        this.errors = [];
    }

    ngOnInit(): void {
        this.getServiceCategories();
    }


    onSelect(event: any) {
        this.service.image = event.files[0].name;
        this.imageUpload = event.files[0];
    }

    onRemove () {
        this.service.image = undefined;
    }

}