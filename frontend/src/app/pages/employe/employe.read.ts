import { MessageService } from "primeng/api";
import {HttpResponseApi} from "../../interfaces/http/HttpResponseApi";
import { Component, OnInit } from "@angular/core";
import { Employe } from "../../models/employe.model";
import { EmployeService } from "../../services/employe/employe.service";
@Component({
    selector: "read-employe",
    templateUrl: "./employe.read.page.html",
    styleUrls: ["./employe.read.page.css"]
})
export class ReadEmploye implements OnInit {

employeSearch: Employe = new Employe();
employes: Employe[] = [];

employeDelete: Employe = new Employe();

employeUpdate: Employe = new Employe();

loadingButtonUpdate: boolean = true;

showDeletePopup: boolean = false;

showUpdatePopup: boolean = false;

errorsUpdate: any[]|undefined = [];

UpdateEmploye(employe: Employe){

this.showUpdatePopup = true;
this.employeUpdate = Object.assign({}, employe);
}

CancelUpdateEmploye(){

this.showUpdatePopup = false;
this.errorsUpdate = [];
}

ValidUpdateEmploye(){

this.loadingButtonUpdate = true;
this.employeService.updateEmploye(this.employeUpdate).subscribe(
(response:HttpResponseApi) => {
if (response.message=="error" && response.status == 422) {
this.errorsUpdate = response.data;
this.loadingButtonUpdate = false;
} else if (response.status == 200) {
this.getEmployes();
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

 this.getEmployes();
}

constructor (private employeService: EmployeService, private messageService: MessageService) {

}

getEmployes() {

this.employeService.readEmploye(this.employeSearch).subscribe((response: HttpResponseApi) => {
if (response.data) {
this.employes = response.data;
}
});
}

rechercher() {

this.getEmployes();
}

CancelDeleteEmploye(){

this.showDeletePopup = false;
}

DeleteEmploye(employe: Employe){

this.showDeletePopup = true;
this.employeDelete = employe;
}

ValidDeleteEmploye(){

this.showDeletePopup = false;
this.employeService.deleteEmploye(this.employeDelete).subscribe((response: HttpResponseApi) => {
if (response.status == 200) {
this.getEmployes();
this.messageService.add({severity:"success", summary:"Succès", detail:"Suppression effectuée avec succès"});
}
});
}

}