import { ToastModule } from "primeng/toast";
import { NgModule } from "@angular/core";
import { MessageService } from "primeng/api";
import { SocketService } from "../../../services/offrespeciale/offrespeciale.notification";
import { OffrespecialNotification } from "./offrespeciale";

@NgModule({
    declarations: [
        OffrespecialNotification
    ],
    imports: [
        ToastModule,
    ],
    providers: [
        MessageService,
        SocketService
    ],
    exports: [
        OffrespecialNotification,
    ]
})
export class OffrespecialNotificationModule { }


