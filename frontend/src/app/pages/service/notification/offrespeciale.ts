import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SocketService } from "../../../services/offrespeciale/offrespeciale.notification";
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-offrespeciale-notification',
  templateUrl: 'offrespeciale.notification.html',
  styleUrls: ['./offrespeciale.notification.css']
})
export class OffrespecialNotification implements OnInit, OnDestroy {
  private subscription: Subscription | undefined;
  constructor(private socketService: SocketService, private messageService: MessageService) {}

  ngOnInit() {
    this.socketService.connect();
    this.subscription = this.socketService.getNotification().subscribe((data: any) => {
      this.messageService.add({
        severity: "info",
        summary: "Une nouvelle service a été ajoutée : " + data.nom,
        detail: data.descriptionoffrespeciale,
        life:  10000
      });
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
