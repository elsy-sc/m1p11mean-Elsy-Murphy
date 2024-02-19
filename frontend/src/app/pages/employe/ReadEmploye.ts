import { Component, OnInit } from "@angular/core";
import { Employe } from "../../models/employe.model";
@Component({
    selector: "read-employe",
    templateUrl: "./read-employe.component.html",
    styleUrls: ["./read-employe.component.css"]
})
export class ReadEmploye implements OnInit {

    employeSearch: Employe = new Employe();
    employeListe: Employe[] = [];

    ngOnInit(): void {

    }

}