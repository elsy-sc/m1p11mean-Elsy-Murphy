import { MessageService } from "primeng/api";
import { HttpResponseApi } from "../../../interfaces/http/HttpResponseApi";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Employe } from "../../../models/employe.model";
import { EmployeService } from "../../../services/employe/employe.service";
@Component({
    selector: "create-employe",
    templateUrl: "./employe.create.page.html",
    styleUrls: ["./employe.create.page.css"]
})
export class CreateEmploye implements OnInit {

    isLoading: boolean = false;
    employe: Employe = new Employe();
    errors: any[] | undefined = [];

    constructor(private employeService: EmployeService, private messageService: MessageService, private router: Router) { }

    submit() {
        this.isLoading = true;
        this.employeService.createEmploye(this.employe).subscribe(
            (response: HttpResponseApi) => {
                if (response.message == "error" && response.status == 422) {
                    this.errors = response.data;
                    this.isLoading = false;
                } else if (response.status == 201) {
                    this.isLoading = false;
                    this.router.navigate(["/beauty-salon/employe/read"]);
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