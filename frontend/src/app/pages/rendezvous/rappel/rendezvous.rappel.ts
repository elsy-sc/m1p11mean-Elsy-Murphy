import { Component, OnInit, OnDestroy } from '@angular/core';
import { RendezvousService } from '../../../services/rendezvous/rendezvous.service';
import { MessageService } from 'primeng/api';
import { interval, switchMap } from 'rxjs';

@Component({
  selector: 'app-rendezvous-rappel',
  templateUrl: 'rendezvous.rappel.html',
  styleUrls: ['./rendezvous.rappel.css']
})
export class RendezvousRappel implements OnInit {
    
    constructor(private rendezvousService: RendezvousService, private messageService: MessageService) {}

    ngOnInit() {

    function isRendezvousStored(rendezvousId: string): boolean {
        const storedRendezvous = localStorage.getItem(rendezvousId);
        return storedRendezvous !== null;
    }
       
    function storeRendezvous(rendezvousId: string, rendezvousDetails: any): void {
        localStorage.setItem(rendezvousId, JSON.stringify(rendezvousDetails));
    }
       
       interval(1000).pipe(
        switchMap(() => this.rendezvousService.rappelerRendezvous())
       ).subscribe(result => {
        if (result.data != null && result.data.length > 0 && !isRendezvousStored(result.data[0]._id) ) {
          const avant = 30;
          this.rendezvousService.sendMailRappelRendezvous(result.data[0]).subscribe(() => {
            this.messageService.add({
              severity: "info",
              summary: "Rappel",
              detail: `Vous avez de(s) rendez-vous dans ${avant} minutes`,
              life: 10000
            });
          });
          storeRendezvous(result.data[0]._id, result);
        }
       }, error => {
        console.log(error);        
        this.messageService.add({
           severity: "error",
           summary: "Erreur",
           detail: "Une erreur est survenue lors du rappel",
           life: 10000
        });
       });
       


 }


}
