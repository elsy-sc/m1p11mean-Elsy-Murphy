import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { response } from 'express';
import { HttpResponseApi } from '../../../interfaces/http/HttpResponseApi';
import { Heures } from '../../../models/heures.model';
import { HorraireTravail } from '../../../models/horrairetravail.model';
import { HorraireTravailService } from '../../../services/horrairetravail/horrairetravail.service';

@Component({
  selector: 'app-horrairetravail-create',
  templateUrl: './horrairetravail-create.component.html',
  styleUrl: './horrairetravail-create.component.css'
})
export class CreateHorraireTravail implements OnInit {

  isLoading: boolean = false;
  horraireTravail!: HorraireTravail;
  errors: any[] | undefined = [];

  joursSemaine: any[] = [
    { label: 'Lundi', value: 1 },
    { label: 'Mardi', value: 2 },
    { label: 'Mercredi', value: 3 },
    { label: 'Jeudi', value: 4 },
    { label: 'Vendredi', value: 5 },
    { label: 'Samedi', value: 6 },
    { label: 'Dimanche', value: 7 }
  ];

  selectedJours: any[] = [];

  heureMatin: Heures = new Heures();
  heureApresMidi: Heures = new Heures();

  constructor(private horrairetravailService: HorraireTravailService, private router: Router) { }

  ngOnInit(): void {
    this.horraireTravail = new HorraireTravail();
    const userStorage = this.horrairetravailService.getUserConnecte();
    if (userStorage) {
      const user = JSON.parse(userStorage);
      this.horraireTravail.idemploye = user._id;
    }
  }

  onInput() {
    this.errors = [];
  }

  valideSubmit() {
    if (this.selectedJours.length == 0) {
      this.errors?.push({
        field: "jour",
        message: "Veuillez selectionné les jours"
      });
      return false;
    }
    const heureMatinDefinie = this.heureMatin.debut !== undefined && this.heureMatin.debut !== "" && this.heureMatin.fin !== undefined && this.heureMatin.fin !== "";
    const heureApresMidiDefinie = this.heureApresMidi.debut !== undefined && this.heureApresMidi.debut !== "" && this.heureApresMidi.fin !== undefined && this.heureApresMidi.fin !== "";
    if (!heureMatinDefinie && !heureApresMidiDefinie) {
      this.errors?.push({
        field: "heures",
        message: "Veuillez completer au mois les heures debut-fin du matin ou apres-midi"
      });
      return false;
    }
    return true;
  }

  async submit() {
    this.isLoading = true;
    try {
      const isValide = this.valideSubmit();
      if (isValide) {
        for (let index = 0; index < this.selectedJours.length; index++) {
          let jour = this.selectedJours[index];
          let horrTrav = Object.assign({},this.horraireTravail);
          horrTrav.jour = jour;
          horrTrav.heures = [];
          horrTrav.heures?.push(this.heureMatin);
          horrTrav.heures?.push(this.heureApresMidi);
          const response = await this.horrairetravailService.createHorraireTravail(horrTrav).toPromise();
        }
        this.isLoading = false;
        this.router.navigate(["/beauty-salon/horrairetravail/read"]);
      } else {
        this.isLoading = false;
      }
    } catch (error) {
      this.isLoading = false;
      console.error(error);
    }
  }


}
