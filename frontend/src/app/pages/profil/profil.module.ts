import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RadioButtonModule } from "primeng/radiobutton";
import { InputTextModule } from "primeng/inputtext";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { InputTextareaModule } from "primeng/inputtextarea";
import { DropdownModule } from "primeng/dropdown";
import { CheckboxModule } from "primeng/checkbox";
import { MultiSelectModule } from "primeng/multiselect";
import { PasswordModule } from "primeng/password";
import { ToastModule } from "primeng/toast";
import { AppLayoutModule } from "../../components/layout/app.layout.module";
import { LabelInputModule } from "../../components/labelinput/labelinput.module";
import { Profil } from "./profil";
import { DialogModule } from "primeng/dialog";
@NgModule({
    declarations: [
        Profil
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
        DialogModule
    ]
})
export class ProfilModule { }
