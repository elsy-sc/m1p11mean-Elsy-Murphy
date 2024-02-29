import { NgModule } from "@angular/core";
import { Loading } from "./loading";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { CommonModule } from "@angular/common";


@NgModule({
    declarations: [
        Loading
    ],
    imports: [
        ProgressSpinnerModule,
        OverlayPanelModule,
        CommonModule
    ],
    exports: [
        Loading,
        ProgressSpinnerModule,
        OverlayPanelModule
    ]
})
export class LoadingModule { }


