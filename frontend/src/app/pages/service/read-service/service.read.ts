import { MessageService } from "primeng/api";
import {HttpResponseApi} from "../../../interfaces/http/HttpResponseApi";
import { Component, OnInit } from "@angular/core";
import { Service } from "../../../models/service.model";
import { ServiceService } from "../../../services/service/service.service";
@Component({
    selector: "read-service",
    templateUrl: "./service.read.page.html",
    styleUrls: ["./service.read.page.css"]
})
export class ReadService implements OnInit {

serviceSearch: Service = new Service();
services: Service[] = [];

serviceDelete: Service = new Service();

serviceUpdate: Service = new Service();

loadingButtonUpdate: boolean = true;

showDeletePopup: boolean = false;

showUpdatePopup: boolean = false;

errorsUpdate: any[]|undefined = [];

UpdateService(service: Service){

this.showUpdatePopup = true;
this.serviceUpdate = Object.assign({}, service);
}

CancelUpdateService(){

this.showUpdatePopup = false;
this.errorsUpdate = [];
}

ValidUpdateService(){

this.loadingButtonUpdate = true;
this.serviceService.updateService(this.serviceUpdate).subscribe(
(response:HttpResponseApi) => {
if (response.message=="error" && response.status == 422) {
this.errorsUpdate = response.data;
this.loadingButtonUpdate = false;
} else if (response.status == 200) {
this.getServices();
this.showUpdatePopup = false;
this.loadingButtonUpdate = false;
this.messageService.add({severity:"success", summary:"Succès", detail:"Modification effectuée avec succès"});
} else {
this.loadingButtonUpdate = false;
this.messageService.add({severity:"error",summary:"Erreur",detail: response.message});
}
},
(error) => {
this.loadingButtonUpdate = false;
console.error(error);
}
)
}

onInput(){

this.errorsUpdate = [];
}

ngOnInit(): void {

 this.getServices();
}

constructor (private serviceService: ServiceService, private messageService: MessageService) {

}

getServices() {

this.serviceService.readService(this.serviceSearch).subscribe((response: HttpResponseApi) => {
if (response.data) {
this.services = response.data;
}
});
}

rechercher() {

this.getServices();
}

CancelDeleteService(){

this.showDeletePopup = false;
}

DeleteService(service: Service){

this.showDeletePopup = true;
this.serviceDelete = service;
}

ValidDeleteService(){

this.showDeletePopup = false;
this.serviceService.deleteService(this.serviceDelete).subscribe((response: HttpResponseApi) => {
if (response.status == 200) {
this.getServices();
this.messageService.add({severity:"success", summary:"Succès", detail:"Suppression effectuée avec succès"});
}
});
}

}