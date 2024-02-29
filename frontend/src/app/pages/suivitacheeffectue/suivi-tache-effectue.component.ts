import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Date } from '../../beans/date.bean.util';
import { SuiviEmployeRendezVous } from '../../models/suiviemployerendezvous.model';
import { SuiviTacheEffectueService } from '../../services/suivitacheeffectue/suivitacheeffectue.service';

@Component({
  selector: 'app-suivi-tache-effectue',
  templateUrl: './suivi-tache-effectue.component.html',
  styleUrl: './suivi-tache-effectue.component.css'
})
export class SuiviTacheEffectue implements OnInit, AfterViewInit {

  date: string = new Date().date.split(" ")[0];
  tacheeffectues: SuiviEmployeRendezVous[] = [];
  totalmontant: number = 0;

  constructor(private suivitacheffectueservice: SuiviTacheEffectueService) { }

  ngOnInit(): void {
    this.getSuiviTacheEffectue();
  }

  ngAfterViewInit(): void {

  }

  getSuiviTacheEffectue() {
    this.suivitacheffectueservice.readSuiviTacheEffectue(this.date).subscribe(
      (response) => {
        if (response.data) {
          this.tacheeffectues = response.data;
          this.totalmontant = this.tacheeffectues.reduce((somme, item) => somme + (item.montantcommission || 0), 0);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
