import { MessageService } from "primeng/api";
import { HttpResponseApi } from "../../../interfaces/http/HttpResponseApi";
import { Component, OnInit } from "@angular/core";
import { Depense } from "../../../models/depense.model";
import { DepenseService } from "../../../services/depense/depense.service";
import { TypeDepense } from "../../../models/typedepense.model";
import { TypeDepenseService } from "../../../services/typedepense/typedepense.service";
@Component({
    selector: "read-depense",
    templateUrl: "./depense.read.page.html",
    styleUrls: ["./depense.read.page.css"]
})
export class ReadDepense implements OnInit {

    depenseSearch: Depense = new Depense();
    depenses: Depense[] = [];
    typedepense: TypeDepense[] = [];

    depenseDelete: Depense = new Depense();

    depenseUpdate: Depense = new Depense();

    loadingButtonUpdate: boolean = true;

    showDeletePopup: boolean = false;

    showUpdatePopup: boolean = false;

    errorsUpdate: any[] | undefined = [];

    UpdateDepense(depense: Depense) {

        this.showUpdatePopup = true;
        this.depenseUpdate = Object.assign({}, depense);
    }

    CancelUpdateDepense() {

        this.showUpdatePopup = false;
        this.errorsUpdate = [];
    }

    ValidUpdateDepense() {

        this.loadingButtonUpdate = true;
        this.depenseService.updateDepense(this.depenseUpdate).subscribe(
            (response: HttpResponseApi) => {
                if (response.message == "error" && response.status == 422) {
                    this.errorsUpdate = response.data;
                    this.loadingButtonUpdate = false;
                } else if (response.status == 200) {
                    this.getDepenses();
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
        this.getDepenses();
    }

    constructor(private depenseService: DepenseService, private messageService: MessageService, private typeDepenseService: TypeDepenseService) {

    }

    getDepenses() {

        this.depenseService.readDepense(this.depenseSearch).subscribe((response: HttpResponseApi) => {
            if (response.data) {
                this.depenses = response.data;
            }
        });
    }

    rechercher() {

        this.getDepenses();
    }

    CancelDeleteDepense() {

        this.showDeletePopup = false;
    }

    DeleteDepense(depense: Depense) {

        this.showDeletePopup = true;
        this.depenseDelete = depense;
    }

    ValidDeleteDepense() {

        this.showDeletePopup = false;
        this.depenseService.deleteDepense(this.depenseDelete).subscribe((response: HttpResponseApi) => {
            if (response.status == 200) {
                this.getDepenses();
                this.messageService.add({ severity: "success", summary: "Succès", detail: "Suppression effectuée avec succès" });
            }
        });
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

}