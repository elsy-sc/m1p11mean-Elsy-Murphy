import { MessageService } from "primeng/api";
import { HttpResponseApi } from "../../../interfaces/http/HttpResponseApi";
import { Component, OnInit } from "@angular/core";
import { TypeDepense } from "../../../models/typedepense.model";
import { TypeDepenseService } from "../../../services/typedepense/typedepense.service";
@Component({
    selector: "read-typedepense",
    templateUrl: "./typedepense.read.page.html",
    styleUrls: ["./typedepense.read.page.css"]
})
export class ReadTypeDepense implements OnInit {

    typedepenseSearch: TypeDepense = new TypeDepense();
    typedepenses: TypeDepense[] = [];

    typedepenseDelete: TypeDepense = new TypeDepense();

    typedepenseUpdate: TypeDepense = new TypeDepense();

    loadingButtonUpdate: boolean = true;

    showDeletePopup: boolean = false;

    showUpdatePopup: boolean = false;

    errorsUpdate: any[] | undefined = [];

    UpdateTypeDepense(typedepense: TypeDepense) {

        this.showUpdatePopup = true;
        this.typedepenseUpdate = Object.assign({}, typedepense);
    }

    CancelUpdateTypeDepense() {

        this.showUpdatePopup = false;
        this.errorsUpdate = [];
    }

    ValidUpdateTypeDepense() {

        this.loadingButtonUpdate = true;
        this.typedepenseService.updateTypeDepense(this.typedepenseUpdate).subscribe(
            (response: HttpResponseApi) => {
                if (response.message == "error" && response.status == 422) {
                    this.errorsUpdate = response.data;
                    this.loadingButtonUpdate = false;
                } else if (response.status == 200) {
                    this.getTypeDepenses();
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

        this.getTypeDepenses();
    }

    constructor(private typedepenseService: TypeDepenseService, private messageService: MessageService) {

    }

    getTypeDepenses() {

        this.typedepenseService.readTypeDepense(this.typedepenseSearch).subscribe((response: HttpResponseApi) => {
            if (response.data) {
                this.typedepenses = response.data;
            }
        });
    }

    rechercher() {

        this.getTypeDepenses();
    }

    CancelDeleteTypeDepense() {

        this.showDeletePopup = false;
    }

    DeleteTypeDepense(typedepense: TypeDepense) {

        this.showDeletePopup = true;
        this.typedepenseDelete = typedepense;
    }

    ValidDeleteTypeDepense() {

        this.showDeletePopup = false;
        this.typedepenseService.deleteTypeDepense(this.typedepenseDelete).subscribe((response: HttpResponseApi) => {
            if (response.status == 200) {
                this.getTypeDepenses();
                this.messageService.add({ severity: "success", summary: "Succès", detail: "Suppression effectuée avec succès" });
            }
        });
    }

}