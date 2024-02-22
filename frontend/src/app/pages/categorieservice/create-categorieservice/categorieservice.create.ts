import { MessageService } from "primeng/api";
import { HttpResponseApi } from "../../../interfaces/http/HttpResponseApi";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { CategorieService } from "../../../models/categorieservice.model";
import { CategorieServiceService } from "../../../services/categorieservice/categorieservice.service";
@Component({
    selector: "create-categorieservice",
    templateUrl: "./categorieservice.create.page.html",
    styleUrls: ["./categorieservice.create.page.css"]
})
export class CreateCategorieService implements OnInit {

    isLoading: boolean = false;
    categorieservice: CategorieService = new CategorieService();
    errors: any[] | undefined = [];

    constructor(private categorieserviceService: CategorieServiceService, private messageService: MessageService, private router: Router) { }

    submit() {
        this.isLoading = true;
        this.categorieserviceService.createCategorieService(this.categorieservice).subscribe(
            (response: HttpResponseApi) => {
                if (response.message == "error" && response.status == 422) {
                    this.errors = response.data;
                    this.isLoading = false;
                } else if (response.status == 201) {
                    this.router.navigate(["/beauty-salon/categorieservice/read"]);
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

    }

}