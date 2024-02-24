import { MessageService } from "primeng/api";
import { HttpResponseApi } from "../../../interfaces/http/HttpResponseApi";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { TypeDepense } from "../../../models/typedepense.model";
import { TypeDepenseService } from "../../../services/typedepense/typedepense.service";
@Component({
    selector: "create-typedepense",
    templateUrl: "./typedepense.create.page.html",
    styleUrls: ["./typedepense.create.page.css"]
})
export class CreateTypeDepense implements OnInit {

    isLoading: boolean = false;
    typedepense: TypeDepense = new TypeDepense();
    errors: any[] | undefined = [];

    constructor(private typedepenseService: TypeDepenseService, private messageService: MessageService, private router: Router) { }

    submit() {
        this.isLoading = true;
        this.typedepenseService.createTypeDepense(this.typedepense).subscribe(
            (response: HttpResponseApi) => {
                if (response.message == "error" && response.status == 422) {
                    this.errors = response.data;
                    this.isLoading = false;
                } else if (response.status == 201) {
                    this.router.navigate(["/beauty-salon/typedepense/read"]);
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