import { LabelInputModule } from "../../../../components/labelinput/labelinput.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TableModule } from "primeng/table";
import { ReadSuiviEmployeRendezVousEmploye } from "./suiviemployerendezvous.read";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { InputTextModule } from "primeng/inputtext";
import { AccordionModule } from "primeng/accordion";
import { DropdownModule } from "primeng/dropdown";
import { ToastModule } from "primeng/toast";
import { GenericPopupModule } from "../../../../components/generic-popup/generic-popup.module";
import { FormsModule } from "@angular/forms";
import { InputTextareaModule } from "primeng/inputtextarea";
import { DialogModule } from "primeng/dialog";
import {DataViewModule} from 'primeng/dataview';
import { DragDropModule } from 'primeng/dragdrop';
import { CalendarModule } from "primeng/calendar";
import { LoadingModule } from "../../../../components/loading/loading.module";

@NgModule({
    declarations: [
        ReadSuiviEmployeRendezVousEmploye
    ],
    imports: [
        CommonModule,
        FormsModule,
        TableModule,
        ButtonModule,
        RippleModule,
        InputTextModule,
        AccordionModule,
        DropdownModule,
        ToastModule,
        GenericPopupModule,
        InputTextareaModule,
        DialogModule,
        LabelInputModule,
        DataViewModule,
        DragDropModule,
        CalendarModule,
        DialogModule,
        CalendarModule,
        LoadingModule
    ]
})
export class ReadSuiviEmployeRendezVousEmployeModule { }
