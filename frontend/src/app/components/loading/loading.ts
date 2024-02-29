import { Component, Input } from "@angular/core";


@Component({
    selector: "app-loading",
    templateUrl: "./loading.component.html",
    styleUrls: ["./loading.component.css"]
})

export class Loading {
    @Input() isLoading: boolean = false;
}
