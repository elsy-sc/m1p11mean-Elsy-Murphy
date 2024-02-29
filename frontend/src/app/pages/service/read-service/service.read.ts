import { MessageService } from "primeng/api";
import { HttpResponseApi } from "../../../interfaces/http/HttpResponseApi";
import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ServiceService } from "../../../services/service/service.service";
import { CategorieService } from "../../../models/categorieservice.model";
import { CategorieServiceService } from "../../../services/categorieservice/categorieservice.service";
import { OffrespecialeService } from "../../../services/offrespeciale/offrespeciale.service";
import { Offrespeciale } from "../../../models/offrespeciale.model";
import { SocketService } from "../../../services/offrespeciale/offrespeciale.notification";
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
    isLoading: boolean = false;

    showUpdatePopup: boolean = false;

    errorsUpdate: any[] | undefined = [];
    isSpecial: boolean = false;

    imageUpload: any;
    imageUploadInit: any;
    
    
    onSelect(event: any) {
        this.imageUploadInit = null;
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
        this.imageUploadInit = this.serviceUpdate.image;
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
            this.offreSpecialService.updateOffrespeciale(this.serviceUpdate, this.imageUpload).subscribe(
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
            this.serviceService.updateService(this.serviceUpdate, this.imageUpload).subscribe(
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
        this.imageUpload = null;
    }

    onInput() {

        this.errorsUpdate = [];
    }

    ngOnInit(): void {
        this.getServices();
        this.getServiceCategories();
    }

    // ngAfterViewInit() {
    //     this.socketService.connect();
    //     this.socketService.getNotification().subscribe((data: any) => {
    //         console.log(data);
    //         this.messageService.add({ severity: "info", summary: "Une nouvelle service a été ajoutée : " + data.nom, detail: data.descriptionoffrespeciale, life: 10000}); 
    //     });
    // }

    constructor(private offreSpecialService: OffrespecialeService, private messageService: MessageService, private servicecategorieService: CategorieServiceService, private serviceService: ServiceService) {

    }

    getServices() {
        this.isLoading = true;
        this.offreSpecialService.readOffrespeciale(this.serviceSearch).subscribe((response: HttpResponseApi) => {
            console.log(response);
            if (response.data) {
                this.services = response.data;
                this.isLoading = false;
            }
        });
    }

    getServiceCategories(){
        this.isLoading = true;
      this.servicecategorieService.readCategorieService(new CategorieService()).subscribe((response: HttpResponseApi) => {
            if (response.data) {
                this.categorieservices = response.data;
                this.isLoading = false;
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