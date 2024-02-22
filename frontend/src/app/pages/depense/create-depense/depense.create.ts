import { MessageService } from "primeng/api";
import { HttpResponseApi } from "../../../interfaces/http/HttpResponseApi";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Depense } from "../../../models/depense.model";
import { DepenseService } from "../../../services/depense/depense.service";
import { TypeDepense } from "../../../models/typedepense.model";
import { TypeDepenseService } from "../../../services/typedepense/typedepense.service";
@Component({
    selector: "create-depense",
    templateUrl: "./depense.create.page.html",
    styleUrls: ["./depense.create.page.css"]
})
export class CreateDepense implements OnInit {

    isLoading: boolean = false;
    depense: Depense = new Depense();
    errors: any[] | undefined = [];
    typedepense: TypeDepense[] = [];
    constructor(private depenseService: DepenseService, private messageService: MessageService, private router: Router, private typeDepenseService: TypeDepenseService) { }

    submit() {
        this.isLoading = true;
        this.depenseService.createDepense(this.depense).subscribe(
            (response: HttpResponseApi) => {
                if (response.message == "error" && response.status == 422) {
                    this.errors = response.data;
                    this.isLoading = false;
                } else if (response.status == 201) {
                    this.router.navigate(["/beauty-salon/depense/read"]);
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

    getTypeDepenses () {
        this.typeDepenseService.readTypeDepense(new TypeDepense()).subscribe(
            (response) => {
                if (response.data) {
                    this.typedepense = response.data;
                }
            },
            (error) => {
                console.error(error);
            } 
        )
    }

    onInput() {
        this.errors = [];
    }

    ngOnInit(): void {
        this.getTypeDepenses();
    }

}