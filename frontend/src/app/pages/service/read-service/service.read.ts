import { MessageService } from "primeng/api";
import { HttpResponseApi } from "../../../interfaces/http/HttpResponseApi";
import { Component, OnInit } from "@angular/core";
import { Service } from "../../../models/service.model";
import { ServiceService } from "../../../services/service/service.service";
import { CategorieService } from "../../../models/categorieservice.model";
import { CategorieServiceService } from "../../../services/categorieservice/categorieservice.service";
import { OffrespecialeService } from "../../../services/offrespeciale/offrespeciale.service";
import { Offrespeciale } from "../../../models/offrespeciale.model";
import { STATIC_URL } from "../../../utils/constante.util";
@Component({
    selector: "read-service",
    templateUrl: "./service.read.page.html",
    styleUrls: ["./service.read.page.css"]
})
export class ReadService implements OnInit {

    serviceSearch: Offrespeciale = new Offrespeciale();
    services: Offrespeciale[] = [];
    categorieservices: CategorieService[] = [];

    serviceDelete: Offrespeciale = new Offrespeciale();

    serviceUpdate: Offrespeciale = new Offrespeciale();

    loadingButtonUpdate: boolean = true;

    showDeletePopup: boolean = false;

    showUpdatePopup: boolean = false;

    errorsUpdate: any[] | undefined = [];
    isSpecial: boolean = false;

    imageUpload: any;
    static_url = STATIC_URL + '/';


    
    
    onSelect(event: any) {
        this.serviceUpdate.image = event.files[0].name;
        this.imageUpload = event.files[0];
    }

    onRemove(){
        this.serviceUpdate.image = undefined;
    }


    UpdateService(service: Offrespeciale) {
        this.updateIsSpecial(service);
        this.showUpdatePopup = true;
        this.serviceUpdate = Object.assign({}, service);
    }

    CancelUpdateService() {

        this.showUpdatePopup = false;
        this.errorsUpdate = [];
    }

    updateIsSpecial(service: Offrespeciale) {
        this.isSpecial = service.descriptionoffrespeciale != null;
    }

    ValidUpdateService() {
        if (this.isSpecial) {
            this.loadingButtonUpdate = true;
            this.offreSpecialService.updateOffrespeciale(this.serviceUpdate).subscribe(
                (response: HttpResponseApi) => {
                    console.log(response)
                    if (response.message == "error" && response.status == 422) {
                        this.errorsUpdate = response.data;
                        this.loadingButtonUpdate = false;
                    } else if (response.status == 200) {
                        this.getServices();
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
        else {
            this.loadingButtonUpdate = true;
            this.serviceService.updateService(this.serviceUpdate).subscribe(
                (response: HttpResponseApi) => {
                    console.log(response)
                    if (response.message == "error" && response.status == 422) {
                        this.errorsUpdate = response.data;
                        this.loadingButtonUpdate = false;
                    } else if (response.status == 200) {
                        this.getServices();
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
    }

    onInput() {

        this.errorsUpdate = [];
    }

    ngOnInit(): void {
        this.getServices();
        this.getServiceCategories();
    }

    constructor(private offreSpecialService: OffrespecialeService, private messageService: MessageService, private servicecategorieService: CategorieServiceService, private serviceService: ServiceService) {

    }

    getServices() {
        
        this.offreSpecialService.readOffrespeciale(this.serviceSearch).subscribe((response: HttpResponseApi) => {
            
            if (response.data) {
                this.services = response.data;
            }
        });
    }

    getServiceCategories(){
      this.servicecategorieService.readCategorieService(new CategorieService()).subscribe((response: HttpResponseApi) => {
            if (response.data) {
                this.categorieservices = response.data;
            }
        });
    }

    rechercher() {
        this.getServices();
    }

    CancelDeleteService() {
        this.showDeletePopup = false;
    }

    DeleteService(service: Offrespeciale) {
        this.showDeletePopup = true;
        this.serviceDelete = service;
    }

    ValidDeleteService() {
        this.showDeletePopup = false;
        this.offreSpecialService.deleteOffrespeciale(this.serviceDelete).subscribe((response: HttpResponseApi) => {
            if (response.status == 200) {
                this.getServices();
                this.messageService.add({ severity: "success", summary: "Succès", detail: "Suppression effectuée avec succès" });
            }
        });
    }

}