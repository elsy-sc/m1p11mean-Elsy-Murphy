import { LabelInputModule } from "../../../components/labelinput/labelinput.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TableModule } from "primeng/table";
import { ReadService } from "./service.read";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { InputTextModule } from "primeng/inputtext";
import { AccordionModule } from "primeng/accordion";
import { DropdownModule } from "primeng/dropdown";
import { ToastModule } from "primeng/toast";
import { GenericPopupModule } from "../../../components/generic-popup/generic-popup.module";
import { FormsModule } from "@angular/forms";
import { InputTextareaModule } from "primeng/inputtextarea";
import { DialogModule } from "primeng/dialog";
import { FileUploadModule } from "primeng/fileupload";
import { LoadingModule } from "../../../components/loading/loading.module";

@NgModule({
    declarations: [
        ReadService
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
        FileUploadModule,
        LoadingModule
    ]
})
export class ReadServiceModule { }
