import { LabelInputModule } from "../../../../../components/labelinput/labelinput.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CreateSuiviEmployeRendezVous } from "./suiviemployerendezvous.create";
import { RadioButtonModule } from "primeng/radiobutton";
import { InputTextModule } from "primeng/inputtext";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { InputTextareaModule } from "primeng/inputtextarea";
import { DropdownModule } from "primeng/dropdown";
import { CheckboxModule } from "primeng/checkbox";
import { MultiSelectModule } from "primeng/multiselect";
import { AppLayoutModule } from "../../../../../components/layout/app.layout.module";
import { PasswordModule } from "primeng/password";
import { ToastModule } from "primeng/toast";
import { AccordionModule } from "primeng/accordion";
import { TableModule } from "primeng/table";
import { CalendarModule } from "primeng/calendar";
import { GenericPopupModule } from "../../../../../components/generic-popup/generic-popup.module";
import { LoadingModule } from "../../../../../components/loading/loading.module";
@NgModule({
    declarations: [
        CreateSuiviEmployeRendezVous
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AppLayoutModule,
        InputTextModule,
        ButtonModule,
        InputTextareaModule,
        DropdownModule,
        RadioButtonModule,
        CheckboxModule,
        MultiSelectModule,
        PasswordModule,
        ToastModule,
        LabelInputModule,
        AccordionModule,
        TableModule,
        CalendarModule,
        GenericPopupModule,
        LoadingModule
    ]
})
export class CreateSuiviEmployeRendezVousModule { }
