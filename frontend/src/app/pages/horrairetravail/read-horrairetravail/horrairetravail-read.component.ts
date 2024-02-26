import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HttpResponseApi } from '../../../interfaces/http/HttpResponseApi';
import { Heures } from '../../../models/heures.model';
import { HorraireTravail } from '../../../models/horrairetravail.model';
import { HorraireTravailService } from '../../../services/horrairetravail/horrairetravail.service';

@Component({
  selector: 'app-horrairetravail-read',
  templateUrl: './horrairetravail-read.component.html',
  styleUrl: './horrairetravail-read.component.css'
})
export class ReadHorrairetravail implements OnInit,AfterViewInit {

  horraireTravail!: HorraireTravail;

  horairetravailDelete: HorraireTravail = new HorraireTravail();
  horairetravailUpdate: HorraireTravail = new HorraireTravail();
  horrairetravailmatin: Heures = new Heures();
  horrairetravailapresmidi: Heures = new Heures();
  errorsUpdate: any[] | undefined = [];

  joursSemaine: any[] = [
    { label: 'Lundi', value: 1 },
    { label: 'Mardi', value: 2 },
    { label: 'Mercredi', value: 3 },
    { label: 'Jeudi', value: 4 },
    { label: 'Vendredi', value: 5 },
    { label: 'Samedi', value: 6 },
    { label: 'Dimanche', value: 7 }
  ];

  horraireTravails: HorraireTravail[] = [];

  showDeletePopup: boolean = false;
  showUpdatePopup: boolean = false;

  constructor(private horraireTravailSerice: HorraireTravailService, private messageService: MessageService, private route: ActivatedRoute) { }

  getLabelFromValue(value: number): string {
    const jour = this.joursSemaine.find(j => j.value === value);
    return jour ? jour.label : '';
  }

  ngOnInit(): void {
    this.horraireTravail = new HorraireTravail();
    const userStorage = this.horraireTravailSerice.getUserConnecte();
    if (userStorage) {
      const user = JSON.parse(userStorage);
      this.horraireTravail.idemploye = user._id;
    }
    this.getHoraireTravail();
  }

  ngAfterViewInit(): void {
    this.route.queryParamMap.subscribe(params => {     
        if (params.get('message')) {
            this.messageService.add({severity:"success", summary:"Succès", detail: params.get('message')?.toString()});
        }
    });
}


  getHoraireTravail() {

    this.horraireTravailSerice.readHorraireTravail(this.horraireTravail).subscribe((response: HttpResponseApi) => {
      if (response.data) {
        this.horraireTravails = response.data;
      }
    });
  }

  CancelDeleteHoraireTravail() {

    this.showDeletePopup = false;
  }

  DeleteHoraireTravail(horairetravail: HorraireTravail) {

    this.showDeletePopup = true;
    this.horairetravailDelete = horairetravail;
  }

  ValidDeleteEmploye() {

    this.showDeletePopup = false;
    this.horraireTravailSerice.deleteHorraireTravail(this.horairetravailDelete).subscribe((response: HttpResponseApi) => {
      if (response.status == 200) {
        this.getHoraireTravail();
        this.messageService.add({ severity: "success", summary: "Succès", detail: "Suppression effectuée avec succès" });
      }
    });
  }

  UpdateHoraireTravail(horairetravail: HorraireTravail) {

    this.showUpdatePopup = true;
    this.horairetravailUpdate = JSON.parse(JSON.stringify(horairetravail)); 
    if (this.horairetravailUpdate.heures && this.horairetravailUpdate.heures[0]) {
      this.horrairetravailmatin = this.horairetravailUpdate.heures[0];
    }
    if (this.horairetravailUpdate.heures && this.horairetravailUpdate.heures[1]) {
      this.horrairetravailapresmidi = this.horairetravailUpdate.heures[1];
    }
  }

  CancelUpdateHoraireTravail() {
    this.showUpdatePopup = false;
  }

  ValidUpdateHoraireTravail() {
    const isvalid = this.validSubmit();
    if (isvalid) {
      this.horraireTravailSerice.updateHorraireTravail(this.horairetravailUpdate).subscribe(
        (response: HttpResponseApi) => {
          if (response.message == "error" && response.status == 422) {
          } else if (response.status == 200) {
            this.getHoraireTravail();
            this.showUpdatePopup = false;
            this.messageService.add({ severity: "success", summary: "Succès", detail: "Modification effectuée avec succès" });
          } else {
            this.showUpdatePopup = false;
            this.messageService.add({ severity: "error", summary: "Erreur", detail: response.message });
          }
        },
        (error) => {
          console.error(error);
        }
      )
    }
  }

  onInput () {
    this.errorsUpdate = [];
  }

  rechercher() {
    this.getHoraireTravail();
  }


  validSubmit () {
    const heureMatinDefinie = this.horrairetravailmatin.debut !== undefined && this.horrairetravailmatin.debut !== "" && this.horrairetravailmatin.fin !== undefined && this.horrairetravailmatin.fin !== "";
    const heureApresMidiDefinie = this.horrairetravailapresmidi.debut !== undefined && this.horrairetravailapresmidi.debut !== "" && this.horrairetravailapresmidi.fin !== undefined && this.horrairetravailapresmidi.fin !== "";
    if (!heureMatinDefinie && !heureApresMidiDefinie) {
      this.errorsUpdate?.push({
        field: "heures",
        message: "Veuillez completer au mois les heures debut-fin du matin ou apres-midi"
      });
      return false;
    }
    return true;
  }

}
