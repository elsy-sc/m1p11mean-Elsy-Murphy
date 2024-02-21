import { MessageService } from "primeng/api";
import {HttpResponseApi} from "../../../interfaces/http/HttpResponseApi";
import { Component, OnInit } from "@angular/core";
import { CategorieService } from "../../../models/categorieservice.model";
import { CategorieServiceService } from "../../../services/categorieservice/categorieservice.service";
@Component({
    selector: "read-categorieservice",
    templateUrl: "./categorieservice.read.page.html",
    styleUrls: ["./categorieservice.read.page.css"]
})
export class ReadCategorieService implements OnInit {

categorieserviceSearch: CategorieService = new CategorieService();
categorieservices: CategorieService[] = [];

categorieserviceDelete: CategorieService = new CategorieService();

categorieserviceUpdate: CategorieService = new CategorieService();

loadingButtonUpdate: boolean = true;

showDeletePopup: boolean = false;

showUpdatePopup: boolean = false;

errorsUpdate: any[]|undefined = [];

UpdateCategorieService(categorieservice: CategorieService){

this.showUpdatePopup = true;
this.categorieserviceUpdate = Object.assign({}, categorieservice);
}

CancelUpdateCategorieService(){

this.showUpdatePopup = false;
this.errorsUpdate = [];
}

ValidUpdateCategorieService(){

this.loadingButtonUpdate = true;
this.categorieserviceService.updateCategorieService(this.categorieserviceUpdate).subscribe(
(response:HttpResponseApi) => {
if (response.message=="error" && response.status == 422) {
this.errorsUpdate = response.data;
this.loadingButtonUpdate = false;
} else if (response.status == 200) {
this.getCategorieServices();
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

 this.getCategorieServices();
}

constructor (private categorieserviceService: CategorieServiceService, private messageService: MessageService) {

}

getCategorieServices() {

this.categorieserviceService.readCategorieService(this.categorieserviceSearch).subscribe((response: HttpResponseApi) => {
if (response.data) {
this.categorieservices = response.data;
}
});
}

rechercher() {

this.getCategorieServices();
}

CancelDeleteCategorieService(){

this.showDeletePopup = false;
}

DeleteCategorieService(categorieservice: CategorieService){

this.showDeletePopup = true;
this.categorieserviceDelete = categorieservice;
}

ValidDeleteCategorieService(){

this.showDeletePopup = false;
this.categorieserviceService.deleteCategorieService(this.categorieserviceDelete).subscribe((response: HttpResponseApi) => {
if (response.status == 200) {
this.getCategorieServices();
this.messageService.add({severity:"success", summary:"Succès", detail:"Suppression effectuée avec succès"});
}
});
}

}