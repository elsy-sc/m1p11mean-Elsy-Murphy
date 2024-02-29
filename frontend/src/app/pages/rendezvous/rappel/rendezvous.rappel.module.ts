import { ToastModule } from "primeng/toast";
import { NgModule } from "@angular/core";
import { RendezvousRappel } from "./rendezvous.rappel";

@NgModule({
    declarations: [
        RendezvousRappel
    ],
    imports: [
        ToastModule,
    ],
    exports: [
        RendezvousRappel,
    ]
})
export class RendezvousRappelModule { }


