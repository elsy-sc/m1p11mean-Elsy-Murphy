import { Component, OnInit } from "@angular/core";
import { Employe } from "../../models/employe.model";
@Component({
    selector: "create-employe",
    templateUrl: "./create-employe.component.html",
    styleUrls: ["./create-employe.component.css"]
})
export class CreateEmploye implements OnInit {

    employe: Employe = new Employe();

    ngOnInit(): void {

    }

    submit() {

    }

}