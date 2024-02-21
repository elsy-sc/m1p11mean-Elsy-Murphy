import { MessageService } from "primeng/api";
import { HttpResponseApi } from "../../../interfaces/http/HttpResponseApi";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Service } from "../../../models/service.model";
import { ServiceService } from "../../../services/service/service.service";
import { CategorieService } from "../../../models/categorieservice.model";
import { CategorieServiceService } from "../../../services/categorieservice/categorieservice.service";
@Component({
    selector: "create-service",
    templateUrl: "./service.create.page.html",
    styleUrls: ["./service.create.page.css"]
})
export class CreateService implements OnInit {

    isLoading: boolean = false;
    service: Service = new Service();
    categorieservices: CategorieService[] = [];
    errors: any[] | undefined = [];

    constructor(private serviceService: ServiceService, private messageService: MessageService, private router: Router, private servicecategorieService: CategorieServiceService) { }

    submit() {
        this.isLoading = true;
        this.serviceService.createService(this.service).subscribe(
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

    getServiceCategories(){
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

}